# GitHub Pages 部署指南

本文档提供了将祝福泡泡生成器(BUDDHASPOP)项目部署到GitHub Pages的详细步骤。

## 准备工作

1. 确保你有一个GitHub账号
2. 安装Git（如果尚未安装）

## 部署步骤

### 1. 创建GitHub仓库

1. 登录GitHub账号
2. 点击右上角的"+"按钮，选择"New repository"
3. 填写仓库名称（例如：BUDDHASPOP）
4. 选择公开（Public）仓库
5. 点击"Create repository"按钮创建仓库

### 2. 初始化Git并推送代码

```bash
# 进入项目目录
cd path/to/BUDDHASPOP/client

# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/BUDDHASPOP.git

# 推送到主分支
git push -u origin main
```

### 3. 构建项目

```bash
# 构建项目
npm run build
```

### 4. 部署到GitHub Pages

#### 方法一：使用gh-pages分支

1. 创建并切换到gh-pages分支
   ```bash
   git checkout -b gh-pages
   ```

2. 将dist目录中的内容复制到仓库根目录
   ```bash
   # 删除除了dist和.git以外的所有文件
   find . -maxdepth 1 ! -name 'dist' ! -name '.git' ! -name '.' -exec rm -rf {} \;
   
   # 将dist目录中的内容移动到根目录
   mv dist/* .
   rm -rf dist
   ```

3. 提交并推送更改
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push -u origin gh-pages
   ```

#### 方法二：使用GitHub Actions自动部署

1. 在仓库根目录创建`.github/workflows/deploy.yml`文件，内容如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

2. 提交并推送此文件
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

### 5. 配置GitHub Pages

1. 在GitHub仓库页面，点击"Settings"选项卡
2. 在左侧菜单中找到"Pages"选项
3. 在"Source"部分，选择你的部署分支（gh-pages或main）
4. 点击"Save"按钮
5. 等待几分钟，GitHub会提供一个URL，通常格式为：`https://你的用户名.github.io/BUDDHASPOP/`

## 注意事项

- 确保vite.config.js中已设置正确的base路径：`base: './'`
- 确保App.jsx中使用的是HashRouter而非BrowserRouter
- 如果遇到路由问题，可能需要调整路由配置

## 验证部署

部署完成后，访问GitHub提供的URL，确保所有功能正常工作。如果发现问题，检查控制台错误信息并相应调整代码。