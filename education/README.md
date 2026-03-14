# 乐造AI教务上课平台

> 乐造AI在线教务平台 - 老师和学生上课用

## 📋 项目概述

- **项目名称**：乐造AI教务上课平台
- **项目类型**：在线教育平台
- **核心功能**：Scratch/Python在线编程，作品保存、课程任务分配、学生作品管理
- **目标用户**：乐造AI老师、学生（6-15岁）

## 🛠 技术栈

| 技术 | 说明 | 来源 |
|------|------|------|
| HTML5 | 页面结构 | - |
| CSS3 | 样式设计 | - |
| JavaScript (ES6+) | 交互逻辑 | - |
| Scratch3 Editor | Scratch在线编程 | LLK/scratch-gui |
| Pyodide | Python浏览器端运行 | pyodide.org |
| LocalStorage | 本地作品存储 | 浏览器API |
| Google Fonts | 字体 | Google Fonts |
| 飞书多维表格 | 用户/作品云端存储 | 飞书API |

## 📁 目录结构

```
lezao-education-platform/
├── index.html                    # 首页/登录/注册
├── dashboard.html                # 工作台（老师/学生不同视图）
├── classroom.html                # 教室页面
├── scratch-editor.html           # Scratch编辑器
├── python-editor.html            # Python编辑器
├── course.html                  # 课程浏览
├── work.html                    # 我的作品
├── admin.html                   # 管理后台（老师）
│
├── css/
│   ├── main.css                 # 主样式
│   ├── editor.css               # 编辑器样式
│   ├── dashboard.css             # 工作台样式
│   └── components.css           # 组件样式
│
├── js/
│   ├── auth.js                  # 身份验证（登录/注册/登出）
│   ├── user.js                  # 用户管理
│   ├── storage.js               # LocalStorage操作
│   ├── router.js                 # 页面路由
│   ├── scratch.js                # Scratch集成
│   └── python.js                # Python运行
│
├── data/
│   ├── courses.js               # 课程数据
│   ├── tasks.js                # 任务配置
│   └── lessons.js              # 课时配置
│
├── assets/
│   ├── images/                 # 图片资源
│   └── icons/                  # 图标
│
└── README.md                   # 开发文档
```

---

## 👥 账号系统

### 角色说明

| 角色 | 权限 | 入口 |
|------|------|------|
| 老师 | 创建课程、布置任务、查看学生作品、管理班级 | 老师登录 |
| 学生 | 查看任务、提交作品、查看自己作品 | 学生登录 |
| 管理员 | 系统管理（可选） | 管理员登录 |

### 用户数据结构（飞书多维表格）

**表格：用户表 (tbl_users)**

| 字段 | 类型 | 说明 |
|------|------|------|
| userId | 文本 | 用户ID（UUID） |
| username | 文本 | 用户名 |
| password | 文本 | 密码（加密存储） |
| role | 单选 | teacher / student / admin |
| name | 文本 | 真实姓名 |
| avatar | 头像 | 头像URL |
| classId | 关联 | 所属班级 |
| createdAt | 时间 | 创建时间 |
| lastLogin | 时间 | 最后登录 |

**表格：班级表 (tbl_classes)**

| 字段 | 类型 | 说明 |
|------|------|------|
| classId | 文本 | 班级ID |
| className | 文本 | 班级名称 |
| teacherId | 关联 | 班主任ID |
| students | 多选 | 学生列表 |
| courseId | 关联 | 当前课程 |
| createdAt | 时间 | 创建时间 |

### 登录流程

```
1. 用户打开 index.html
2. 选择身份（老师/学生）
3. 输入用户名和密码
4. 点击登录
5. 验证成功 → 跳转 dashboard.html
6. 验证失败 → 提示错误
```

### 注册流程（学生）

```
1. 点击"注册"
2. 输入：用户名、密码、确认密码、姓名
3. 选择班级（可选）
4. 提交注册
5. 自动登录，跳转工作台
```

---

## 📚 课程系统

### 课程数据结构

