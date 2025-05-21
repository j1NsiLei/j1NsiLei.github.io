---
sidebar_position: 0
sidebar_label: 旁站与C段
sidebar_class_name: green
---

# 旁站与C段



旁站是指与目标网站共享同一台服务器或同一IP地址的其他网站。

C段指的是IP地址中前三个字节相同的IP地址范围，即同一C类网络下的所有IP(共256个)。

### 旁站搜集

#### 在线网站

```
https://c.webscan.cc/
https://www.webscan.cc/
https://chapangzhan.com/
```



### C段搜集

#### 在线网站

```
https://c.webscan.cc/
```

#### 网络空间搜索引擎

```shell
#fofa语法
ip="192.168.1.0/24"
#shodan
net:192.168.1.0/24
```

#### Nmap

```bash
nmap -sn 192.168.1.0/24
```

#### google语法

```
site:211.69.130.*
```


