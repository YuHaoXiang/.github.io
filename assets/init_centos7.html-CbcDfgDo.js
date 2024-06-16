import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as e}from"./app-CTOT0auB.js";const i={},t=e(`<h2 id="rsync自动交互" tabindex="-1"><a class="header-anchor" href="#rsync自动交互"><span>rsync自动交互</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># init centos7  ./centos7-init.sh 主机名</span>

<span class="token comment"># 检查是否为root用户，脚本必须在root权限下运行</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;root&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;please run this script as root !&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31m the script only Support CentOS_7 x86_64 <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31m system initialization script, Please Seriously. press ctrl+C to cancel <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>

<span class="token comment"># 检查是否为64位系统，这个脚本只支持64位脚本</span>
<span class="token assign-left variable">platform</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-i</span><span class="token variable">\`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$platform</span> <span class="token operator">!=</span> <span class="token string">&quot;x86_64&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;this script is only for 64bit Operating System !&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;The host name is empty.&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">else</span>
	hostnamectl  <span class="token parameter variable">--static</span> set-hostname  <span class="token variable">$1</span>
	hostnamectl  set-hostname  <span class="token variable">$1</span>
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
+---------------------------------------+
|   your system is CentOS 7 x86_64      |
|           start optimizing            |
+---------------------------------------+
EOF</span>
<span class="token function">sleep</span> <span class="token number">1</span>

<span class="token comment"># 安装必要支持工具及软件工具</span>
<span class="token function-name function">yum_update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
yum update <span class="token parameter variable">-y</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nmap <span class="token function">unzip</span> <span class="token function">wget</span> <span class="token function">vim</span> <span class="token function">lsof</span> xz net-tools iptables-services ntpdate ntp-doc psmisc
<span class="token punctuation">}</span>

<span class="token comment"># 设置时间同步 set time</span>
<span class="token function-name function">zone_time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
timedatectl set-timezone Asia/Shanghai
/usr/sbin/ntpdate <span class="token number">0</span>.cn.pool.ntp.org <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
/usr/sbin/hwclock <span class="token parameter variable">--systohc</span>
/usr/sbin/hwclock <span class="token parameter variable">-w</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /var/spool/cron/root <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
10 0 * * * /usr/sbin/ntpdate 0.cn.pool.ntp.org &gt; /dev/null 2&gt;&amp;1
* * * * */1 /usr/sbin/hwclock -w &gt; /dev/null 2&gt;&amp;1
EOF</span>
<span class="token function">chmod</span> <span class="token number">600</span> /var/spool/cron/root
/sbin/service crond restart
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 修改文件打开数 set the file limit</span>
<span class="token function-name function">limits_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/rc.d/rc.local <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash

touch /var/lock/subsys/local
ulimit -SHn 1024000
EOF</span>

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -SHn.*/d&quot;</span> /etc/rc.d/rc.local
<span class="token builtin class-name">echo</span> <span class="token string">&quot;ulimit -SHn 1024000&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/rc.d/rc.local

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -s.*/d&quot;</span> /etc/profile
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -c.*/d&quot;</span> /etc/profile
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;/^ulimit -SHn.*/d&quot;</span> /etc/profile

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/profile <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
ulimit -c unlimited
ulimit -s unlimited
ulimit -SHn 1024000
EOF</span>

<span class="token builtin class-name">source</span> /etc/profile
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-a</span>
<span class="token function">cat</span> /etc/profile <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">ulimit</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/security/limits.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/security/limits.conf /etc/security/limits.conf.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limits.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
* soft nofile 1024000
* hard nofile 1024000
* soft nproc  1024000
* hard nproc  1024000
hive   - nofile 1024000
hive   - nproc  1024000
EOF</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/security/limits.d/20-nproc.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/security/limits.d/20-nproc.conf /etc/security/limits.d/20-nproc.conf.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limits.d/20-nproc.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
*          soft    nproc     409600
root       soft    nproc     unlimited
EOF</span>

<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 优化内核参数 tune kernel parametres</span>
<span class="token function-name function">sysctl_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/sysctl.conf.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/sysctl.conf /etc/sysctl.conf.bak
<span class="token keyword">fi</span>

<span class="token comment">#add</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysctl.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv4.tcp_syn_retries = 1
net.ipv4.tcp_synack_retries = 1
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_intvl =15
net.ipv4.tcp_retries1 = 3
net.ipv4.tcp_retries2 = 5
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_tw_recycle = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_max_tw_buckets = 60000
net.ipv4.tcp_max_orphans = 32768
net.ipv4.tcp_max_syn_backlog = 16384
net.ipv4.tcp_mem = 94500000 915000000 927000000
net.ipv4.tcp_wmem = 4096 16384 13107200
net.ipv4.tcp_rmem = 4096 87380 17476000
net.ipv4.ip_local_port_range = 1024 65000
net.ipv4.ip_forward = 1
net.ipv4.route.gc_timeout = 100
net.core.somaxconn = 32768
net.core.netdev_max_backlog = 32768
net.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_tcp_timeout_established = 180
vm.overcommit_memory = 1
vm.swappiness = 1
fs.file-max = 1024000
EOF</span>

<span class="token comment">#reload sysctl</span>
/sbin/sysctl <span class="token parameter variable">-p</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># 设置UTF-8   LANG=&quot;zh_CN.UTF-8&quot;</span>
<span class="token function-name function">LANG_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;LANG=<span class="token entity" title="\\&quot;">\\&quot;</span>en_US.UTF-8<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span><span class="token operator">&gt;</span>/etc/locale.conf
<span class="token builtin class-name">source</span>  /etc/locale.conf
<span class="token punctuation">}</span>


<span class="token comment">#关闭SELINUX disable selinux</span>
<span class="token function-name function">selinux_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39;</span> /etc/selinux/config
setenforce <span class="token number">0</span>
<span class="token function">sleep</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">#日志处理</span>
<span class="token function-name function">log_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
setenforce <span class="token number">0</span>
systemctl start systemd-journald
systemctl status systemd-journald
<span class="token punctuation">}</span>


<span class="token comment"># 关闭防火墙</span>
<span class="token function-name function">firewalld_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
/usr/bin/systemctl stop  firewalld.service
/usr/bin/systemctl disable  firewalld.service
<span class="token punctuation">}</span>


<span class="token comment"># SSH配置优化 set sshd_config</span>
<span class="token function-name function">sshd_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/etc/ssh/sshd_config.bak&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span>/etc/ssh/sshd_config<span class="token operator">&lt;&lt;</span><span class="token string">EOF
Port 22
AddressFamily inet
ListenAddress 0.0.0.0
Protocol 2
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
SyslogFacility AUTHPRIV
PermitRootLogin yes
MaxAuthTries 6
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile	.ssh/authorized_keys
PasswordAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
UseDNS no
X11Forwarding yes
UsePrivilegeSeparation sandbox
AcceptEnv LANG LC_CTYPE LC_NUMERIC LC_TIME LC_COLLATE LC_MONETARY LC_MESSAGES
AcceptEnv LC_PAPER LC_NAME LC_ADDRESS LC_TELEPHONE LC_MEASUREMENT
AcceptEnv LC_IDENTIFICATION LC_ALL LANGUAGE
AcceptEnv XMODIFIERS
Subsystem       sftp    /usr/libexec/openssh/sftp-server
EOF</span>
/sbin/service sshd restart
<span class="token punctuation">}</span>


<span class="token comment"># 关闭ipv6  disable the ipv6</span>
<span class="token function-name function">ipv6_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;NETWORKING_IPV6=no&quot;</span><span class="token operator">&gt;</span>/etc/sysconfig/network
<span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;</span> /proc/sys/net/ipv6/conf/all/disable_ipv6
<span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;</span> /proc/sys/net/ipv6/conf/default/disable_ipv6
<span class="token builtin class-name">echo</span> <span class="token string">&quot;127.0.0.1   localhost   localhost.localdomain&quot;</span><span class="token operator">&gt;</span>/etc/hosts
<span class="token comment">#sed -i &#39;s/IPV6INIT=yes/IPV6INIT=no/g&#39; /etc/sysconfig/network-scripts/ifcfg-enp0s8</span>


<span class="token keyword">for</span> <span class="token for-or-select variable">line</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-lh</span> /etc/sysconfig/network-scripts/ifcfg-* <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39;[ ]+&#39;</span> <span class="token string">&#39;{print $9}&#39;</span><span class="token variable">)</span></span>
<span class="token keyword">do</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span>  <span class="token variable">$line</span> <span class="token punctuation">]</span>
        <span class="token keyword">then</span>
        <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/IPV6INIT=yes/IPV6INIT=no/g&#39;</span> <span class="token variable">$line</span>
                <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">fi</span>
<span class="token keyword">done</span>
<span class="token punctuation">}</span>


<span class="token comment"># 设置历史命令记录格式 history</span>
<span class="token function-name function">history_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">HISTFILESIZE</span></span><span class="token operator">=</span><span class="token number">10000000</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">HISTSIZE</span></span><span class="token operator">=</span><span class="token number">1000000</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">PROMPT_COMMAND</span><span class="token operator">=</span><span class="token string">&quot;history -a&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HISTTIMEFORMAT</span><span class="token operator">=</span><span class="token string">&quot;%Y-%m-%d_%H:%M:%S &quot;</span>
<span class="token comment">##export HISTTIMEFORMAT=&quot;{\\&quot;TIME\\&quot;:\\&quot;%F %T\\&quot;,\\&quot;HOSTNAME\\&quot;:\\&quot;\\$HOSTNAME\\&quot;,\\&quot;LI\\&quot;:\\&quot;\\$(who -u am i 2&gt;/dev/null| awk &#39;{print \\$NF}&#39;|sed -e &#39;s/[()]//g&#39;)\\&quot;,\\&quot;LU\\&quot;:\\&quot;\\$(who am i|awk &#39;{print \\$1}&#39;)\\&quot;,\\&quot;NU\\&quot;:\\&quot;\\\${USER}\\&quot;,\\&quot;CMD\\&quot;:\\&quot;&quot;</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span>/etc/bashrc<span class="token operator">&lt;&lt;</span><span class="token string">EOF
alias vi=&#39;vim&#39;
HISTDIR=&#39;/var/log/command.log&#39;
if [ ! -f \\<span class="token variable">$HISTDIR</span> ];then
touch \\<span class="token variable">$HISTDIR</span>
chmod 666 \\<span class="token variable">$HISTDIR</span>
fi
export HISTTIMEFORMAT=&quot;{<span class="token entity" title="\\&quot;">\\&quot;</span>TIME<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>%F %T<span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>IP<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable"><span class="token variable">$(</span><span class="token function">ip</span> a <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;192.168|172&#39;</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-1</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print \\$2}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d/ <span class="token parameter variable">-f1</span><span class="token variable">)</span></span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>LI<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\$(who -u am i 2&gt;/dev/null| awk &#39;{print \\<span class="token variable">$NF</span>}&#39;|sed -e &#39;s/[()]//g&#39;)<span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>LU<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable"><span class="token variable">$(</span><span class="token function">who</span> am i<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print \\$1}&#39;</span><span class="token variable">)</span></span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>NU<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">\${<span class="token environment constant">USER</span>}</span><span class="token entity" title="\\&quot;">\\&quot;</span>,<span class="token entity" title="\\&quot;">\\&quot;</span>CMD<span class="token entity" title="\\&quot;">\\&quot;</span>:<span class="token entity" title="\\&quot;">\\&quot;</span>&quot;
export PROMPT_COMMAND=&#39;history 1|tail -1|sed &quot;s/^[ ]\\+[0-9]\\+  //&quot;|sed &quot;s/$/<span class="token entity" title="\\&quot;">\\&quot;</span>}/&quot;&gt;&gt; /var/log/command.log&#39;
EOF</span>
<span class="token builtin class-name">source</span> /etc/bashrc
<span class="token punctuation">}</span>

<span class="token comment"># 服务优化设置</span>
<span class="token function-name function">service_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
/usr/bin/systemctl <span class="token builtin class-name">enable</span> NetworkManager-wait-online.service
/usr/bin/systemctl start NetworkManager-wait-online.service
/usr/bin/systemctl stop postfix.service
/usr/bin/systemctl disable postfix.service
<span class="token function">chmod</span> +x /etc/rc.local
<span class="token function">chmod</span> +x /etc/rc.d/rc.local
<span class="token comment">#ls -l /etc/rc.d/rc.local</span>
<span class="token punctuation">}</span>

<span class="token comment"># VIM设置</span>
<span class="token function-name function">vim_config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /root/.vimrc <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
set history=1000

EOF</span>

<span class="token comment">#autocmd InsertLeave * se cul</span>
<span class="token comment">#autocmd InsertLeave * se nocul</span>
<span class="token comment">#set nu</span>
<span class="token comment">#set bs=2</span>
<span class="token comment">#syntax on</span>
<span class="token comment">#set laststatus=2</span>
<span class="token comment">#set tabstop=4</span>
<span class="token comment">#set go=</span>
<span class="token comment">#set ruler</span>
<span class="token comment">#set showcmd</span>
<span class="token comment">#set cmdheight=1</span>
<span class="token comment">#hi CursorLine   cterm=NONE ctermbg=blue ctermfg=white guibg=blue guifg=white</span>
<span class="token comment">#set hls</span>
<span class="token comment">#set cursorline</span>
<span class="token comment">#set ignorecase</span>
<span class="token comment">#set hlsearch</span>
<span class="token comment">#set incsearch</span>
<span class="token comment">#set helplang=cn</span>
<span class="token punctuation">}</span>


<span class="token comment"># done</span>
<span class="token function-name function">done_ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token function">touch</span> /var/log/init-ok
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
+-------------------------------------------------+
|               optimizer is done                 |
|   it&#39;s recommond to restart this server !       |
|             Please Reboot system                |
+-------------------------------------------------+
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># main</span>
<span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    yum_update
    zone_time
    limits_config
    sysctl_config
    LANG_config
    selinux_config
    log_config
    firewalld_config
    sshd_config
    ipv6_config
    history_config
    service_config
    vim_config
    done_ok
<span class="token punctuation">}</span>
main

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[t];function c(o,p){return s(),a("div",null,l)}const d=n(i,[["render",c],["__file","init_centos7.html.vue"]]),v=JSON.parse('{"path":"/shell_script/init_centos7.html","title":"Centos7初始化脚本","lang":"zh-CN","frontmatter":{"title":"Centos7初始化脚本","catalog":"Shell","icon":"centos","description":"rsync自动交互","head":[["meta",{"property":"og:url","content":"https://yuhaoxiang.github.io/work-blog/work-blog/shell_script/init_centos7.html"}],["meta",{"property":"og:site_name","content":"大杂烩"}],["meta",{"property":"og:title","content":"Centos7初始化脚本"}],["meta",{"property":"og:description","content":"rsync自动交互"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-28T08:47:19.000Z"}],["meta",{"property":"article:author","content":"yhx"}],["meta",{"property":"article:modified_time","content":"2024-04-28T08:47:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Centos7初始化脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-28T08:47:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yhx\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"rsync自动交互","slug":"rsync自动交互","link":"#rsync自动交互","children":[]}],"git":{"createdTime":1714294039000,"updatedTime":1714294039000,"contributors":[{"name":"haoxiang.yu@sectrend.com.cn","email":"ZLJw5dEMQLaVgsP","commits":1}]},"readingTime":{"minutes":3.16,"words":949},"filePathRelative":"shell_script/init_centos7.md","localizedDate":"2024年4月28日","autoDesc":true}');export{d as comp,v as data};