```javascript
{
  "id": "scratch-basic-01",
  "name": "Scratch基础第一课",
  "type": "scratch",           // scratch / python
  "level": "basic",           // basic / intermediate / advanced
  "description": "认识Scratch界面，制作第一个作品",
  "duration": 45,              // 课时（分钟）
  "coverImage": "url",         // 封面图
  "teacherId": "teacher-001",  // 授课老师
  "tasks": [
    {
      "id": "task-001",
      "title": "任务1：让角色动起来",
      "description": "学习使用"移动"积木",
      "hints": ["使用移动积木", "设置移动步数"],
      "solution": "移动10步",
      "exampleUrl": "链接"
    }
  ],
  "materials": ["素材包链接"],
  "resources": ["参考资料"],
  "order": 1                   // 课程顺序
}
```

### 课程分类

| 分类 | 课程数 | 适合年龄 |
|------|--------|----------|
| Scratch 入门 | 12节 | 6-10岁 |
| Scratch 进阶 | 16节 | 8-12岁 |
| Python 入门 | 20节 | 10岁以上 |
| Python 进阶 | 20节 | 12岁以上 |

### 课时配置

```javascript
{
  "id": "lesson-001",
  "courseId": "scratch-basic-01",
  "title": "第1课：初识Scratch",
  "content": {
    "objectives": ["认识Scratch界面", "了解积木分类"],
    "steps": ["打开Scratch", "认识界面", "第一个作品"],
    "homework": "制作一个移动动画"
  },
  "duration": 45
}
```

---

## 💾 作品系统

### 作品数据结构

```javascript
{
  "id": "work-001",
  "title": "我的第一个作品",
  "type": "scratch",           // scratch / python
  "authorId": "student-001",   // 作者ID
  "authorName": "张三",        // 作者名字
  "classId": "class-001",      // 所属班级
  "courseId": "scratch-basic-01", // 课程ID
  "lessonId": "lesson-001",   // 课时ID
  "content": {                 // 作品内容
    "scratch": {
      "json": "Scratch项目JSON",
      "thumbnail": "缩略图URL"
    },
    "python": {
      "code": "Python代码",
      "output": "运行结果"
    }
  },
  "status": "draft",           // draft / submitted / reviewed / returned
  "score": null,              // 评分
  "comment": null,             // 老师评语
  "createdAt": "时间",
  "updatedAt": "时间",
  "submittedAt": "提交时间"
}
```

### 作品状态

| 状态 | 说明 | 操作 |
|------|------|------|
| draft | 草稿 | 继续编辑、删除 |
| submitted | 已提交 | 查看、老师批改 |
| reviewed | 已批改 | 查看评语 |
| returned | 已退还 | 继续修改 |

### 存储方案

| 方案 | 存储位置 | 容量 | 同步 |
|------|----------|------|------|
| LocalStorage | 浏览器本地 | 5MB | ❌ |
| 飞书表格 | 云端 | 无限 | ✅ |

---

## 📄 页面功能

### 1. 首页 (index.html)

| 区域 | 功能 |
|------|------|
| 顶部导航 | Logo、登录/注册按钮 |
| 英雄区 | 平台介绍、特点展示 |
| 角色选择 | 老师入口 / 学生入口 |
| 登录框 | 用户名、密码、登录按钮 |
| 注册框 | 表单（学生） |

**登录表单**
```
┌─────────────────────────┐
│  用户名：[___________]  │
│  密码：  [___________]  │
│  [ ] 记住我            │
│  [ 登录 ]              │
│  没有账号？[注册]       │
└─────────────────────────┘
```

### 2. 工作台 (dashboard.html)

