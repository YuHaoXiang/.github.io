import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as e}from"./app-CTOT0auB.js";const t={},p=e(`<div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> /app/db/PrometheusAlertDB.db <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /opt/PrometheusAlertDB.db /app/db/PrometheusAlertDB.db
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;init ok!&#39;</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;pass!&#39;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-q</span> <span class="token string">&#39;^PA_.\\+=.\\+&#39;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">VAR_NAME</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;^PA_.\\+=.\\+&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-r</span> <span class="token string">&quot;s/^PA_([^=]*).*/<span class="token entity" title="\\1">\\1</span>/g&quot;</span><span class="token variable">)</span></span><span class="token punctuation">;</span><span class="token keyword">do</span>
        <span class="token keyword">if</span> <span class="token builtin class-name">echo</span> <span class="token variable">\${VAR_NAME}</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-q</span> <span class="token string">&#39;.*\\-.*&#39;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>PA_<span class="token variable">\${VAR_NAME}</span><span class="token entity" title="\\&quot;">\\&quot;</span> in Environment variable contains &#39;-&#39;,this will be ignored.&quot;</span>
            <span class="token builtin class-name">continue</span>
        <span class="token keyword">fi</span>
        <span class="token assign-left variable">CONF_ITEM</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token parameter variable">-Eio</span> <span class="token string">&quot;<span class="token variable">\${VAR_NAME<span class="token operator">/</span>_<span class="token operator">/</span>-}</span>|<span class="token variable">\${VAR_NAME}</span>&quot;</span> /app/conf/app.conf<span class="token variable">)</span></span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">\${CONF_ITEM}</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>PA_<span class="token variable">\${VAR_NAME}</span><span class="token entity" title="\\&quot;">\\&quot;</span> in Environment variable not found from config file&quot;</span>
            <span class="token builtin class-name">continue</span>
        <span class="token keyword">fi</span>
        <span class="token assign-left variable">CONF_CONTENT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">eval</span> <span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>$<span class="token punctuation">{</span>PA_$<span class="token punctuation">{</span>VAR_NAME<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token variable">)</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Config overridden from Environment variable, <span class="token variable">\${CONF_ITEM}</span>=<span class="token variable">\${CONF_CONTENT}</span>.&quot;</span>
        <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;s@(<span class="token variable">\${CONF_ITEM}</span>)(\\ *=\\ *).*@<span class="token entity" title="\\1">\\1</span><span class="token entity" title="\\2">\\2</span><span class="token variable">\${CONF_CONTENT}</span>@i&quot;</span> /app/conf/app.conf
    <span class="token keyword">done</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">exec</span> /app/PrometheusAlert
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[p];function l(i,c){return s(),a("div",null,o)}const u=n(t,[["render",l],["__file","replace_env.html.vue"]]),d=JSON.parse('{"path":"/shell_script/replace_env.html","title":"环境变量替换文本参数","lang":"zh-CN","frontmatter":{"title":"环境变量替换文本参数","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/shell_script/replace_env.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"环境变量替换文本参数"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"环境变量替换文本参数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":0.41,"words":123},"filePathRelative":"shell_script/replace_env.md","localizedDate":"2024年4月28日"}');export{u as comp,d as data};
