!function () {
    let view = View({
        body: $('body'),
        searchButton: $('#site-search-button')
    });
    let model = Model({
        baseUrl: 'https://api.douban.com/v2/',
        searchBooks: 'book/search?q=',
        searchMovies: 'movie/search?q=',
        searchMusics: 'music/search?q=',
        booksCallback: '&callback=ParseBooksJSON',
        moviesCallback: '&callback=ParseMoviesJSON',
        musicsCallback: '&callback=ParseMusicsJSON',
        className: {
            hide: 'site-homepage-hide',
            welcome: 'site-welcome',
            notFound: 'site-not-found',
            loading: 'site-loading'
        },
        init: function (option) {
            switch (option) {
                case '图书': return [this.searchBooks, this.booksCallback];
                case '电影': return [this.searchMovies, this.moviesCallback];
                case '音乐': return [this.searchMusics, this.musicsCallback];
            }
        },
        SendRequest: function (body) {
            let script = document.createElement('script');
            $(script).attr('src', this.baseUrl + this.optionUrl[0] + this.searchContent + this.optionUrl[1]);
            body.append(script);
            $(script).remove();
        },
        playLoadingAnimation: function (view) {
            view.removeClass(this.className.hide, this.className.welcome, this.className.notFound).addClass(this.className.loading);
        }
    });
    let controller = Controller({
        init: function () {
            controller.clickSearchButton(view.searchButton, view.body);
        },
        clickSearchButton: function (searchButton, body) {
            searchButton.on('click',function () {
                if (!model.getOption(view)) return;
                if (!model.getSearchContent(view)) return;
                model.optionUrl = model.init(model.option);
                model.playLoadingAnimation(view.homepage);
                model.SendRequest(body);
            });
        }
    });

    controller.init();




















//     let model = {
//         notFound: '暂无',
//         option: undefined,
//         optionUrl: undefined,
//         searchContent: undefined,
//         baseUrl: 'https://api.douban.com/v2/',
//         searchBooks: 'book/search?q=',
//         searchMovies: 'movie/search?q=',
//         searchMusics: 'music/search?q=',
//         booksCallback: '&callback=ParseBooksJSON',
//         moviesCallback: '&callback=ParseMoviesJSON',
//         musicsCallback: '&callback=ParseMusicsJSON',
//         OpimizeSearchContentReg: new RegExp(/[a-zA-Z0-9\u4e00-\u9fa5]+/,'g'),
//     };
//     let controller = {
//         Init: function () {
//             model.data.option = (function (option) {
//                 return option === '类别' ?  alert('请选择查询类别！') : option;
//             })(model.view.option.innerText.trim());
//             if (!model.data.option) return;
//             model.data.searchContent = (function (searchContent) {
//                 return searchContent === null ? alert('请选择查询内容！') : searchContent.join('');
//             })(model.data.searchContent.value.match(model.data.OpimizeSearchContentReg));
//             if (!model.data.searchContent) return;
//             model.data.optionUrl = this.CreateOptionUrl(model.data.option);
//             return true;
//         },
//         CreateOptionUrl: function (arg) {
//             switch (arg) {
//                 case '图书': return [model.data.searchBooks, model.data.booksCallback];
//                 case '电影': return [model.data.searchMovies, model.data.moviesCallback];
//                 case '音乐': return [model.data.searchMusics, model.data.musicsCallback];
//             }
//         },
//         SendRequest: function () {
//             let queryParameter = this.CreateOptionUrl(model.data.option);
//             let script = document.createElement('script');
//             $(script).attr('src', model.data.baseUrl + queryParameter[0] + model.data.searchContent + queryParameter[1]);
//             body.append(script);
//             $(script).remove();
//         },
//         PlayLoadingAnimation: function () {
//             model.view.homepage.removeClass('site-homepage-hide site-welcome site-not-found').addClass('site-loading');
//         }
//     };
}();