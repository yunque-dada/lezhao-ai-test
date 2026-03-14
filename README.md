# 乐造AI官网

> 乐造AI少儿编程培训机构官方网站

## 📋 项目概述

- **项目名称**：乐造AI官网
- **项目类型**：营销展示网站
- **核心功能**：展示乐造AI少儿编程培训课程，提供课程咨询入口
- **目标用户**：6-12岁儿童的家长

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式设计（原生CSS + CSS变量） |
| JavaScript | 交互逻辑 |
| Google Fonts | 字体（Noto Sans SC + Outfit） |
| GitHub Pages | 部署托管 |

## 📁 目录结构

```
lezao-website/
├── index.html          # 首页
├── courses.html        # 课程体系页
├── scratch.html        # Scratch编程页
├── scratch-course.html  # Scratch课程详情
├── python-course.html  # Python课程详情
├── lego-course.html    # 乐高课程详情
├── wedo-course.html    # 乐高WeDo课程详情
├── register.html       # 报名页
├── poster.html         # 海报生成
├── poster-yilaba.html  # 呀啦吧海报
├── css/                # 样式文件
├── js/                 # 脚本文件
├── img/                # 图片资源
└── scratch3/           # Scratch编辑器（本地）
```

## 📄 页面功能

### 1. 首页 (index.html)
- 顶部导航
- Hero区域（课程介绍）
- 课程特色展示
- 课程体系入口
- 学员作品展示
- 校区环境
- 底部联系信息

### 2. 课程页
- scratch.html：Scratch编程介绍
- python-course.html：Python课程详情
- lego-course.html：乐高大颗粒
- wedo-course.html：乐高WeDo机器人

### 3. 报名页 (register.html)
- 课程选择
- 信息填写表单
- 提交功能

## 🎨 设计系统

### 颜色变量
```css
--primary: #6366f1;        /* 主色-靛蓝 */
--primary-dark: #4f46e5;
--primary-light: #818cf8;
--secondary: #10b981;      /* 成功-绿 */
--accent: #f59e0b;        /* 强调-橙 */
--danger: #ef4444;        /* 警告-红 */
--dark: #0f172a;          /* 深色背景 */
--gray: #64748b;          /* 灰色文字 */
```

### 字体
- 中文：Noto Sans SC
- 英文/数字：Outfit

## 📱 响应式

- 移动端适配：≤768px
- 平板适配：768px-1024px
- 桌面端：>1024px

## 🚀 部署

### GitHub Pages
```bash
cd lezao-website
git add .
git commit -m "Update"
git push
```
部署后访问：https://yunque-dada.github.io/lezhao-ai/

## 📊 待完善功能

- [ ] web-course.html - Web课程页面
- [ ] ai-course.html - AI人工智能课程
- [ ] 修复Scratch iframe嵌入源
- [ ] 在线预约系统
- [ ] 学员作品上传展示

## 📝 更新日志

| 日期 | 内容 |
|------|------|
| 2026-03-09 | 创建项目，基础页面 |
| 2026-03-10 | 优化UI，增加课程详情页 |
| 2026-03-12 | 添加报名页面 |

## 🔗 相关链接

- 官网：https://yunque-dada.github.io/lezhao-ai/
- GitHub：https://github.com/yunque-dada/lezhao-ai

---
*最后更新：2026-03-14*
