import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as e}from"./app-CTOT0auB.js";const t="/work-blog/assets/active_mode-CEzkAnGk.jpg",i="/work-blog/assets/passive_mode-lTuHWOIs.jpg",l={},p=e('<h1 id="ftp和sftp区别" tabindex="-1"><a class="header-anchor" href="#ftp和sftp区别"><span>ftp和sftp区别</span></a></h1><h2 id="链接方式不同" tabindex="-1"><a class="header-anchor" href="#链接方式不同"><span>链接方式不同</span></a></h2><p>FTP 使用 TCP 端口 21 上的控制连接建立连接。而 SFTP 是在客户端和服务器之间通过 SSH 协议 (TCP 端口 22) 建立的安全连接来传输文件。</p><h2 id="安全性不同" tabindex="-1"><a class="header-anchor" href="#安全性不同"><span>安全性不同</span></a></h2><p>SFTP 使用加密传输认证信息和传输的数据，所以使用 SFTP 相对于 FTP 是非常安全。</p><h2 id="效率不同" tabindex="-1"><a class="header-anchor" href="#效率不同"><span>效率不同</span></a></h2><p>SFTP 这种传输方式使用了加密解密技术，所以传输效率比普通的 FTP 要低得多。</p><h2 id="协议不同" tabindex="-1"><a class="header-anchor" href="#协议不同"><span>协议不同</span></a></h2><p>FTP 使用 TCP / IP 协议。而，SFTP 是 SSH 协议的一部分，它是一种远程登录信息。</p><h2 id="安全通道" tabindex="-1"><a class="header-anchor" href="#安全通道"><span>安全通道</span></a></h2><p>FTP 不提供任何安全通道来在主机之间传输文件；而 SFTP 协议提供了一个安全通道，用于在网络上的主机之间传输文件。</p><h1 id="ftp主被动模式区别" tabindex="-1"><a class="header-anchor" href="#ftp主被动模式区别"><span>ftp主被动模式区别</span></a></h1><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>下面的图表会帮助管理员们记住每种FTP方式是怎样工作的：<br><strong>主动FTP</strong><br> 　　命令连接：客户端 &gt;1023端口 -&gt; 服务器 21端口<br> 　　数据连接：客户端 &gt;1023端口 &lt;- 服务器 20端口<br><strong>被动FTP</strong><br> 　　命令连接：客户端 &gt;1023端口 -&gt; 服务器 21端口<br> 　　数据连接：客户端 &gt;1023端口 -&gt; 服务器 &gt;1023端口</p><h2 id="主动模式" tabindex="-1"><a class="header-anchor" href="#主动模式"><span>主动模式</span></a></h2><p>主动模式下，FTP客户端从任意的非特殊的端口(N &gt; 1023)连入到FTP服 器的命令端口--21端口。然后客户端在N+1(N+1 &gt;= 1024)端口监听，并 通过N+1(N+1 &gt;= 1024)端口发送命令给FTP服务器。服务器会反过来连接 户本地指定的数据端口，比如20端口。   以服务器端防火墙为立足点，要支持主动模式FTP需要打开如下交互中使用到的端口：</p><ul><li>FTP服务器命令(21)端口接受客户端任意端口(客户端初始连接)</li><li>FTP服务器命令(21)端口到客户端端口(&gt;1023)(服务器响应客户端命令)</li><li>FTP服务器数据(20)端口到客户端端口(&gt;1023)(服务器初始化数据连接到客户端数据端口)</li><li>FTP服务器数据(20)端口接受客户端端口(&gt;1023)(客户端发送ACK包到服务器的数据端口)</li></ul><p>用图表示如下：<br><img src="'+t+'" alt="主动模式" loading="lazy"></p><ol><li>客户端的命令端口与FTP服务器的命令端口建立连接，并发送命令“PORT 1027”。</li><li>FTP服务器给客户端的命令端口返回一个&quot;ACK&quot;。</li><li>FTP服务器发起一个从它自己的数据端口(20)到客户端先前指定的数据端口(1027)的连接。</li><li>最后客户端给服务器端返回一个&quot;ACK&quot;。</li></ol><div class="hint-container info"><p class="hint-container-title">注意</p><p>主动方式FTP的主要问题实际上在于客户端。FTP的客户端并没有实际建立一个到服务器数据端口的连接，它只是简单的告诉服务器自己监听的端口号，服务器再回来连接客户端这个指定的端口。对于客户端的防火墙来说，这是从外部系统建立到内部客户端的连接，这是通常会被阻塞的。</p></div><h2 id="被动模式" tabindex="-1"><a class="header-anchor" href="#被动模式"><span>被动模式</span></a></h2><p>  为了解决服务器发起到客户的连接的问题，人们开发了一种不同的FTP连接方式。这就是所谓的被动方式，或者叫做PASV，当客户端通知服务器它处于被动模式时才启用。   在被动方式FTP中，命令连接和数据连接都由客户端，这样就可以解决从服务器到客户端的数据端口的入方向连接被防火墙过滤掉的问题。当开启一个FTP连接时，客户端打开两个任意的非特权本地端口(N &gt;; 1024和N+1)。第一个端口连接服务器的21端口，但与主动方式的FTP不同，客户端不会提交PORT命令并允许服务器来回连它的数据端口，而是提交PASV命令。这样做的结果是服务器会开启一个任意的非特权端口(P &gt;; 1024)，并发送PORT P命令给客户端。然后客户端发起从本地端口N+1到服务器的端口P的连接用来传送数据。   对于服务器端的防火墙来说，必须允许下面的通讯才能支持被动方式的FTP:</p><ul><li>FTP服务器命令(21)端口接受客户端任意端口(客户端初始连接)</li><li>FTP服务器命令(21)端口到客户端端口(&gt;1023)(服务器响应客户端命令)</li><li>FTP服务器数据端口(&gt;1023)接受客户端端口(&gt;1023)(客户端初始化数据连接到服务器指定的任意端口)</li><li>FTP服务器数据端口(&gt;1023)到客户端端口(&gt;1023)(服务器发送ACK响应和数据到客户端的数据端口) 用图表示如下：<br><img src="'+i+`" alt="被动模式" loading="lazy"></li></ul><ol><li>客户端的命令端口与服务器的命令端口建立连接，并发送命令“PASV”。</li><li>服务器返回命令&quot;PORT 2024&quot;，告诉客户端（服务器）用哪个端口侦听数据连接。</li><li>客户端初始化一个从自己的数据端口到服务器端指定的数据端口的数据连接。</li><li>最后服务器给客户端的数据端口返回一个&quot;ACK&quot;响应。</li></ol><p>  被动方式的FTP解决了客户端的许多问题，但同时给服务器端带来了更多的问题。最大的问题是需要允许从任意远程终端到服务器高位端口的连接。幸运的是，许多FTP守护程序，包括流行的WU-FTPD允许管理员指定FTP服务器使用的端口范围。详细内容参看附录1。<br>   第二个问题是客户端有的支持被动模式，有的不支持被动模式，必须考虑如何能支持这些客户端，以及为他们提供解决办法。例如，Solaris提供的FTP命令行工具就不支持被动模式，需要第三方的FTP客户端，比如ncftp。<br>   随着WWW的广泛流行，许多人习惯用web浏览器作为FTP客户端。大多数浏览器只在访问ftp://这样的URL时才支持被动模式。这到底是好还是坏取决于服务器和防火墙的配置。</p><div class="hint-container info"><p class="hint-container-title">备注</p><p>有读者指出，当NAT(Network Address Translation)设备以主动模式访问FTP服务器时，由于NAT设备不会聪明的变更FTP包中的IP地址，从而导致无法访问服务器。</p></div><h1 id="tls安全验证" tabindex="-1"><a class="header-anchor" href="#tls安全验证"><span>tls安全验证</span></a></h1><p>在<code>/etc/vsftp/vsftp.conf</code>中做如下修改</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES
require_ssl_reuse=NO
listen=YES
listen_ipv6=NO
pasv_enable=YES
pasv_min_port=49000
pasv_max_port=50000
#pasv_address=101.91.136.47
pasv_address=192.168.100.88
#pasv_address=ftp.sectrend.com.cn
pasv_promiscuous=YES  # 允许pasv被动模式ip混乱，防火墙nat映射到本机需要开启，要不然会报错 ftplib.error_temp: 425 Security: Bad IP connecting.

SSL配置
ssl_enable=YES
ssl_tlsv1=YES
ssl_sslv2=YES
ssl_sslv3=YES
allow_anon_ssl=YES
force_local_data_ssl=YES
force_local_logins_ssl=YES
rsa_cert_file=/etc/vsftpd/sectrend.com.cn.pem
rsa_private_key_file=/etc/vsftpd/sectrend.com.cn.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加用户" tabindex="-1"><a class="header-anchor" href="#添加用户"><span>添加用户</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> /bin/bash ftpuser
<span class="token builtin class-name">echo</span> <span class="token string">&quot;sftp@1qaz&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> ftpuser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="被动模式list指令无响应" tabindex="-1"><a class="header-anchor" href="#被动模式list指令无响应"><span>被动模式LIST指令无响应</span></a></h2><p>检查firewalld端口开放情况</p><h2 id="python连接demo代码" tabindex="-1"><a class="header-anchor" href="#python连接demo代码"><span>python连接demo代码</span></a></h2><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> ftplib
<span class="token keyword">import</span> ssl




ftp_client<span class="token operator">=</span>ftplib<span class="token punctuation">.</span>FTP_TLS<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">#ftp_client.set_pasv(False)</span>
ftp_client<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;ftp.sectrend.com.cn&#39;</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">2221</span><span class="token punctuation">)</span>
<span class="token comment">#ftp_client.connect(host=&#39;192.168.100.88&#39;, port=21)</span>
ftp_client<span class="token punctuation">.</span>login<span class="token punctuation">(</span>user<span class="token operator">=</span><span class="token string">&#39;ftpuser&#39;</span><span class="token punctuation">,</span> passwd<span class="token operator">=</span><span class="token string">&#39;sftp@1qaz&#39;</span><span class="token punctuation">)</span>
ftp_client<span class="token punctuation">.</span>prot_p<span class="token punctuation">(</span><span class="token punctuation">)</span>



<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;ftp连接成功.......&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 执行FTP操作</span>
<span class="token comment"># 例如：列出FTP服务器上的文件</span>
ftp_client<span class="token punctuation">.</span>retrlines<span class="token punctuation">(</span><span class="token string">&#39;LIST&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭FTP连接</span>
ftp_client<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),c=[p];function o(r,d){return s(),a("div",null,c)}const m=n(l,[["render",o],["__file","vsftp.html.vue"]]),h=JSON.parse('{"path":"/software/linux/vsftp.html","title":"FTP服务搭建","lang":"zh-CN","frontmatter":{"title":"FTP服务搭建","description":"ftp和sftp区别 链接方式不同 FTP 使用 TCP 端口 21 上的控制连接建立连接。而 SFTP 是在客户端和服务器之间通过 SSH 协议 (TCP 端口 22) 建立的安全连接来传输文件。 安全性不同 SFTP 使用加密传输认证信息和传输的数据，所以使用 SFTP 相对于 FTP 是非常安全。 效率不同 SFTP 这种传输方式使用了加密解密技...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/linux/vsftp.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"FTP服务搭建"}],["meta",{"property":"og:description","content":"ftp和sftp区别 链接方式不同 FTP 使用 TCP 端口 21 上的控制连接建立连接。而 SFTP 是在客户端和服务器之间通过 SSH 协议 (TCP 端口 22) 建立的安全连接来传输文件。 安全性不同 SFTP 使用加密传输认证信息和传输的数据，所以使用 SFTP 相对于 FTP 是非常安全。 效率不同 SFTP 这种传输方式使用了加密解密技..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FTP服务搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"链接方式不同","slug":"链接方式不同","link":"#链接方式不同","children":[]},{"level":2,"title":"安全性不同","slug":"安全性不同","link":"#安全性不同","children":[]},{"level":2,"title":"效率不同","slug":"效率不同","link":"#效率不同","children":[]},{"level":2,"title":"协议不同","slug":"协议不同","link":"#协议不同","children":[]},{"level":2,"title":"安全通道","slug":"安全通道","link":"#安全通道","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"主动模式","slug":"主动模式","link":"#主动模式","children":[]},{"level":2,"title":"被动模式","slug":"被动模式","link":"#被动模式","children":[]},{"level":2,"title":"添加用户","slug":"添加用户","link":"#添加用户","children":[]},{"level":2,"title":"被动模式LIST指令无响应","slug":"被动模式list指令无响应","link":"#被动模式list指令无响应","children":[]},{"level":2,"title":"python连接demo代码","slug":"python连接demo代码","link":"#python连接demo代码","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":6.33,"words":1899},"filePathRelative":"software/linux/vsftp.md","localizedDate":"2024年4月28日","autoDesc":true}');export{m as comp,h as data};
