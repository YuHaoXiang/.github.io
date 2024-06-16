import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r,o as l,c as p,d as a,e as n,a as c,b as s}from"./app-CTOT0auB.js";const i={},o=s(`<h1 id="现象" tabindex="-1"><a class="header-anchor" href="#现象"><span>现象</span></a></h1><p>使用以下脚本跨机器访问engine。在容器内部会出现丢包，在容器外部不存在，当把容器的网络模式改成host后问题没有了。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">n</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token variable">$n</span> <span class="token parameter variable">-lt</span> <span class="token number">20</span> <span class="token punctuation">]</span>
<span class="token keyword">do</span>
        <span class="token builtin class-name">let</span> <span class="token assign-left variable">n</span><span class="token operator">+=</span><span class="token number">1</span>
        cleansource-py scan <span class="token parameter variable">-w</span> oceanbase-master.wfp  <span class="token parameter variable">--apiurl</span> http://192.168.9.240:38888/api/scan/direct <span class="token parameter variable">-T30</span> <span class="token parameter variable">-o</span> <span class="token variable">\${n}</span>.json <span class="token operator">&amp;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="可能的原因" tabindex="-1"><a class="header-anchor" href="#可能的原因"><span>可能的原因</span></a></h1><p>高并发 NAT 导致 conntrack 插入冲突,如果高并发并且做了 NAT，比如使用了 ip-masq-agent，对集群外的网段或公网进行 SNAT，又或者集群内访问 Service 被做了 DNAT，再加上高并发的话，内核就会高并发进行 NAT 和 conntrack 插入，当并发 NAT 后五元组冲突，最终插入的时候只有先插入的那个成功，另外冲突的就会插入失败，然后就丢包了。</p><p>可以通过 conntrack -S 确认，如果 insert_failed 计数在增加，说明有 conntrack 插入冲突。</p><h2 id="conntrack-表爆满" tabindex="-1"><a class="header-anchor" href="#conntrack-表爆满"><span>conntrack 表爆满</span></a></h2><p>看内核日志:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># dmesg日志</span>
$ journalctl <span class="token parameter variable">-k</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;nf_conntrack: table full&quot;</span>
nf_conntrack: nf_conntrack: table full, dropping packet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若有以上报错，证明 conntrack 表满了，需要调大 conntrack 表:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">net.netfilter.nf_conntrack_max</span><span class="token operator">=</span><span class="token number">1000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="socket-buffer-满导致丢包" tabindex="-1"><a class="header-anchor" href="#socket-buffer-满导致丢包"><span>socket buffer 满导致丢包</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-s</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;buffer errors&quot;</span> 
<span class="token comment">## errors数值一直在增大，说明流量较大，socket buffer 不够用，需要调大下 buffer 容量，修改/etc/sysctl.conf</span>
net.ipv4.tcp_wmem <span class="token operator">=</span> <span class="token number">4096</span>        <span class="token number">16384</span>   <span class="token number">4194304</span>
net.ipv4.tcp_rmem <span class="token operator">=</span> <span class="token number">4096</span>        <span class="token number">87380</span>   <span class="token number">6291456</span>
net.ipv4.tcp_mem <span class="token operator">=</span> <span class="token number">381462</span>       <span class="token number">508616</span>  <span class="token number">762924</span>
net.core.rmem_default <span class="token operator">=</span> <span class="token number">8388608</span>
net.core.rmem_max <span class="token operator">=</span> <span class="token number">26214400</span>
net.core.wmem_max <span class="token operator">=</span> <span class="token number">26214400</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="arp-表爆满​" tabindex="-1"><a class="header-anchor" href="#arp-表爆满​"><span>arp 表爆满​</span></a></h2><p>看内核日志:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># demsg</span>
$ journalctl <span class="token parameter variable">-k</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;neighbor table overflow&quot;</span>
arp_cache: neighbor table overflow<span class="token operator">!</span>
<span class="token comment"># 若有以上报错，证明 arp 表满了，查看当前 arp 记录数:</span>
$ arp <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token number">1335</span>
<span class="token comment"># 查看 arp gc 阀值:</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">grep</span> gc_thresh
net.ipv4.neigh.default.gc_thresh1 <span class="token operator">=</span> <span class="token number">128</span>
net.ipv4.neigh.default.gc_thresh2 <span class="token operator">=</span> <span class="token number">512</span>
net.ipv4.neigh.default.gc_thresh3 <span class="token operator">=</span> <span class="token number">1024</span>

<span class="token comment"># 调大 arp 表:</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">net.ipv4.neigh.default.gc_thresh1</span><span class="token operator">=</span><span class="token number">80000</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">net.ipv4.neigh.default.gc_thresh2</span><span class="token operator">=</span><span class="token number">90000</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">net.ipv4.neigh.default.gc_thresh3</span><span class="token operator">=</span><span class="token number">100000</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d={href:"https://imroc.cc/kubernetes-troubleshooting/methods/network/packet-loss",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="连接队列满导致丢包​" tabindex="-1"><a class="header-anchor" href="#连接队列满导致丢包​"><span>连接队列满导致丢包​</span></a></h2><p>对于 TCP 连接，三次握手建立连接，没建连成功前存储在半连接队列，建连成功但还没被应用层 accept 之前，存储在全连接队列。队列大小是有上限的，如果慢了就会丢包：</p><ul><li>如果并发太高或机器负载过高，半连接队列可能会满，新来的 SYN 建连包会被丢包。</li><li>如果应用层 accept 连接过慢，会导致全连接队列堆积，满了就会丢包，通常是并发高、机器负载高或应用 hung 死等原因。 查看丢包统计:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">netstat</span> <span class="token parameter variable">-s</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;drop|overflow&#39;</span>

$ <span class="token function">cat</span> /proc/net/netstat <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/TcpExt/ { print $21,$22 }&#39;</span>
ListenOverlows ListenDrops
<span class="token number">20168</span> <span class="token number">20168</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不同内核版本的列号可能有差别</strong><br> 如果有现场，还可以观察全连接队列阻塞情况 (Rec-Q): <code>ss -lnt</code> 通过以下内核参数可以调整队列大小 (namespace隔离):</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># /etc/sysctl.conf</span>
net.ipv4.tcp_max_syn_backlog <span class="token operator">=</span> <span class="token number">8096</span> <span class="token comment"># 调整半连接队列上限net.core.somaxconn = 32768 # 调整全连接队列上限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">注意</p><p>需要注意的是，somaxconn 只是调整了队列最大的上限，但实际队列大小是应用在 listen 时传入的 backlog 大小，大多编程语言默认会自动读取 somaxconn 的值作为 listen 系统调用的 backlog 参数的大小。 如果是用 nginx，backlog 的值需要在 nginx.conf 配置中显示指定，否则会用它自己的默认值 511。</p></div><h2 id="源端口耗尽" tabindex="-1"><a class="header-anchor" href="#源端口耗尽"><span>源端口耗尽</span></a></h2><p>当作为 client 发请求，或外部流量从 NodePort 进来时进行 SNAT，会从当前 netns 中选择一个端口作为源端口，端口范围由 net.ipv4.ip_local_port_range 这个内核参数决定，如果并发量大，就可能导致源端口耗尽，从而丢包。</p><h2 id="tcp-tw-recycle-导致丢包​" tabindex="-1"><a class="header-anchor" href="#tcp-tw-recycle-导致丢包​"><span>tcp_tw_recycle 导致丢包​</span></a></h2><p>在低 版本内核中(比如 3.10)，支持使用 tcp_tw_recycle 内核参数来开启 TIME_WAIT 的快速回收，但如果 client 也开启了 timestamp (一般默认开启)，同时也就会导致在 NAT 环境丢包，甚至没有 NAT 时，稍微高并发一点，也会导致 PAWS 校验失败，导致丢包:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 看 SYN 丢包是否全都是 PAWS 校验失败</span>
$ <span class="token function">cat</span> /proc/net/netstat <span class="token operator">|</span> <span class="token function">grep</span> TcpE<span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $15, $22}&#39;</span>
PAWSPassive ListenDrops
<span class="token number">96305</span> <span class="token number">96305</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="listen-端口-和-port-range-范围内的端口冲突" tabindex="-1"><a class="header-anchor" href="#listen-端口-和-port-range-范围内的端口冲突"><span>listen 端口 和 port_range 范围内的端口冲突</span></a></h2><p>比如 net.ipv4.ip_local_port_range=&quot;1024 65535&quot;，但又 listen 了 9100 端口，当作为 client 发请求时，选择一个 port_range 范围内的端口作为源端口，就可能选到 9100，但这个端口已经被 listen 了，就可能会选取失败，导致丢包。</p><h1 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h1><ul><li>https://github.com/torvalds/linux/blob/v3.10/net/ipv4/tcp_ipv4.c#L1465</li><li>https://www.freesoft.org/CIE/RFC/1323/13.htm</li><li>https://zhuanlan.zhihu.com/p/35684094</li><li>https://my.oschina.net/u/4270811/blog/3473655/print</li></ul>`,16);function u(v,k){const e=r("ExternalLinkIcon");return l(),p("div",null,[o,a("p",null,[n("更多请参考 节点排障: "),a("a",d,[n("Arp 表爆满"),c(e)]),n("。")]),m])}const g=t(i,[["render",u],["__file","container_network.html.vue"]]),f=JSON.parse('{"path":"/work/question/container_network.html","title":"容器网络异常排查","lang":"zh-CN","frontmatter":{"title":"容器网络异常排查","icon":"question","description":"现象 使用以下脚本跨机器访问engine。在容器内部会出现丢包，在容器外部不存在，当把容器的网络模式改成host后问题没有了。 可能的原因 高并发 NAT 导致 conntrack 插入冲突,如果高并发并且做了 NAT，比如使用了 ip-masq-agent，对集群外的网段或公网进行 SNAT，又或者集群内访问 Service 被做了 DNAT，再加上...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/work/question/container_network.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"容器网络异常排查"}],["meta",{"property":"og:description","content":"现象 使用以下脚本跨机器访问engine。在容器内部会出现丢包，在容器外部不存在，当把容器的网络模式改成host后问题没有了。 可能的原因 高并发 NAT 导致 conntrack 插入冲突,如果高并发并且做了 NAT，比如使用了 ip-masq-agent，对集群外的网段或公网进行 SNAT，又或者集群内访问 Service 被做了 DNAT，再加上..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"容器网络异常排查\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"conntrack 表爆满","slug":"conntrack-表爆满","link":"#conntrack-表爆满","children":[]},{"level":2,"title":"socket buffer 满导致丢包","slug":"socket-buffer-满导致丢包","link":"#socket-buffer-满导致丢包","children":[]},{"level":2,"title":"arp 表爆满​","slug":"arp-表爆满​","link":"#arp-表爆满​","children":[]},{"level":2,"title":"连接队列满导致丢包​","slug":"连接队列满导致丢包​","link":"#连接队列满导致丢包​","children":[]},{"level":2,"title":"源端口耗尽","slug":"源端口耗尽","link":"#源端口耗尽","children":[]},{"level":2,"title":"tcp_tw_recycle 导致丢包​","slug":"tcp-tw-recycle-导致丢包​","link":"#tcp-tw-recycle-导致丢包​","children":[]},{"level":2,"title":"listen 端口 和 port_range 范围内的端口冲突","slug":"listen-端口-和-port-range-范围内的端口冲突","link":"#listen-端口-和-port-range-范围内的端口冲突","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":3.6,"words":1081},"filePathRelative":"work/question/container_network.md","localizedDate":"2024年4月28日","autoDesc":true}');export{g as comp,f as data};
