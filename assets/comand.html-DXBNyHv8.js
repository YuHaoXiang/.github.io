import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as s,b as n}from"./app-CTOT0auB.js";const t={},l=n(`<h2 id="centos7安装redhat源" tabindex="-1"><a class="header-anchor" href="#centos7安装redhat源"><span>centos7安装redhat源</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> centos-release-scl centos-release-scl-rh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看端口占用进程号" tabindex="-1"><a class="header-anchor" href="#查看端口占用进程号"><span>查看端口占用进程号</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-atunlp</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">10010</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="添加用户" tabindex="-1"><a class="header-anchor" href="#添加用户"><span>添加用户</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>openssl <span class="token function">passwd</span> <span class="token parameter variable">-1</span> 
<span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">-s</span> /bin/bash <span class="token parameter variable">-d</span> /home/yhx <span class="token parameter variable">-m</span> yhx <span class="token parameter variable">-p</span> <span class="token string">&#39;$1$vazWhjwT$P03LZFw5FkazWYLoIaPcz0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="alternatives修改命令链接" tabindex="-1"><a class="header-anchor" href="#alternatives修改命令链接"><span>alternatives修改命令链接</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--config</span> 命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="logrotate日志切割" tabindex="-1"><a class="header-anchor" href="#logrotate日志切割"><span>logrotate日志切割</span></a></h2><p>https://blog.csdn.net/qq_32743235/article/details/105934490</p><h2 id="添加docker权限" tabindex="-1"><a class="header-anchor" href="#添加docker权限"><span>添加Docker权限</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">docker</span> <span class="token environment constant">$USER</span> <span class="token operator">&amp;&amp;</span> newgrp <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="axel多线程断点续传" tabindex="-1"><a class="header-anchor" href="#axel多线程断点续传"><span>axel多线程断点续传</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>axel <span class="token parameter variable">-n</span> <span class="token number">10</span> <span class="token parameter variable">-o</span> /tmp/ http://www.jsdig.com/lnmp.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">参数说明</p><p>--max-speed=x , -s x 最高速度x<br> --num-connections=x , -n x 连接数x<br> --output=f , -o f 下载为本地文件f<br> --search[=x] , -S [x] 搜索镜像<br> --header=x , -H x 添加头文件字符串x（指定 HTTP header）<br> --user-agent=x , -U x 设置用户代理（指定 HTTP user agent）<br> --no-proxy ， -N 不使用代理服务器<br> --quiet ， -q 静默模式<br> --verbose ，-v 更多状态信息<br> --alternate ， -a Alternate progress indicator<br> --help ，-h 帮助<br> --version ，-V 版本信息</p></div><h2 id="查看系统运行负载-tcp-socket-memory" tabindex="-1"><a class="header-anchor" href="#查看系统运行负载-tcp-socket-memory"><span>查看系统运行负载（TCP,SOCKET,Memory）</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">watch</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token string">&quot;ss -s &amp;&amp; uptime &amp;&amp;free -m&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="firewalld" tabindex="-1"><a class="header-anchor" href="#firewalld"><span>firewalld</span></a></h2><h3 id="防火墙快速开放端口" tabindex="-1"><a class="header-anchor" href="#防火墙快速开放端口"><span>防火墙快速开放端口</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd --list-port  <span class="token comment">#查看开发端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8203</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="大量文件转移-复制" tabindex="-1"><a class="header-anchor" href="#大量文件转移-复制"><span>大量文件转移/复制</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">find</span> 源文件路径 <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&#39;*.jpg&#39;</span> <span class="token parameter variable">-exec</span> <span class="token function">mv</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 目标路径 <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="curl" tabindex="-1"><a class="header-anchor" href="#curl"><span>curl</span></a></h2><h2 id="nc" tabindex="-1"><a class="header-anchor" href="#nc"><span>nc</span></a></h2>`,24),r=[l];function i(c,o){return e(),s("div",null,r)}const h=a(t,[["render",i],["__file","comand.html.vue"]]),m=JSON.parse('{"path":"/software/linux/comand.html","title":"常用命令","lang":"zh-CN","frontmatter":{"title":"常用命令","icon":"linux","order":1,"category":"Linux","tag":["Git","shell"],"description":"centos7安装redhat源 查看端口占用进程号 添加用户 alternatives修改命令链接 logrotate日志切割 https://blog.csdn.net/qq_32743235/article/details/105934490 添加Docker权限 axel多线程断点续传 参数说明 --max-speed=x , -s x 最高速...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/linux/comand.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"常用命令"}],["meta",{"property":"og:description","content":"centos7安装redhat源 查看端口占用进程号 添加用户 alternatives修改命令链接 logrotate日志切割 https://blog.csdn.net/qq_32743235/article/details/105934490 添加Docker权限 axel多线程断点续传 参数说明 --max-speed=x , -s x 最高速..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"shell"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"centos7安装redhat源","slug":"centos7安装redhat源","link":"#centos7安装redhat源","children":[]},{"level":2,"title":"查看端口占用进程号","slug":"查看端口占用进程号","link":"#查看端口占用进程号","children":[]},{"level":2,"title":"添加用户","slug":"添加用户","link":"#添加用户","children":[]},{"level":2,"title":"alternatives修改命令链接","slug":"alternatives修改命令链接","link":"#alternatives修改命令链接","children":[]},{"level":2,"title":"logrotate日志切割","slug":"logrotate日志切割","link":"#logrotate日志切割","children":[]},{"level":2,"title":"添加Docker权限","slug":"添加docker权限","link":"#添加docker权限","children":[]},{"level":2,"title":"axel多线程断点续传","slug":"axel多线程断点续传","link":"#axel多线程断点续传","children":[]},{"level":2,"title":"查看系统运行负载（TCP,SOCKET,Memory）","slug":"查看系统运行负载-tcp-socket-memory","link":"#查看系统运行负载-tcp-socket-memory","children":[]},{"level":2,"title":"firewalld","slug":"firewalld","link":"#firewalld","children":[{"level":3,"title":"防火墙快速开放端口","slug":"防火墙快速开放端口","link":"#防火墙快速开放端口","children":[]}]},{"level":2,"title":"大量文件转移/复制","slug":"大量文件转移-复制","link":"#大量文件转移-复制","children":[]},{"level":2,"title":"curl","slug":"curl","link":"#curl","children":[]},{"level":2,"title":"nc","slug":"nc","link":"#nc","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":1.04,"words":311},"filePathRelative":"software/linux/comand.md","localizedDate":"2024年4月28日","autoDesc":true}');export{h as comp,m as data};
