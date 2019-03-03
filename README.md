commonProject
=
基于react-native v0.53版本创建的通用项目，目的在于累积组件，拓展业务新能力。
commonProject base on react-native v0.53
# 意义
你可以基于本项目创建一个沙盒项目，用于研究新功能来扩展现有业务。
当然你也可以基于本项目来进行开发，要是能告诉我那就更好了。
You can create a sandbox project based on this project to research new features to extend existing business.
Of course, you can also develop based on this project. It would be better if you could tell me.

# 目前包含的组件：
1.动画组件：react-native-animatable 
-
    文件位置：commonPage/Animatable/Animatable.js

2.网络组件：HttpUtils.js
-
    文件位置：Fetch/HttpUtils.js
    作用：通过在Components/commonLinks.js中设置接口api地址，在同目录operationActions.js中调用Fetch/HttpUtils中进行请求，可选get/post。

3.Loading动画组件:/spinner.js
-
    文件位置：commonPage/Spinner/spinner.js
    作用：用于网络请求中时，展示loading动画，增强交互。
![Loading加载动画展示](commonPage/image/exhibitionPicture/SpinnerShows.gif)

4.Card Image 列表组件展示:News.js
-
    文件位置：News/news.js
    作用：用于展示带图片，头像的信息列表。
![News列表展示](commonPage/image/exhibitionPicture/news.gif)

5.NetInfo 检测用户网络状态:LoginPage.js
-
    文件位置：Login/loginPage.js
    作用：检测用户的网络变化，作出相应提示。
![网络检测展示](commonPage/image/exhibitionPicture/netInfo.gif)

# Currently included components:
1.Animation component react-native-animatable 
-
    Folder:commonPage/Animatable/Animatable.js
        
2.Network component: HttpUtils.js
-
    File location: Fetch/HttpUtils.js
    Role: By setting the interface api address in Components/commonLinks.js, call Fetch/HttpUtils in the same directory         operationActions.js to make the request, optional get/post.

3.Loading animation component: commonPage/Spinner/spinner.js
-
    Role: When used in a network request, display loading animation and enhance interaction.

4.Card Image list component display: News.js
-
    File location: News/news.js
    Role: used to display a list of information with pictures, avatars.

5.NetInfo detects user network status: LoginPage.js
-
    File location: Login/loginPage.js
    Function: Detect the user's network changes and make corresponding prompts.
