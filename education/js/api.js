/**
 * 飞书API封装
 * 用于读写用户和班级数据
 */

// 飞书配置
const FeishuConfig = {
  // 用户表
  usersAppToken: 'JZpAbUxfwacW1Ls854xczikhnte',
  usersTableId: 'tblpVe83cUyXBRLi',
  
  // 班级表
  classesAppToken: 'CtBXbXSBAaji82sZu9tc5B0Nnpc',
  classesTableId: 'tblul8OgZC03vsyN'
};

// 飞书API封装
const FeishuAPI = {
  // 查询用户列表
  async getUsers() {
    try {
      const response = await feishu_bitable_list_records({
        app_token: FeishuConfig.usersAppToken,
        table_id: FeishuConfig.usersTableId
      });
      return response.records || [];
    } catch (error) {
      console.error('获取用户列表失败:', error);
      return [];
    }
  },
  
  // 根据用户名查询用户
  async getUserByUsername(username) {
    const users = await this.getUsers();
    return users.find(record => record.fields.username === username);
  },
  
  // 创建用户
  async createUser(userData) {
    try {
      const response = await feishu_bitable_create_record({
        app_token: FeishuConfig.usersAppToken,
        table_id: FeishuConfig.usersTableId,
        fields: userData
      });
      return response.record;
    } catch (error) {
      console.error('创建用户失败:', error);
      return null;
    }
  },
  
  // 更新用户
  async updateUser(recordId, fields) {
    try {
      const response = await feishu_bitable_update_record({
        app_token: FeishuConfig.usersAppToken,
        table_id: FeishuConfig.usersTableId,
        record_id: recordId,
        fields: fields
      });
      return response.record;
    } catch (error) {
      console.error('更新用户失败:', error);
      return null;
    }
  },
  
  // 查询班级列表
  async getClasses() {
    try {
      const response = await feishu_bitable_list_records({
        app_token: FeishuConfig.classesAppToken,
        table_id: FeishuConfig.classesTableId
      });
      return response.records || [];
    } catch (error) {
      console.error('获取班级列表失败:', error);
      return [];
    }
  },
  
  // 创建班级
  async createClass(classData) {
    try {
      const response = await feishu_bitable_create_record({
        app_token: FeishuConfig.classesAppToken,
        table_id: FeishuConfig.classesTableId,
        fields: classData
      });
      return response.record;
    } catch (error) {
      console.error('创建班级失败:', error);
      return null;
    }
  }
};

// 登录服务
const AuthService = {
  // 登录
  async login(username, password, role) {
    // 查找用户
    const userRecord = await FeishuAPI.getUserByUsername(username);
    
    if (!userRecord) {
      return { success: false, error: '用户名不存在' };
    }
    
    const user = userRecord.fields;
    
    // 验证角色
    if (user.role !== role) {
      return { success: false, error: '角色选择错误' };
    }
    
    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, error: '密码错误' };
    }
    
    // 生成Token
    const token = generateUUID();
    
    // 更新最后登录时间
    await FeishuAPI.updateUser(userRecord.record_id, {
      lastLogin: Date.now()
    });
    
    return {
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role,
        name: user.name,
        classId: user.classId
      },
      token
    };
  },
  
  // 注册（学生）
  async register(username, password, name, classId) {
    // 检查用户名是否已存在
    const existingUser = await FeishuAPI.getUserByUsername(username);
    if (existingUser) {
      return { success: false, error: '用户名已存在' };
    }
    
    // 加密密码
    const hashedPassword = await hashPassword(password);
    
    // 创建用户
    const userData = {
      userId: generateUUID(),
      username: username,
      password: hashedPassword,
      role: 'student',
      name: name,
      classId: classId || '',
      createdAt: Date.now(),
      lastLogin: Date.now()
    };
    
    const newUser = await FeishuAPI.createUser(userData);
    
    if (!newUser) {
      return { success: false, error: '注册失败' };
    }
    
    // 生成Token
    const token = generateUUID();
    
    return {
      success: true,
      user: {
        userId: userData.userId,
        username: userData.username,
        role: userData.role,
        name: userData.name,
        classId: userData.classId
      },
      token
    };
  }
};
