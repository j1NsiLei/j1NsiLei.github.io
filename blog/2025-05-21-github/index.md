---
slug: docusaurus update  # 修改为不含空格的URL友好格式
title: Docusaurus update
authors: [jsl]          # 改为数组格式
tags: [docusaurus]
# sidebar: auto         # 可移除（Docusaurus v2默认行为）
# sidebarDepth: 1       # 可移除（除非需要特殊设置）
---

### GitHub page更新命令


```bash
echo 'eval "$(fnm env --shell bash)"' >> ~/.bashrc
source ~/.bashrc
yarn build
yarn serve
git add .
git commit -m "fix: 更新网站"   
git pull origin main
git push origin main
USE_SSH=true GIT_USER=j1NsiLei yarn deploy
```

<!-- truncate -->