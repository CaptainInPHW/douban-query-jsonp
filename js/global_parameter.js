!function () {
    window.query = {
        notFound: '暂无',
        option: undefined,
        optionUrl: undefined,
        searchContent: undefined,
        baseUrl: 'https://api.douban.com/v2/',
        searchBooks: 'book/search?q=',
        searchMovies: 'movie/search?q=',
        searchMusics: 'music/search?q=',
        booksCallback: '&callback=ParseBooksJSON',
        moviesCallback: '&callback=ParseMoviesJSON',
        musicsCallback: '&callback=ParseMusicsJSON',
        OpimizeSearchContentReg: new RegExp(/[a-zA-Z0-9\u4e00-\u9fa5]+/,'g'),
        parsedDoubanData: {
            books: {},
            movies: {},
            musics: {}
        },
        Init: function () {
            this.option = (function (option) {
                return option === '类别' ?  alert('请选择查询类别！') : option;
            })($('#dropdown-button')[0].innerText.trim());
            if (!this.option) return;
            this.searchContent = (function (searchContent) {
                return searchContent === null ? alert('请选择查询内容！') : searchContent.join('');
            })($('#site-search-content')[0].value.match(this.OpimizeSearchContentReg));
            if (!this.searchContent) return;
            this.optionUrl = query.CreateOptionUrl(this.option);
            return true;
        },
        ConcatItemsValueToString: function (items, attr) {
            let result = '';
            let itemsNumber = items.length;
            if (typeof items[0] === 'string'){
                for (let i = 0; i < itemsNumber; i++) {
                    result += items[i] + ' / ';
                }
            } else if (typeof items[0] === 'object') {
                for (let i = 0; i < itemsNumber; i++) {
                    result += items[i][attr] + ' / ';
                }
            }
            return result.substring(0, result.length - 3);
        },
        CreateOptionUrl: function (arg) {
            switch (arg) {
                case '图书': return [this.searchBooks, this.booksCallback];
                case '电影': return [this.searchMovies, this.moviesCallback];
                case '音乐': return [this.searchMusics, this.musicsCallback];
            }
        },
        SendRequest: function () {
            let queryParameter = this.CreateOptionUrl(this.option);
            let script = document.createElement('script');
            $(script).attr('src', this.baseUrl + queryParameter[0] + this.searchContent + queryParameter[1]);
            $('body').append(script);
            $(script).remove();
        },
        PlayLoadingAnimation: function () {
            $('#site-homepage').removeClass('site-homepage-hide site-welcome site-not-found').addClass('site-loading');
        }
    };
}();