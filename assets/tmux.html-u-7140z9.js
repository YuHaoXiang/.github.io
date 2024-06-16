import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,b as a}from"./app-CTOT0auB.js";const l="/work-blog/assets/tmux01-B5b7EQqJ.png",s="/work-blog/assets/tmuxc_b_s-C3Ak9Z62.png",r={},d=a('<p><strong>原文：http://louiszhai.github.io/2017/09/30/tmux/#Tmux%E4%BC%98%E5%8C%96</strong></p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><p>开始之前，我们先了解下基本概念： tmux采用<strong>C/S模型</strong>构建，输入tmux命令就相当于开启了一个服务器，此时默认将新建一个会话，然后会话中默认新建一个窗口，窗口中默认新建一个面板。会话、窗口、面板之间的联系如下： 一个<strong>tmux session（会话</strong>）可以包含多个<strong>window（窗口）</strong>，窗口默认充满会话界面，因此这些窗口中可以运行相关性不大的任务。 一个window又可以包含多个<strong>pane（面板）</strong>，窗口下的面板，都处于同一界面下，这些面板适合运行相关性高的任务，以便同时观察到它们的运行情况。<br><img src="'+l+`" alt="基础概念" loading="lazy"></p><h2 id="基础操作" tabindex="-1"><a class="header-anchor" href="#基础操作"><span>基础操作</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 新建会话</span>
tmux new <span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>    
<span class="token comment"># 分离会话</span>
tmux detach    
<span class="token comment"># 会话列表</span>
tmux <span class="token function">ls</span>    
<span class="token comment"># 接入会话  </span>
tmux attach <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>       
<span class="token comment"># kill会话 </span>
tmux kill-session <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span> 
<span class="token comment"># 切换会话 </span>
tmux switch <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>
<span class="token comment"># 重命名会话 </span>
tmux rename-session <span class="token parameter variable">-t</span> <span class="token number">0</span> <span class="token operator">&lt;</span>new-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快捷指令" tabindex="-1"><a class="header-anchor" href="#快捷指令"><span>快捷指令</span></a></h2><p>关于快捷指令，首先要认识到的是：tmux的所有指令，都包含同一个前缀，默认为<strong>Ctrl+b</strong>，输入完前缀过后，控制台激活，命令按键才能生效。前面tmux会话相关的操作中，我们共用到了两个快捷键<strong>Ctrl+b + d</strong>、<strong>Ctrl+b + s</strong>，但这仅仅是冰山一角，欲窥tmux庞大的快捷键体系，请看下表。<br><img src="`+s+`" alt="基础概念" loading="lazy"></p><h3 id="表一-系统指令" tabindex="-1"><a class="header-anchor" href="#表一-系统指令"><span>表一：系统指令</span></a></h3><table><thead><tr><th style="text-align:center;">前缀</th><th style="text-align:center;">指令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">?</td><td style="text-align:center;">显示快捷键帮助文档</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">d</td><td style="text-align:center;">断开当前会话</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">D</td><td style="text-align:center;">选择要断开的会话</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">Ctrl+z</td><td style="text-align:center;">挂起当前会话</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">r</td><td style="text-align:center;">强制重载当前会话</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">s</td><td style="text-align:center;">显示会话列表用于选择并切换</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">:</td><td style="text-align:center;">进入命令行模式，此时可直接输入ls等命令</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">[</td><td style="text-align:center;">进入复制模式，按q退出</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">]</td><td style="text-align:center;">粘贴复制模式中复制的文本</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">~</td><td style="text-align:center;">列出提示信息缓存</td></tr></tbody></table><h3 id="表二-窗口-window-指令" tabindex="-1"><a class="header-anchor" href="#表二-窗口-window-指令"><span>表二：窗口（window）指令</span></a></h3><table><thead><tr><th style="text-align:center;">前缀</th><th style="text-align:center;">指令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">c</td><td style="text-align:center;">新建窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">&amp;</td><td style="text-align:center;">关闭当前窗口（关闭前需输入y or n确认）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">0~9</td><td style="text-align:center;">切换到指定窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">p</td><td style="text-align:center;">切换到上一窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">n</td><td style="text-align:center;">切换到下一窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">w</td><td style="text-align:center;">打开窗口列表，用于且切换窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">,</td><td style="text-align:center;">重命名当前窗口</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">.</td><td style="text-align:center;">修改当前窗口编号（适用于窗口重新排序）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">f</td><td style="text-align:center;">快速定位到窗口（输入关键字匹配窗口名称）</td></tr></tbody></table><h3 id="表三-面板-pane-指令" tabindex="-1"><a class="header-anchor" href="#表三-面板-pane-指令"><span>表三：面板（pane）指令</span></a></h3><table><thead><tr><th style="text-align:center;">前缀</th><th style="text-align:center;">指令</th><th style="text-align:center;">描述</th></tr></thead><tbody><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">&quot;</td><td style="text-align:center;">当前面板上下一分为二，下侧新建面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">%</td><td style="text-align:center;">当前面板左右一分为二，右侧新建面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">x</td><td style="text-align:center;">关闭当前面板（关闭前需输入y or n确认）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">z</td><td style="text-align:center;">最大化当前面板，再重复一次按键后恢复正常（v1.8版本新增）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">!</td><td style="text-align:center;">将当前面板移动到新的窗口打开（原窗口中存在两个及以上面板有效）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">;</td><td style="text-align:center;">切换到最后一次使用的面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">q</td><td style="text-align:center;">显示面板编号，在编号消失前输入对应的数字可切换到相应的面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">{</td><td style="text-align:center;">向前置换当前面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">}</td><td style="text-align:center;">向后置换当前面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">Ctrl+o</td><td style="text-align:center;">顺时针旋转当前窗口中的所有面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">方向键</td><td style="text-align:center;">移动光标切换面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">o</td><td style="text-align:center;">选择下一面板</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">空格键</td><td style="text-align:center;">在自带的面板布局中循环切换</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">Alt+方向键</td><td style="text-align:center;">以5个单元格为单位调整当前面板边缘</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">Ctrl+方向键</td><td style="text-align:center;">以1个单元格为单位调整当前面板边缘（Mac下被系统快捷键覆盖）</td></tr><tr><td style="text-align:center;">Ctrl+b</td><td style="text-align:center;">t</td><td style="text-align:center;">显示时钟</td></tr></tbody></table><h2 id="灵活的配置性" tabindex="-1"><a class="header-anchor" href="#灵活的配置性"><span>灵活的配置性</span></a></h2><p>除了快捷指令外，tmux还提供了类似vim的配置性功能。可配置性是软件的一项进阶级功能，只有具备了可配置性，软件才有了鲜活的个性，用户才能体会到操作的快感。</p><h3 id="修改指令前缀" tabindex="-1"><a class="header-anchor" href="#修改指令前缀"><span>修改指令前缀</span></a></h3><p>相信只要你用过几次tmux，就会发现Ctrl+b指令前缀，着实不太方便。这两个键相距太远，按键成本太高了。因此我们首先需要将它更换为距离更近的Ctrl+a组合键，或者不常用的 \` 键（当然其他键也是可以的）。</p><p>tmux的用户级配置文件为~/.tmux.conf（没有的话就创建一个），修改快捷指令，只需要增加如下三行即可。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> <span class="token parameter variable">-g</span> prefix C-a <span class="token comment">#</span>
unbind C-b <span class="token comment"># C-b即Ctrl+b键，unbind意味着解除绑定</span>
<span class="token builtin class-name">bind</span> C-a send-prefix <span class="token comment"># 绑定Ctrl+a为新的指令前缀</span>

<span class="token comment"># 从tmux v1.6版起，支持设置第二个指令前缀</span>
set-option <span class="token parameter variable">-g</span> prefix2 <span class="token variable"><span class="token variable">\`</span> <span class="token comment"># 设置一个不常用的</span><span class="token variable">\`</span></span>键作为指令前缀，按键更快些
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改的~/.tmux.conf配置文件有如下两种方式可以令其生效：</p><ul><li>restart tmux</li><li>在tmux窗口中，先按下Ctrl+b指令前缀，然后按下系统指令:，进入到命令模式后输入source-file ~/.tmux.conf，回车后生效 既然快捷指令如此方便，更为优雅的做法是新增一个加载配置文件的快捷指令 ，这样就可以随时随地load新的配置了，如下所示。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 绑定快捷键为r</span>
<span class="token builtin class-name">bind</span> r source-file ~/.tmux.conf <span class="token punctuation">\\</span><span class="token punctuation">;</span> display-message <span class="token string">&quot;Config reloaded..&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请特别注意，在已经创建的窗口中，即使加载了新的配置，旧的配置依然有效（只要你新加的功能没有覆盖旧的配置，因此如果你第一次绑定快捷指令为x键，然后又改为绑定y键，那么x和y都将有效），新建会话不受此影响，将直接采用新的配置。</p>`,23),i=[d];function c(o,p){return e(),n("div",null,i)}const m=t(r,[["render",c],["__file","tmux.html.vue"]]),y=JSON.parse('{"path":"/software/linux/tmux.html","title":"tmux","lang":"zh-CN","frontmatter":{"title":"tmux","icon":"tools","order":1,"category":"Linux","description":"原文：http://louiszhai.github.io/2017/09/30/tmux/#Tmux%E4%BC%98%E5%8C%96 基本概念 开始之前，我们先了解下基本概念： tmux采用C/S模型构建，输入tmux命令就相当于开启了一个服务器，此时默认将新建一个会话，然后会话中默认新建一个窗口，窗口中默认新建一个面板。会话、窗口、面板之间的联...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/linux/tmux.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"tmux"}],["meta",{"property":"og:description","content":"原文：http://louiszhai.github.io/2017/09/30/tmux/#Tmux%E4%BC%98%E5%8C%96 基本概念 开始之前，我们先了解下基本概念： tmux采用C/S模型构建，输入tmux命令就相当于开启了一个服务器，此时默认将新建一个会话，然后会话中默认新建一个窗口，窗口中默认新建一个面板。会话、窗口、面板之间的联..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tmux\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":2,"title":"基础操作","slug":"基础操作","link":"#基础操作","children":[]},{"level":2,"title":"快捷指令","slug":"快捷指令","link":"#快捷指令","children":[{"level":3,"title":"表一：系统指令","slug":"表一-系统指令","link":"#表一-系统指令","children":[]},{"level":3,"title":"表二：窗口（window）指令","slug":"表二-窗口-window-指令","link":"#表二-窗口-window-指令","children":[]},{"level":3,"title":"表三：面板（pane）指令","slug":"表三-面板-pane-指令","link":"#表三-面板-pane-指令","children":[]}]},{"level":2,"title":"灵活的配置性","slug":"灵活的配置性","link":"#灵活的配置性","children":[{"level":3,"title":"修改指令前缀","slug":"修改指令前缀","link":"#修改指令前缀","children":[]}]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":4.97,"words":1490},"filePathRelative":"software/linux/tmux.md","localizedDate":"2024年4月28日","autoDesc":true}');export{m as comp,y as data};
