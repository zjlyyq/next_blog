---
title: '接入Giscus评价'
date: '2026-07-23'
tags: ['Giscus', '前端']
description: 'Giscus为你的网站或博客提供了一个评论区，但背后“撑腰”的不是传统数据库，而是你的 GitHub 仓库'
published: true
---

Giscus 是一个**免费、开源的评论系统**，它利用 **GitHub Discussions** 来存储和管理你网站上的所有评论。

简单来说，它为你的网站或博客提供了一个评论区，但背后“撑腰”的不是传统数据库，而是你的 **GitHub 仓库**。

### ⚙️ 它是如何工作的？

它的工作流程很巧妙，可以概括为“一找、二创、三评论”：

1.  **关联与查找**：当你网站的访客加载一个页面时，Giscus 会通过 GitHub 的 API，根据你设定的规则（比如当前页面的 **URL** 或 **标题**），去你的 GitHub 仓库里查找是否有对应的 **Discussion（讨论）**。

2.  **自动创建**：如果没找到对应的 Discussion，Giscus 的机器人（Bot）会在**第一次有人发表评论时**，自动为你创建一个新的 Discussion。

3.  **发表评论**：访客想要评论，需要**用他们的 GitHub 账号登录**并授权 Giscus 应用。成功后，评论就会像普通的 GitHub Discussion 一样，被永久地保存在你的仓库里。

### 🚀 如何为你的网站配置 Giscus？

操作起来并不复杂，主要分为两大步。

#### **第一步：在 GitHub 上做好准备**

这是所有操作的基础，需要在你的 GitHub 账号下完成。

1.  **准备一个公开仓库**：Giscus 要求存放评论的仓库必须是 **公开（Public）** 的。你可以用现有的博客源码仓库，但为了方便管理，**更推荐新建一个专门的仓库**来存放评论。
2.  **启用 Discussions 功能**：进入你的仓库页面，点击 **Settings** -> 在左侧菜单找到 **General**，向下滚动找到 **Features** 部分，**勾选 "Discussions"** 即可开启。
3.  **安装 Giscus App**：访问 [Giscus GitHub App](https://github.com/apps/giscus) 页面，点击 **"Install"** 按钮，并**选择你刚才准备好的仓库**进行安装授权。
4.  **创建 Discussion 分类（可选）**：进入你仓库的 **Discussions** 标签页，点击 **"New discussion"**。建议创建一个 **"Announcement"** 类型的分类，比如叫 `Comments` 或 `Blog Comments`，这样评论会更整洁。

#### **第二步：在 Giscus 官网生成配置**

完成 GitHub 的设置后，就可以去 Giscus 官网获取最终的配置代码了。

1.  **访问配置页面**：打开 [Giscus 官网](https://giscus.app/zh-CN)。
2.  **填写信息并获取代码**：在页面表单中填入你的 GitHub 用户名和仓库名，选择你创建的 Discussion 分类（如 `Comments`）。页面下方会自动生成一段 `<script>` 代码。
3.  **复制关键参数**：从生成的代码中，记下 `data-repo`、`data-repo-id`、`data-category` 和 `data-category-id` 这几个关键参数。
    > **请注意**：`data-repo-id` 和 `data-category-id` 这类 ID 比较敏感，建议通过环境变量注入，不要直接写死在代码里并提交到公开仓库。

#### **第三步：将 Giscus 嵌入你的网站**

最后一步，就是将 Giscus 的代码添加到你的网站页面中。

*   **通用方法**：将官网生成的 `<script>` 代码，复制粘贴到你网站模板中希望显示评论区的位置即可。
*   **特定框架**：如果你使用 React、Vue 等框架，可以安装对应的 Giscus 组件（如 `@giscus/react`），用更优雅的方式集成。

完成以上步骤后，你的网站就成功接入了 Giscus 评论系统。访客就能用 GitHub 账号发表评论，而所有数据都将安全地保存在你自己的 GitHub 仓库中。