---
sidebar_position: 0
sidebar_label: CDN绕过
sidebar_class_name: green
---

# CDN绕过

CDN (内容分发网络) 指的是一组分布在各个地区的服务器。这些服务器存储着数据的副本，因此服务器可以根据哪些服务器与用户距离最近，来满足数据的请求。CDN 提供快速服务，较少受高流量影响。CDN的主要目标是提高网站的性能和可用性。CDN通过将内容缓存到分布在全球各地的边缘节点上，使用户能够从离他们最近的服务器获取网站内容，从而减少了内容传输的延迟和带宽消耗。



### 检测是否存在CDN

#### nslookup命令

```bash
nslookup xxx.com
```

#### 超级ping

```
https://17ce.com/
http://ping.chinaz.com/
http://ping.aizhan.com/
```

#### 修改本地host文件

```shell
#IP+域名，访问域名看是否能够正确解析
x.x.x.x xx.com  
```



### 绕过CDN

#### 子域名绕过

某些企业业务线较多，只是有些站点的主站或者部分域名使用了CDN加速，但是一些子域名并未使用CDN加速服务，那么就可以通过未使用CDN加速服务的子域名获取目标的真实IP。

#### phpinfo()泄露

`sever_addr`参数泄露服务器`IP`

#### 国外请求

一些网站配置的CDN服务可能仅仅只是作用于国内，而未配置国外或者没配置国外的一些小型的国家，可以通过国外的节点进行ping来获得真正的IP

```
#国外请求节点
https://tools.ipip.net/cdn.php
或者使用超级ping
```

#### DNS历史解析记录

查找该域名的历史解析记录，可能在该域名未配置CDN时解析过真实IP

#### 邮件服务查询（目前基本没用）

我们在网站注册时可能会需要绑定邮箱，有邮箱验证发验证码，可能在邮件的源码里就包含服务器的真实IP，但是目前基本都是用第三方邮箱（163等）进行发送，或者可能是单独的邮箱服务器，没有挂网站在上面，所以这个方法目前基本没用

#### fuckcdn工具

工具地址：

```
https://github.com/Tai7sy/fuckcdn
#扫全网获取真实IP
https://github.com/superfish9/hackcdn
https://github.com/boy-hack/w8fuckcdn
```

#### SSL证书查询

通过https的SSL证书hash值进行查

```
https://crt.sh/?q=HASH值（SHA-256）
https://search.censys.io/certificates?q= HASH值（SHA-256）
```

#### 去除www

在配置CDN的时候，需要指定域名、端口等信息，许多网站将www.xx.com和xx.com解析到同一个网站，并且只做了www.xx.com的cdn，所以我们通过访问xx.com，就可以绕过cdn，得到真实IP

#### 空间搜索引擎

fofa，钟馗之眼等进行查询

推荐棱角平台(集成众多工具)

```
https://forum.ywhack.com/bountytips.php?tools
```