#### 老师视图
```
┌────────────────────────────────────────────┐
│  欢迎，张老师！            [退出]          │
├────────────────────────────────────────────┤
│  📊 数据概览                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐              │
│  │学生数 │ │班级数 │ │作品数 │              │
│  │  25  │ │   3   │ │  87  │              │
│  └──────┘ └──────┘ └──────┘              │
│                                              │
│  📚 我的课程                      [新建课程] │
│  ┌──────────────────────────────────────┐ │
│  │ 🔷 Scratch基础第1课         [查看][编辑]│
│  │ 🔷 Scratch基础第2课         [查看][编辑]│
│  └──────────────────────────────────────┘ │
│                                              │
│  📂 班级管理                      [新建班级] │
│  ┌──────────────────────────────────────┐ │
│  │ 🎓 Scratch基础班        学生25人 [管理]│ │
│  │ 🎓 Scratch进阶班        学生20人 [管理]│
│  └──────────────────────────────────────┘ │
│                                              │
│  📝 最近作品                    [查看全部]  │
│  ┌──────────────────────────────────────┐ │
│  │ 张三 - 第一个作品    2024/1/15  [批改]│ │
│  │ 李四 - 猫捉老鼠    2024/1/15  [批改]│ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

#### 学生视图
```
┌────────────────────────────────────────────┐
│  欢迎，张三！                  [退出]      │
├────────────────────────────────────────────┤
│  📚 今日课程                                 │
│  ┌──────────────────────────────────────┐ │
│  │ 🔷 Scratch基础第1课                   │ │
│  │ 老师：张老师   课时：45分钟            │ │
│  │ 任务：让角色动起来                    │ │
│  │ [开始学习]                             │ │
│  └──────────────────────────────────────┘ │
│                                              │
│  📝 我的作品                      [查看全部] │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ 作品1   │ │ 作品2   │ │ 作品3   │       │
│  │ ✅已完成 │ │ ⏳草稿  │ │ 📝待提交│       │
│  └─────────┘ └─────────┘ └─────────┘       │
│                                              │
│  📊 学习进度                                 │
│  已完成 3/12 课时  ████████░░░░░ 25%      │
└────────────────────────────────────────────┘
```

### 3. 教室页面 (classroom.html)

```
┌────────────────────────────────────────────┐
│  ← 返回  |  Scratch基础第1课  |  ⏱️ 45分钟 │
├────────────────────────────────────────────┤
│  📋 任务                                    │
│  ┌──────────────────────────────────────┐ │
│  │ 任务1：让角色动起来                  │ │
│  │ 描述：学习使用"移动"积木            │ │
│  │ 提示：使用移动积木，设置移动步数     │ │
│  └──────────────────────────────────────┘ │
│                                              │
│  📎 资料                                    │
│  - 课程视频（可选）                         │
│  - 素材下载                                 │
│                                              │
│  [💾 保存草稿]  [📝 提交作品]              │
├────────────────────────────────────────────┤
│  🖥️ 编程区域          [Scratch] [Python]  │
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  │        Scratch编辑器嵌入区域          │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### 4. Scratch编辑器 (scratch-editor.html)

- 嵌入Scratch3官方编辑器
- 自定义积木区（可选）
- 作品保存/加载
- 作品预览
- 全屏模式

### 5. Python编辑器 (python-editor.html)

```
┌────────────────────────────────────────────┐
│  Python编辑器          [▶运行] [💾保存]    │
├────────────────────────────────────────────┤
│ 1 │ # 在这里写Python代码                   │
│ 2 │ print("Hello, 乐造AI!")              │
│ 3 │                                         │
│ 4 │                                         │
│ 5 │                                         │
│ 6 │                                         │
├────────────────────────────────────────────┤
│  📤 输出                                    │
│ ┌────────────────────────────────────────┐ │
│ │ Hello, 乐造AI!                         │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### 6. 作品页 (work.html)

- 作品列表展示
- 作品详情
- 编辑/删除
- 分享

### 7. 管理后台 (admin.html - 老师)

- 班级管理：创建、编辑、删除班级
- 学生管理：添加、移除学生
- 课程管理：创建、编辑课程
- 作品管理：查看、批改、退还作品

---

## 🎨 设计系统

### 颜色变量

```css
:root {
  /* 主色调 */
  --primary: #6366f1;          /* 靛蓝 - 主色 */
  --primary-dark: #4f46e5;      /* 深靛蓝 */
  --primary-light: #818cf8;    /* 浅靛蓝 */
  
  /* 辅助色 */
  --secondary: #10b981;        /* 成功绿 */
  --accent: #f59e0b;          /* 强调橙 */
  --danger: #ef4444;          /* 警告红 */
  
  /* 中性色 */
  --dark: #0f172a;             /* 深色背景 */
  --dark-soft: #1e293b;        /* 柔和深色 */
  --gray: #64748b;             /* 灰色文字 */
  --gray-light: #94a3b8;       /* 浅灰 */
  --light: #f8fafc;            /* 浅色背景 */
  --white: #ffffff;
  
  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-success: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  --gradient-warm: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
}
```

### 角色颜色

```css
/* 老师 */
--teacher-color: #6366f1;      /* 靛蓝 */
/* 学生 */
--student-color: #10b981;      /* 绿 */
/* 管理员 */
--admin-color: #f59e0b;        /* 橙 */
```

### 字体

| 用途 | 字体 | 大小 |
|------|------|------|
| 标题 | Noto Sans SC / Outfit | 24-32px |
| 副标题 | Noto Sans SC / Outfit | 18-20px |
| 正文 | Noto Sans SC | 14-16px |
| 代码 | JetBrains Mono / Fira Code | 14px |

### 间距系统

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
```

