$(function() {
    function SearchUrl(arg) {
        var optionUrl = {
            book: 'book',
            movie: 'movie',
            music: 'music'
        }
    }



	// 查询类别选择
	! function() {
		if (document.body.onclick !== undefined) {
			$('#dropdown-menu > a').on('click', function(event) {
                $('#dropdown-button')[0].innerText = event.currentTarget.innerText;
			})
		} else if (document.body.ontouchstart !== undefined) {
			$('#dropdown-menu > a').on('touchstart', function(event) {
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



        $('#site-search-button').on('click',function () {
            console.time('时间');
            let queryOption = $('#dropdown-button')[0].innerText;
            let queryOptionUrl = undefined;
            let queryContent = $('#site-search-content')[0].value;

            // 禁止用户不选择【查询选项】和【查询内容】
            if (queryOption === '类别') {
                alert('请选择查询的类别！');
                return undefined;
            }
            if (!queryContent){
                alert('请输入查询的内容！');
                return undefined;
            }


            // 此处要封装为一个全局函数，顶部的【查询】按钮和底部的【上下页】都要用到
            $('.site-homepage').removeClass('site-homepage-hide site-welcome').addClass('site-loading');






            switch (queryOption){
                case '图书': queryOptionUrl = 'book/search?q='; break;
                case '电影': queryOptionUrl = 'movie/search?q='; break;
                case '音乐': queryOptionUrl = 'music/search?q='; break;
            }
            let script = document.createElement('script');
            script.src = 'https://api.douban.com/v2/' + queryOptionUrl + queryContent + '&count=100&callback=DOUBAN';
            document.body.appendChild(script);

        })
    }();
});