import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as n,b as a}from"./app-CTOT0auB.js";const s={},o=a(`<h2 id="nc端口健康检测" tabindex="-1"><a class="header-anchor" href="#nc端口健康检测"><span>nc端口健康检测</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">until</span> <span class="token function">nc</span> <span class="token parameter variable">-zv</span> <span class="token number">0.0</span>.0.0 <span class="token number">3306</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">sleep</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[o];function r(i,l){return t(),n("div",null,c)}const m=e(s,[["render",r],["__file","nc.html.vue"]]),h=JSON.parse('{"path":"/shell_script/nc.html","title":"nc端口健康检测","lang":"zh-CN","frontmatter":{"title":"nc端口健康检测","catalog":"Shell","icon":"tools","description":"nc端口健康检测","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/shell_script/nc.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"nc端口健康检测"}],["meta",{"property":"og:description","content":"nc端口健康检测"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nc端口健康检测\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"nc端口健康检测","slug":"nc端口健康检测","link":"#nc端口健康检测","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.1,"words":30},"filePathRelative":"shell_script/nc.md","localizedDate":"2024年4月28日","autoDesc":true}');export{m as comp,h as data};