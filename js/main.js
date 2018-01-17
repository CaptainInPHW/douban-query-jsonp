$(function () {
    // 查询类别选择
    !function () {
        if (document.body.onclick !== undefined) {
            $('#dropdown-menu > a').on('click', function (event) {
                $('#dropdown-button')[0].innerText = event.currentTarget.innerText;
            })
        } else if (document.body.ontouchstart !== undefined) {
            $('#dropdown-menu > a').on('touchstart', function (event) {
                $('#dropdown-button')[0].innerText = event.currentTarget.innerText;
            })
        }
    }();
    // 点击查询按钮发送 JSONP 请求
    !function () {
        // 此处准备做成 MVC 模式
        // let $view = $('#site-search-button');
        // let controller = {
        //     element: null,
        //     bindEnevts: function () {
        //
        //     }
        // };
        // controller.init($view);

        // 页面刷新保持当前页面状态，不重新载入，需要将请求的内容保存到 localstorage 中
        // $(window).bind('beforeunload', function(){
        //     $('.site-homepage').removeClass('site-hompage-hide site-loading').addClass('site-welcome');
        // });

        $('#site-search-button').on('click', function () {
            console.time('时间');
            if (query.Init()) {
                query.PlayLoadingAnimation();
                query.SendRequest();
            }
        })





    }();
    // 底部版权部分的日期年份
    !function () {
        $('#current-year').text(new Date().getFullYear());
        $('#next-year').text(new Date().getFullYear() + 1);
    }();
});