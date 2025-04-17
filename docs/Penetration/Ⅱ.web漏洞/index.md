---
sidebar_position: 1
sidebar_label: web漏洞
sidebar_class_name: green
---

# OWASP TOP 10 (2024)  

OWASP TOP 10 是由 Open Web Application Security Project（OWASP）发布的十大最严重、最普遍的 Web 应用程序安全漏洞。这些漏洞在当今的 Web 应用程序中非常普遍，而且具有很高的危害性。  

---  

### A1: 注入漏洞（Injection）  

注入漏洞是指攻击者通过向 Web 页面或应用程序输入恶意数据，从而实现对 Web 页面或应用程序的攻击和控制。包括 SQL 注入、OS 注入、LDAP 注入等。  

---  

### A2: 失效的访问控制（Broken Access Control）  

失效的访问控制意味着某些页面或功能可以被未授权的用户访问，可能导致敏感信息泄露或未授权的功能执行。  

---  

### A3: 敏感数据泄露（Sensitive Data Exposure）  

由于加密机制失败，敏感数据（如密码、信用卡信息）可能会被泄露。  

---  

### A4: 不安全的设计（Insecure Design）  

不安全的设计指的是在软件设计阶段未能充分考虑安全因素，导致安全漏洞。  

---  

### A5: 安全配置错误（Security Misconfiguration）  

安全配置错误包括不正确配置安全设置，如不安全的 API 密钥暴露、默认密码等。  

---  

### A6: 易受攻击和过时的组件（Vulnerable and Outdated Components）  

使用已知存在安全漏洞的第三方组件，可能导致系统被攻击。  

---  

### A7: 身份识别和身份验证错误（Identification and Authentication Failures）  

身份验证机制的失败可能导致未授权的访问。  

---  

### A8: 软件和数据完整性故障（Software and Data Integrity Failures）  

未能保护软件和数据的完整性，可能导致恶意软件的安装或数据篡改。  

---  

### A9: 安全日志记录和监控故障（Security Logging & Monitoring Failures）  

安全日志记录和监控的不足可能导致安全事件未被及时发现和响应。  

---  

### A10: 服务器端请求伪造（SSRF）  

服务器端请求伪造允许攻击者通过服务器发起恶意请求，可能导致内部系统的数据泄露或服务中断。  