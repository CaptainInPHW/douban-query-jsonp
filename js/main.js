$(function () {
    !function () {
            $('.dropdown-item').on('click', function (event) {
                $('#site-dropdown-button')[0].innerText = event.currentTarget.innerText;
            })
    }();
    // !function () {
        // 页面刷新保持当前页面状态，不重新载入，需要将请求的内容保存到 localstorage 中
        // $(window).bind('beforeunload', function(){
        //     $('.site-homepage').removeClass('site-hompage-hide site-loading').addClass('site-welcome');
        // });
        // $('#site-search-button').on('click', function () {
        //     if (query.Init()) {
        //         query.PlayLoadingAnimation();
        //         query.SendRequest();
        //     }
        // })
    // }();
});