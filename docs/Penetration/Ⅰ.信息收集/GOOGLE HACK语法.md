---
sidebar_position: 0
sidebar_label: GOOGLE HACK语法
sidebar_class_name: green
---

# GOOGLE HACK语法


### 语法解析

`“”`：匹配关键词

`*`：代表任意字符

`+` `AND` `&` `&&`连接搜索关键词    “xx+xx”或者“xx” AND "xx"

`or` `|`：或，满足一个就行

`intitle`：检索标题中含有某个关键词页面   `intitle:"xxx"`

`intext`：检索正文中含有的关键词页面   `intext:"xxxxx"`

`inurl`：检索目标url   `inurl:"https://xx.com"`或者检索url中含有关键词的子页面   `inurl:/admin`

`filetype`：检索指定文件类型   `pdf|xls|xlsx|docx|ini`等

`site`：检索指定域名  `site:google.com filetype:pdf`

`link`: 可以得到一个所有包含了某个指定URL的页面列表. 例如`link:http://www.google.com` 就可以得到所有连接到Google的页面

### 使用案例

#### 找后台登录页面

```
site:xx.com inurl:login|admin|manage|system|master|admin_login
site:xx.com intext:管理|后台|登录|登陆|用户名|密码|验证码|账号|login|system
site:xx.com intitle:管理|后台|登录|登陆|用户名|密码|验证码|账号|login|system
```

#### 找文件上传点

```
site:xx.com inurl:file|upload|fileUpload
site:xx.com intext:上传|提交|上传文件|点击上传
```

#### 找注入点

```
site:xx.com inurl:"?id="
site;xx.com inurl:"php?id="
```

#### 找目录遍历漏洞

```
site:xx.com inurl:"index of"
```

#### 找url跳转

```
site:xx.com inurl:url=|return=
```

#### 找是否存在phpinfo()泄露

```
inurl:phpinfo
```

#### 找邮箱信息

```
site:xx.com 邮箱
site:xx.com @ or email
```

#### 找公开文件泄露

```
site:xx.com filetype:.doc | .docx| .docx | .xls | .xlsx | .ppt | .pptx | .odt | .pdf | .rtf | .sxw | .psw | .csv
```

#### 找配置文件泄露

```
site:xx.com ext:.xml | .conf | .cnf | .reg | .inf | .rdp | .cfg | .txt | .ora | .ini 
```

#### 找数据库文件泄露

```
site:xx.com ext:.mdb | .sql | .db | .dbf
```

#### 找日志文件泄露

```
site:xx.com ext:.log
```

#### 找备份和历史文件泄露

```
site:xx.com ext:.bkf | .bkp | .old | .backup | .bak| .swp | .rar | .txt | .zip | .7z | .tar.gz | .tgz | .tar
```



#### 参考文章

[详解GOOGLE HACK语法（含挖洞常见的搜索）_用google hack 挖洞-CSDN博客](https://blog.csdn.net/weixin_50464560/article/details/117081786)
