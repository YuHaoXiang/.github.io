import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,b as s}from"./app-CTOT0auB.js";const r={},t=s(`<h2 id="生成ca证书私钥" tabindex="-1"><a class="header-anchor" href="#生成ca证书私钥"><span>生成CA证书私钥</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> ca.key <span class="token number">4096</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="生成ca证书" tabindex="-1"><a class="header-anchor" href="#生成ca证书"><span>生成CA证书</span></a></h2><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>调整-subj选项中的值以反映您的组织。如果使用FQDN连接Harbor主机， 则必须将其指定为通用名称（CN）属性。</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=192.168.100.10&quot;</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">-key</span> ca.key <span class="token punctuation">\\</span>
 <span class="token parameter variable">-out</span> ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成ca证书-1" tabindex="-1"><a class="header-anchor" href="#生成ca证书-1"><span>生成CA证书</span></a></h2><p>生成私钥</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> <span class="token number">192.168</span>.100.10.key <span class="token number">4096</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="生成证书签名请求-csr" tabindex="-1"><a class="header-anchor" href="#生成证书签名请求-csr"><span>生成证书签名请求（CSR）</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-new</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=192.168.100.10&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-key</span> <span class="token number">192.168</span>.100.10.key <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> <span class="token number">192.168</span>.100.10.csr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成一个x509-v3扩展文件" tabindex="-1"><a class="header-anchor" href="#生成一个x509-v3扩展文件"><span>生成一个x509 v3扩展文件</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 域名的形式</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> v3.ext <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=harbor.od.com
DNS.2=harbor.od.com
DNS.3=harbor.od.com
EOF</span>

<span class="token comment"># IP访问</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> v3.ext <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = IP:192.168.100.10
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用该v3-ext文件为您的harbor主机生成证书" tabindex="-1"><a class="header-anchor" href="#使用该v3-ext文件为您的harbor主机生成证书"><span>使用该v3.ext文件为您的Harbor主机生成证书</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-sha512</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-extfile</span> v3.ext <span class="token punctuation">\\</span>
    <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-in</span> harbor.od.com.csr <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> harbor.od.com.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成后ca.crt，harbor.od.com.crt和harbor.od.com.key文件，必须将它们提供给Harbor和docker，重新配置它们</p><h2 id="将服务器证书和密钥复制到harbor主机上的-data-cert-文件夹中" tabindex="-1"><a class="header-anchor" href="#将服务器证书和密钥复制到harbor主机上的-data-cert-文件夹中"><span>将服务器证书和密钥复制到Harbor主机上的/data/cert/文件夹中</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/cert/
<span class="token function">cp</span> harbor.od.com.crt /data/cert/
<span class="token function">cp</span> harbor.od.com.key /data/cert/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换harbor-od-com-crt为harbor-od-com-cert-供docker使用" tabindex="-1"><a class="header-anchor" href="#转换harbor-od-com-crt为harbor-od-com-cert-供docker使用"><span>转换harbor.od.com.crt为harbor.od.com.cert，供Docker使用</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># Docker守护程序将.crt文件解释为CA证书，并将.cert文件解释为客户端证书</span>
openssl x509 <span class="token parameter variable">-inform</span> PEM <span class="token parameter variable">-in</span> harbor.od.com.crt <span class="token parameter variable">-out</span> harbor.od.com.cert
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将服务器证书-密钥和ca文件复制到harbor主机上的docker证书文件夹中。您必须首先创建适当的文件夹" tabindex="-1"><a class="header-anchor" href="#将服务器证书-密钥和ca文件复制到harbor主机上的docker证书文件夹中。您必须首先创建适当的文件夹"><span>将服务器证书，密钥和CA文件复制到Harbor主机上的Docker证书文件夹中。您必须首先创建适当的文件夹</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker/certs.d/harbor.od.com/
<span class="token function">cp</span> harbor.od.com.cert /etc/docker/certs.d/harbor.od.com/
<span class="token function">cp</span> harbor.od.com.key /etc/docker/certs.d/harbor.od.com/
<span class="token function">cp</span> ca.crt /etc/docker/certs.d/harbor.od.com/
<span class="token comment"># 如果将默认</span>
<span class="token comment"># nginx端口443 映射到其他端口，请创建文件夹</span>
<span class="token comment"># /etc/docker/certs.d/yourdomain.com:port或</span>
<span class="token comment"># /etc/docker/certs.d/harbor_IP:port</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重新启动docker-engine" tabindex="-1"><a class="header-anchor" href="#重新启动docker-engine"><span>重新启动Docker Engine</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="证书的目录结构" tabindex="-1"><a class="header-anchor" href="#证书的目录结构"><span>证书的目录结构</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>/etc/docker/certs.d/
└── harbor.od.com
    ├── ca.crt
    ├── harbor.od.com.cert
    └── harbor.od.com.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),i=[t];function c(l,o){return e(),n("div",null,i)}const m=a(r,[["render",c],["__file","CA_generate.html.vue"]]),v=JSON.parse('{"path":"/work/CA_generate.html","title":"CA证书生成","lang":"zh-CN","frontmatter":{"title":"CA证书生成","description":"CA证书制作","tag":["Linux","Harbor","CA"],"head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/work/CA_generate.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"CA证书生成"}],["meta",{"property":"og:description","content":"CA证书制作"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"Harbor"}],["meta",{"property":"article:tag","content":"CA"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CA证书生成\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"生成CA证书私钥","slug":"生成ca证书私钥","link":"#生成ca证书私钥","children":[]},{"level":2,"title":"生成CA证书","slug":"生成ca证书","link":"#生成ca证书","children":[]},{"level":2,"title":"生成CA证书","slug":"生成ca证书-1","link":"#生成ca证书-1","children":[]},{"level":2,"title":"生成证书签名请求（CSR）","slug":"生成证书签名请求-csr","link":"#生成证书签名请求-csr","children":[]},{"level":2,"title":"生成一个x509 v3扩展文件","slug":"生成一个x509-v3扩展文件","link":"#生成一个x509-v3扩展文件","children":[]},{"level":2,"title":"使用该v3.ext文件为您的Harbor主机生成证书","slug":"使用该v3-ext文件为您的harbor主机生成证书","link":"#使用该v3-ext文件为您的harbor主机生成证书","children":[]},{"level":2,"title":"将服务器证书和密钥复制到Harbor主机上的/data/cert/文件夹中","slug":"将服务器证书和密钥复制到harbor主机上的-data-cert-文件夹中","link":"#将服务器证书和密钥复制到harbor主机上的-data-cert-文件夹中","children":[]},{"level":2,"title":"转换harbor.od.com.crt为harbor.od.com.cert，供Docker使用","slug":"转换harbor-od-com-crt为harbor-od-com-cert-供docker使用","link":"#转换harbor-od-com-crt为harbor-od-com-cert-供docker使用","children":[]},{"level":2,"title":"将服务器证书，密钥和CA文件复制到Harbor主机上的Docker证书文件夹中。您必须首先创建适当的文件夹","slug":"将服务器证书-密钥和ca文件复制到harbor主机上的docker证书文件夹中。您必须首先创建适当的文件夹","link":"#将服务器证书-密钥和ca文件复制到harbor主机上的docker证书文件夹中。您必须首先创建适当的文件夹","children":[]},{"level":2,"title":"重新启动Docker Engine","slug":"重新启动docker-engine","link":"#重新启动docker-engine","children":[]},{"level":2,"title":"证书的目录结构","slug":"证书的目录结构","link":"#证书的目录结构","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":1.48,"words":443},"filePathRelative":"work/CA_generate.md","localizedDate":"2024年4月28日"}');export{m as comp,v as data};