### 组件样式

| 组件 | 样式 |
|------|------|
| 按钮 | 圆角8px，padding 0.5rem 1rem |
| 卡片 | 圆角12px，阴影，padding 1.5rem |
| 输入框 | 圆角8px，边框，padding 0.75rem |
| 标签 | 圆角16px，小号字体 |

---

## 📱 响应式设计

| 断点 | 宽度 | 布局 |
|------|------|------|
| 移动端 | < 768px | 单列，底部导航 |
| 平板 | 768-1024px | 双列，侧边栏收起 |
| 桌面 | > 1024px | 多列，完整导航 |

---

## 🚀 部署

### GitHub Pages

```bash
# 1. 进入项目目录
cd lezao-education-platform

# 2. 初始化Git
git init
git add .
git commit -m "Initial commit"

# 3. 创建GitHub仓库并推送
git remote add origin https://github.com/yunque-dada/lezao-education-platform.git
git push -u origin main

# 4. 在GitHub设置GitHub Pages
# Settings → Pages → Source: main branch
```

### 在线访问

- 官网：https://yunque-dada.github.io/lezao-education-platform/
- GitHub：https://github.com/yunque-dada/lezao-education-platform

---

## 📝 开发计划

### Phase 1：基础框架（P0）

- [ ] 项目初始化
- [ ] 首页 + 登录/注册
- [ ] 用户系统（本地）
- [ ] 工作台基础

### Phase 2：编辑器（P0）

- [ ] Scratch编辑器嵌入
- [ ] Python编辑器 + Pyodide
- [ ] 作品保存/加载

### Phase 3：课程系统（P1）

- [ ] 课程展示
- [ ] 任务系统
- [ ] 课堂模式

### Phase 4：云端同步（P1）

- [ ] 飞书用户表对接
- [ ] 飞书作品表对接
- [ ] 云端保存/加载

### Phase 5：管理功能（P2）

- [ ] 班级管理
- [ ] 学生管理
- [ ] 作品批改
- [ ] 统计报表

---

## 📊 更新日志

| 日期 | 版本 | 内容 |
|------|------|------|
| 2026-03-14 | v0.1 | 创建项目，编写开发文档 |

---

## 🔗 相关资源

### 技术文档
- Scratch3：https://github.com/LLK/scratch-gui
- Pyodide：https://pyodide.org/
- 飞书开发：https://open.feishu.cn/

### 参考项目
- Scratch官网：https://scratch.mit.edu/
- Code.org：https://code.org/

---

## ❓ 常见问题

**Q: 如何嵌入Scratch？**
A: 使用iframe或直接嵌入scratch-gui，详见官方文档

**Q: Python如何在浏览器运行？**
A: 使用Pyodide库，它是一个浏览器端的Python解释器

**Q: 作品如何保存？**
A: 初期使用LocalStorage，后续可接入飞书表格

**Q: 老师和学生如何区分？**
A: 注册时选择角色，登录后跳转不同工作台

---
*最后更新：2026-03-14*
*开发状态：规划中*
*版本：v0.1*
