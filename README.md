⚠️ This project is for practice, no longer maintained. ⚠️

---

![豆瓣查询首页.jpg](https://i.loli.net/2018/01/22/5a65f26e88dda.jpg)

### 豆瓣查询

本项目基于 **MVC** 设计模式，利用豆瓣开放接口（**API**）服务所提供数据制作响应式查询页面，使用 **JSONP** 动态创建 `<script></script>` 发送跨域请求，豆瓣服务器返回 **JSON** 数据，客户端接受到响应后对 **JSON** 数据进行解析，解析完成后利用局部刷新将结果展示于页面。

### 实现功能

选择查询类别（图书、电影、音乐），输入查询关键字点击查询，即可将服务器返回结果展示于页面，点击各项标题可跳转至详情页，底部翻页按钮实现前后翻页功能，查询不到关键字数据则显示404页面，第一页和最后一页翻页时均有提示。

- 查询 **图书**，关键字：**红楼梦** 

  ![查询图书.png](https://i.loli.net/2018/01/23/5a661300444bb.png)

- 查询 **电影**，关键字: **战狼** 

  ![查询电影.jpeg](https://i.loli.net/2018/01/23/5a6614a39d4dd.jpeg)

- 查询 **音乐** ，关键字：**我爱你** 

  ![查询音乐.jpeg](https://i.loli.net/2018/01/23/5a66150114c76.jpeg)

- **404 page**：

  ![404page.jpg](https://i.loli.net/2018/01/23/5a6615607c58d.jpg)

### 核心技术

- #### **MVC** 模式

  **Model–view–controller (MVC)** 是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。**MVC模式**的目的是实现一种动态的程序设计，使后续对程序的修改和扩展简化，并且使程序某一部分的重复利用成为可能。除此之外，此模式通过对复杂度的简化，使程序结构更加直观。软件系统通过对自身基本部分分离的同时也赋予了各个基本部分应有的功能。

  - **模型**（**Model**）：用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法。**Model** 有对数据直接访问的权力，例如对数据库的访问。**Mode** 不依赖 **View** 和 **Controller**， **Model** 不关心它会被如何显示或是如何被操作。
  - **视图**（**View**）：能够实现数据有目的的显示。在 **View** 中一般没有程序上的逻辑。为了实现 **View** 上的刷新功能，**View** 需要访问它监视的数据模型（**Model**），因此应该事先在被它监视的数据那里注册。
  - **控制器**（**Controller**）起到不同层面间的组织作用，用于控制程序的流程。它处理事件并作出响应。**事件** 包括用户的行为和数据 **Model** 上的改变。

  **MVC** 不是一种技术，而是一种设计理念。**Model** 负责一切和数据相关的存储以及数据操作运算，**View** 负责获取数据展示区域以及对数据的渲染展示，**Controller** 负责 model 与 view 之间的通信，起桥梁和纽带作用。本项目中用到 **MVC模式** 之处有：

  - 不同功能的不同模块所共有的属性或方法，分别封装为 **Model.js**、**View.js**、**Controller.js** 三个全局函数。 

    ```javascript
    // 定义了各个功能模块所共有的 Model
    !function () {
        window.Model = function (userModel) {
          // userModel 为每个功能模块自定义的需初始化的 Model
            let model = {
                option: undefined,
                searchContent: undefined,
                OpimizeSearchContentReg: new RegExp(/[a-zA-Z0-9\u4e00-\u9fa5]+/,'g'),
              	getOption: function () {
                	// code
              	},
              	getSearchContent: function () {
                	// code
              	}
              	init： function () {
    				// 此处可定义所有模块共有的需要初始化的 init 方法
              		userModel.init(); // 不同模块的不同的 init 方法
            	}
            };
          	// 将每个功能模块不同的属性赋给 model
            for (let key in userModel) {
              	if (key !== 'init') {
                	model[key] = userModel[key];
              	}
            }
            return model;
        }
    }();

    // 定义了各个功能模块所共有的 View
    !function () {
        window.View = function (userView) {
            let view ={
                homepage: $('#site-homepage'),
                option: $('#site-dropdown-button')[0],
                content: $('#site-search-content')[0],
                init: function () {
                    userView.init();
                }
            };
            for (let key in userView) {
                if (key !== 'init'){
                    view[key] = userView[key];
                }
            }
            return view;
        }
    }();

    // 定义了各个功能模块所共有的 Controller
    !function () {
        window.Controller = function (userController) {
            let controller = {
                init: function () {
                    userController.init();
                }
            };
            for (let key in userController) {
                if (key !== 'init'){
                    controller[key] = userController[key];
                }
            }
            return controller;
        }
    }();
    ```


  - 该项目因不同的功能主要分为两个部分：**request_module.js**、**response_module.js**，分别负责发起跨域请求以及处理响应。每个部分的架构预览如下：

    ```javascript
    ！function () {
      let model = Model({
        property1: xxx,
        property2: yyy,
        init: function () {
          // code
        },
        funciton1: function () {
          // code
        },
        function2: funciton () {
          // code
      	}
      });
      let view = View({
        property1: xxx,
        property2: yyy,
        init: function () {
          // code
        },
        funciton1: function () {
          // code
        },
        function2: funciton () {
          // code
      	}
      });
      let controller = Controller({
        property1: xxx,
        property2: yyy,
        init: function () {
          // code
        },
        funciton1: function () {
          // code
        },
        function2: funciton () {
          // code
      	}
      });
      // 使用 controller 模块的 init 方法进行整个功能模块的初始化（启动功能）
      controller.init();
    }();
    ```

- #### **JSONP**  

  动态创建 `<script></script>` 标签，解释器根据资源请求地址 `src` 发起跨域 **GET** 请求，客户端接受到服务器响应之后根据 `callback` 约定，执行回调函数。核心架构预览：

  ```javascript
  function sendRequest() {
    // 动态创建 <script></script> 标签发起 GET 请求
    let script = document.createElement('script');
    script.src = 'http:.//www.xxx.com?callback=ParseJSON';
    docuement.querySelector('body').appendChild(script);
    // 回调函数，在回调函数内解析获取到的 JSON 数据
    window.ParseJSON = function (json) {
      // code
    }
  }
  ```

  分析服务器返回的数据，发现根据查询的类别不同，数据的解析方法应不同，因此创建了三个全局回调函数：**window.ParseBooksJSON**、**window.ParseMoviesJSON**、**window.ParseMusicsJSON** 解析 **JSON** 数据。

- #### **全局样式**

  - **响应式**：顶部导航栏样式以及内容展示区用到了 **Bootstrap** ，根据移动端和PC端的分辨率不同，在一定屏幕宽度下首页的 **豆瓣搜所** 字样变为 **icon**，该实现利用了 `<meta>` 标签：

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    ```

    以及媒体查询：

    ```css
    @media (max-width:XXXpx){
      // css
    }
    ```

  - **欢迎页**、**加载动画**以及**404页面**：共同使用了一个标签，三种效果利用 **JS** 切换该标签的类名实现：

    ```html
    <section id="site-homepage" class="site-welcome"></section>
    ```

### 个人总结

- 该项目前后共用了不到两星期，80% 的时间用在了实现 **MVC** 设计架构上，因前期没有考虑到 **MVC** 模式致使整个项目架构不明显，导致项目返工两次，得出经验，在一个项目动手前应尽所能分析需求、逻辑以及实现方式，明确各项功能后进行拆分、分而治之，以达到效率高同时去耦合的效果。
- 分析服务器返回数据时，发现因返回数据格式不一致的原因，导致了很多的 **BUG**，某些项的某些属性为空的时候，应将该属性置为 **空** ，而不是删除该项属性。算是对豆瓣 **API** 的一点小吐槽吧。
- 在第二次重构代码时，考虑到应尽量 **减少向服务器发起请求次数** 以提高用户体验，将查询过的数据全都保存在内存中，结果导致数据结构过于复杂，**页面渲染数据时间反而过长**，得不偿失，因此简化了数据结构，在发起请求次数与页面渲染时间之间找到平衡点
