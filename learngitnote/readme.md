####一、git版本控制系统
+ git init初始化仓库，自动创建一个.git文件监视该仓库
+ mkdir flodName创建文件夹

####二、添加到git仓库需要2步
+ 1、git add file 添加文件
+ 2、git commit -m '本次提交的注释'

###三、常用命令
+ ls 查看当前仓库下面都有什么
+ pwd 查看当前仓库的名字
+ git status查看当前仓库状态(是否有文件改动)
+ git diff查看改动后新加的内容
+ git log [--pretty=oneline]查看所有的提交信息
+ git checkout -- file放弃工作区的修改，没有--就是切换到另一个分支了
+ rm filename 删除文件(命令行删除还是手动删除都要重新add/commit)
+ 如果误删还没commit可以git checkout -- filename恢复文件

###四、版本退回
+ 先git log看看最近的提交信息（如有ABC三次提交）
+ 当前在C：git reset --haed HEAD^回退到上一个版本B(回头退之后再git log看看提交信息是否少一次提交)
+ 当前回退到了B：git reset --hard 7cc99041be2d如果想回到版本C怎么办(当前命令行一直没关闭是可以的)，7cc99041be2d是版本C提交时候的id的前一段
+ <b>注意</b>：git reflog在命令行关闭后如何查看所有的提交id

### 五、版本回退总结
+ git reset --hard commit-id在版本历史之间穿梭
+ git log可以查看提交历史
+ git reflog查看历史命令(重返未来)

###六、工作区(Working Directory)和暂存区(Stage)
+ Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
+ ![xx](img/001.jpg)
+ 其实第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
+ 第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
+ 在git commit成功之后暂存区就是空白了，被默认推送到git自动创建的master分支上了