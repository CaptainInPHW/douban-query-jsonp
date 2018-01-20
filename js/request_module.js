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
}();