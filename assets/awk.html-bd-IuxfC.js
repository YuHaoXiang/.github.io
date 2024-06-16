import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,b as s}from"./app-CTOT0auB.js";const t={},i=s(`<h1 id="awk" tabindex="-1"><a class="header-anchor" href="#awk"><span>awk</span></a></h1><p>awk 是一种处理文本文件的语言，是一个强大的文本分析工具。</p><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> options <span class="token string">&#39;pattern {action}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">选项参数说明</p><ul><li>options：是一些选项，用于控制 awk 的行为。</li><li>pattern：是用于匹配输入数据的模式。如果省略，则 awk 将对所有行进行操作。</li><li>{action}：是在匹配到模式的行上执行的动作。如果省略，则默认动作是打印整行。</li></ul></div><div class="hint-container info"><p class="hint-container-title">options选项参数说明</p><ul><li>-F &lt;分隔符&gt; 或 --field-separator=&lt;分隔符&gt;： 指定输入字段的分隔符，默认是空格。使用这个选项可以指定不同于默认分隔符的字段分隔符。</li><li>-v &lt;变量名&gt;=&lt;值&gt;： 设置 awk 内部的变量值。可以使用该选项将外部值传递给 awk 脚本中的变量。</li><li>-f &lt;脚本文件&gt;： 指定一个包含 awk 脚本的文件。这样可以在文件中编写较大的 awk 脚本，然后通过 -f 选项将其加载。</li><li>-v 或 --version： 显示 awk 的版本信息。</li><li>-h 或 --help： 显示 awk 的帮助信息，包括选项和用法示例。</li></ul></div><h2 id="常见的-awk-命令用法" tabindex="-1"><a class="header-anchor" href="#常见的-awk-命令用法"><span>常见的 awk 命令用法</span></a></h2><p>打印整行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{print}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印特定列：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{print $1, $2}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用分隔符指定列：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> -F<span class="token string">&#39;,&#39;</span> <span class="token string">&#39;{print $1, $2}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印行数：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{print NR, $0}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印行数满足条件的行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;/pattern/ {print NR, $0}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>计算列的总和：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{sum += $1} END {print sum}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印最大值：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;max &lt; $1 {max = $1} END {print max}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>格式化输出：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;{printf &quot;%-10s %-10s\\n&quot;, $1, $2}&#39;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23),l=[i];function o(c,r){return e(),n("div",null,l)}const u=a(t,[["render",o],["__file","awk.html.vue"]]),h=JSON.parse('{"path":"/software/linux/awk.html","title":"awk","lang":"zh-CN","frontmatter":{"title":"awk","icon":"linux","category":"Linux","tag":["shell"],"description":"awk awk 是一种处理文本文件的语言，是一个强大的文本分析工具。 语法 选项参数说明 options：是一些选项，用于控制 awk 的行为。 pattern：是用于匹配输入数据的模式。如果省略，则 awk 将对所有行进行操作。 {action}：是在匹配到模式的行上执行的动作。如果省略，则默认动作是打印整行。 options选项参数说明 -F <分...","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/software/linux/awk.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"awk"}],["meta",{"property":"og:description","content":"awk awk 是一种处理文本文件的语言，是一个强大的文本分析工具。 语法 选项参数说明 options：是一些选项，用于控制 awk 的行为。 pattern：是用于匹配输入数据的模式。如果省略，则 awk 将对所有行进行操作。 {action}：是在匹配到模式的行上执行的动作。如果省略，则默认动作是打印整行。 options选项参数说明 -F <分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:tag","content":"shell"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"awk\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":2,"title":"常见的 awk 命令用法","slug":"常见的-awk-命令用法","link":"#常见的-awk-命令用法","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"software/linux/awk.md","localizedDate":"2024年4月28日","autoDesc":true}');export{u as comp,h as data};
