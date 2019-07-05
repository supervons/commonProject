
# CODE_PUSH 常用命令

#安装
>npm install -g code-push-cli
#注册账号
>code-push register
#登陆
>code-push login
#远端请使用
>code-push login http://ip:3000
#注销
>code-push logout
#添加项目
>code-push app add [app名称]
#删除项目
>code-push app remove [app名称]
#列出账号下的所有项目
>code-push app list
#显示登陆的token
>code-push access-key ls
#删除某个access-key
>code-push access-key rm <accessKey>
#添加协作人员
>code-push collaborator add <appName> next@126.com
#部署一个环境
>code-push deployment add <appName> <deploymentName>
#删除部署 
>code-push deployment rm <appName>
#列出应用的部署
>code-push deployment ls <appName>
#查询部署环境的key
>code-push deployment ls <appName> -k
#查看部署的历史版本信息
>code-push deployment history <appName> <deploymentNmae>
#重命名一个部署
>code-push deployment rename <appName> <currentDeploymentName> <newDeploymentName>

#CODE_PUSH 代码推送命令	

#可以使用code-push release-react --help查看语法
>code-push release-react --help

# 发布命令（打包文件并上传到服务器）
> code-push release-react <appName> <OS> <updateContents> <deploymentNmae> <description> <disabled> <mandatory>
#<appName> //必须 app名称
#<OS> //必须 发布平台iOS/Android
#<updateContents> //非必须 Bundle文件所在目录
#<targetBinaryVersion> //非必须 需要热更的app 版本
#<deploymentNmae> //必须 需要发布的部署
#<description> //非必须 描述 (更新客户端不可见必须有"hide"  eg: --description "hide xxxx")
#<disabled> //非必须 该版本客户端是否可以获得更新,默认为false
#<mandatory> //非必须  如果有则表示app强制更新

>code-push release-react ReactNativeCodePushDemo-ios ios -t "1.0.0" --des "测试热更 新" -d Staging

# 修改更新
>Usage: code-push patch <appName> <deploymentName> [--label <label>] [--description <description>] [--disabled] [--mandatory] [--rollout <rolloutPercentage>]

#选项：
#--label, -l           指定标签版本更新，默认最新版本 [string] [默认值: null]
#--description, --des  描述  [string] [默认值: null]
#--disabled, -x        是否禁用该更新  [boolean] [默认值: null]
#--mandatory, -m       是否强制更新  [boolean] [默认值: null]
#--rollout, -r         此更新推送用户的百分比，此值仅可以从先前的值增加。  [string] [默认值: null]

#示例：
 >code-push patch MyApp Production --des "Updated description" -r 50         修改"MyApp"的"Production"部署中最新更新的描述 ，并且更新推送范围为50％
 >code-push patch MyApp Production -l v3 --des "Updated description for v3" 

# 升级环境

>Usage: code-push promote <appName> <sourceDeploymentName> <destDeploymentName> [--description <description>] [--mandatory] [--rollout <rolloutPercentage>]

#选项：
#--description, --des  描述  [string] [默认值: null]
#--disabled, -x        是否禁用该更新  [boolean] [默认值: null]
#--mandatory, -m       是否强制更新  [boolean] [默认值: null]
#--rollout, -r         此促进更新推送用户的百分比  [string] [默认值: null]

#示例：
 >code-push promote MyApp Staging Production                                   "MyApp"中"Staging"部署的最新更新发布到"Production"部署中
 >code-push promote MyApp Staging Production --des "Production rollout" -r 25  "MyApp"中"Staging"部署的最新更新发布到"Production"部署中, 并且只推送25%的用户

# 回滚环境
>Usage: code-push rollback <appName> <deploymentName> [--targetRelease <releaseLabel>]

#选项：
#--targetRelease, -r  指定回归到哪个标签，默认是回滚到上一个更新  [string] [默认值: null]

#示例：
>code-push rollback MyApp Production                     "MyApp"中"Production"部署执行回滚
>code-push rollback MyApp Production --targetRelease v4  "MyApp"中"Production"部署执行回滚，回滚到v4这个标签版本


#JS 代码调用说明:
#如果有发布热更新时 mandatory 则 Code Push 会根据 mandatory 是 true 或false 来控制应用是否强制更新。默认情况下 mandatory 为 false 即不强制更新。mandatory 为 false时以下三种设置方法才有效

#第一种:
#codePush.sync();

#第二种:
#codePush.sync({
#updateDialog: false,
#installMode: codePush.InstallMode.IMMEDIATE
#});

#第三种:
#CodePush.sync({
#deploymentKey: 'deployment-key-here',
#updateDialog: {
#optionalIgnoreButtonLabel: '稍后',
#optionalInstallButtonLabel: '后台更新',
#optionalUpdateMessage: '有新版本了，是否更新？',
#title: '更新提示'
#},
#installMode: CodePush.InstallMode.IMMEDIATE
#});

#三种更新的策略: 配置到installMode: 之后即可生效
#* IMMEDIATE 立即更新APP
#* ON_NEXT_RESTART 到下一次启动应用时
#* ON_NEXT_RESUME 当应用从后台返回时


