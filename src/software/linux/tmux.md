---
title: tmux
icon: tools
order: 1
category: Linux
---
**原文：http://louiszhai.github.io/2017/09/30/tmux/#Tmux%E4%BC%98%E5%8C%96**
## 基本概念
开始之前，我们先了解下基本概念：
tmux采用**C/S模型**构建，输入tmux命令就相当于开启了一个服务器，此时默认将新建一个会话，然后会话中默认新建一个窗口，窗口中默认新建一个面板。会话、窗口、面板之间的联系如下：
一个**tmux session（会话**）可以包含多个**window（窗口）**，窗口默认充满会话界面，因此这些窗口中可以运行相关性不大的任务。
一个window又可以包含多个**pane（面板）**，窗口下的面板，都处于同一界面下，这些面板适合运行相关性高的任务，以便同时观察到它们的运行情况。  
![基础概念](./images/tmux01.png)  

## 基础操作
```bash
# 新建会话
tmux new -s <session-name>    
# 分离会话
tmux detach    
# 会话列表
tmux ls    
# 接入会话  
tmux attach -t <session-name>       
# kill会话 
tmux kill-session -t <session-name> 
# 切换会话 
tmux switch -t <session-name>
# 重命名会话 
tmux rename-session -t 0 <new-name>
```
## 快捷指令
关于快捷指令，首先要认识到的是：tmux的所有指令，都包含同一个前缀，默认为**Ctrl+b**，输入完前缀过后，控制台激活，命令按键才能生效。前面tmux会话相关的操作中，我们共用到了两个快捷键**Ctrl+b + d**、**Ctrl+b + s**，但这仅仅是冰山一角，欲窥tmux庞大的快捷键体系，请看下表。  
![基础概念](./images/tmuxc+b+s.png)    
### 表一：系统指令
|  前缀  |  指令  |                  描述                  |
|:------:|:------:|:--------------------------------------:|
| Ctrl+b |    ?   |           显示快捷键帮助文档           |
| Ctrl+b |    d   |              断开当前会话              |
| Ctrl+b |    D   |            选择要断开的会话            |
| Ctrl+b | Ctrl+z |              挂起当前会话              |
| Ctrl+b |    r   |            强制重载当前会话            |
| Ctrl+b |    s   |       显示会话列表用于选择并切换       |
| Ctrl+b |    :   | 进入命令行模式，此时可直接输入ls等命令 |
| Ctrl+b |    [   |          进入复制模式，按q退出         |
| Ctrl+b |    ]   |        粘贴复制模式中复制的文本        |
| Ctrl+b |    ~   |            列出提示信息缓存            |

### 表二：窗口（window）指令
|  前缀  | 指令 |                   描述                   |
|:------:|:----:|:----------------------------------------:|
| Ctrl+b |   c  |                 新建窗口                 |
| Ctrl+b |   &  |  关闭当前窗口（关闭前需输入y or n确认）  |
| Ctrl+b |  0~9 |              切换到指定窗口              |
| Ctrl+b |   p  |              切换到上一窗口              |
| Ctrl+b |   n  |              切换到下一窗口              |
| Ctrl+b |   w  |       打开窗口列表，用于且切换窗口       |
| Ctrl+b |   ,  |              重命名当前窗口              |
| Ctrl+b |   .  |  修改当前窗口编号（适用于窗口重新排序）  |
| Ctrl+b |   f  | 快速定位到窗口（输入关键字匹配窗口名称） |
### 表三：面板（pane）指令
|  前缀  |     指令    |                              描述                              |
|:------:|:-----------:|:--------------------------------------------------------------:|
| Ctrl+b |      "      |               当前面板上下一分为二，下侧新建面板               |
| Ctrl+b |      %      |               当前面板左右一分为二，右侧新建面板               |
| Ctrl+b |      x      |             关闭当前面板（关闭前需输入y or n确认）             |
| Ctrl+b |      z      |    最大化当前面板，再重复一次按键后恢复正常（v1.8版本新增）    |
| Ctrl+b |      !      | 将当前面板移动到新的窗口打开（原窗口中存在两个及以上面板有效） |
| Ctrl+b |      ;      |                    切换到最后一次使用的面板                    |
| Ctrl+b |      q      |   显示面板编号，在编号消失前输入对应的数字可切换到相应的面板   |
| Ctrl+b |      {      |                        向前置换当前面板                        |
| Ctrl+b |      }      |                        向后置换当前面板                        |
| Ctrl+b |    Ctrl+o   |                 顺时针旋转当前窗口中的所有面板                 |
| Ctrl+b |    方向键   |                        移动光标切换面板                        |
| Ctrl+b |      o      |                          选择下一面板                          |
| Ctrl+b |    空格键   |                   在自带的面板布局中循环切换                   |
| Ctrl+b |  Alt+方向键 |                以5个单元格为单位调整当前面板边缘               |
| Ctrl+b | Ctrl+方向键 |   以1个单元格为单位调整当前面板边缘（Mac下被系统快捷键覆盖）   |
| Ctrl+b |      t      |                            显示时钟                            |

## 灵活的配置性
除了快捷指令外，tmux还提供了类似vim的配置性功能。可配置性是软件的一项进阶级功能，只有具备了可配置性，软件才有了鲜活的个性，用户才能体会到操作的快感。
### 修改指令前缀
相信只要你用过几次tmux，就会发现Ctrl+b指令前缀，着实不太方便。这两个键相距太远，按键成本太高了。因此我们首先需要将它更换为距离更近的Ctrl+a组合键，或者不常用的 ` 键（当然其他键也是可以的）。

tmux的用户级配置文件为~/.tmux.conf（没有的话就创建一个），修改快捷指令，只需要增加如下三行即可。
```bash
set -g prefix C-a #
unbind C-b # C-b即Ctrl+b键，unbind意味着解除绑定
bind C-a send-prefix # 绑定Ctrl+a为新的指令前缀

# 从tmux v1.6版起，支持设置第二个指令前缀
set-option -g prefix2 ` # 设置一个不常用的`键作为指令前缀，按键更快些
```
修改的~/.tmux.conf配置文件有如下两种方式可以令其生效：
- restart tmux
- 在tmux窗口中，先按下Ctrl+b指令前缀，然后按下系统指令:，进入到命令模式后输入source-file ~/.tmux.conf，回车后生效
既然快捷指令如此方便，更为优雅的做法是新增一个加载配置文件的快捷指令 ，这样就可以随时随地load新的配置了，如下所示。
```bash
# 绑定快捷键为r
bind r source-file ~/.tmux.conf \; display-message "Config reloaded.."
```
请特别注意，在已经创建的窗口中，即使加载了新的配置，旧的配置依然有效（只要你新加的功能没有覆盖旧的配置，因此如果你第一次绑定快捷指令为x键，然后又改为绑定y键，那么x和y都将有效），新建会话不受此影响，将直接采用新的配置。