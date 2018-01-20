!function () {
    let view = View({
        showArea: $('#show-data-area'),
        init: function () {
            view.images = $('.image');
        },
        renderData: function () {
            let itemNumber = model.doubanData.books[model.searchContent].length;
                this.showArea.empty();
                if (itemNumber !== 0){
                model.initTemplete(itemNumber);
                for (let i = 0; i < itemNumber; i++) {
                    this.showArea.append(model.templete.books[i]);
                }
                this.init();
                for (let i = 0; i < itemNumber; i++) {
                    $(this.images[i]).css(model.propertyName.bg, `url("${model.doubanData.books[model.searchContent][i].image}") center center no-repeat`);
                }
                this.images.css(model.propertyName.bgSize, model.propertyValue.bgSize);
                this.homepage.addClass(model.className.hide);
            } else {
                this.homepage.removeClass(model.className.loading).addClass(model.className.notFound);
                setTimeout(function (){
                    confirm(model.jumpToGithub) ? window.location.href = model.githubSite : window.location.reload();
                },1000);
            }
        }
    });
    let model = Model({
        // booksTemplete: `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href=${model.doubanData.books[this.searchContent][i].url} class="title">${this.doubanData.books[this.searchContent][i].title}</a></li><li class="list-group-item author">作者：<span class="author-name">${this.doubanData.books[this.searchContent][i].author}</span></li><li class="list-group-item publisher">出版社：<span class="publisher-name">${this.doubanData.books[this.searchContent][i].publisher}</span></li><li class="list-group-item pubdate">出版年月：<span class="date">${this.doubanData.books[this.searchContent][i].pubdate}</span></li><li class="list-group-item price">定价：<span class="currency-icon">￥</span><span class="price-number">${this.doubanData.books[this.searchContent][i].price}</span></li><li class="list-group-item rating">评分：<span class="average-rating">${this.doubanData.books[this.searchContent][i].rating}</span></li><li class="list-group-item ISBN">ISBN：<span class="ISBN-number">${this.doubanData.books[this.searchContent][i].ISBN}</span></li></ul></div></div></div>`,
        // moviesTemplete: `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href=${this.doubanData.movies[this.searchContent][i].url} class="title">${this.doubanData.movies[this.searchContent][i].title}</a></li><li class="list-group-item director">导演：<a href=${this.doubanData.movies[this.searchContent][i].directorUrl} class="director-name">${this.doubanData.movies[this.searchContent][i].director}</span></li><li class="list-group-item cast">主演：<span class="cast-name">${this.doubanData.movies[this.searchContent][i].cast}</span></li><li class="list-group-item pubdate">上映时间：<span class="date">${this.doubanData.movies[this.searchContent][i].pubdate}</span></li><li class="list-group-item genre">类型：<span class="genre-name">${this.doubanData.movies[this.searchContent][i].genre}</span></li><li class="list-group-item rating">评分：<span class="average-rating">${this.doubanData.musics[this.searchContent][i].rating}</span></li></ul></div></div></div>`,
        // musicsTemplete: `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href=${this.doubanData.musics[this.searchContent][i].url} class="title">${this.doubanData.musics[this.searchContent][i].title}</a></li><li class="list-group-item singer">歌手：<span class="singer-name">${this.doubanData.musics[this.searchContent][i].singer}</span></li><li class="list-group-item publisher">出版商：<span class="publisher-name">${this.doubanData.musics[this.searchContent][i].publisher}</span></li><li class="list-group-item pubdate">发行时间：<span class="date">${this.doubanData.musics[this.searchContent][i].pubdate}</span></li><li class="list-group-item version">专辑类型：<span class="version-type">${this.doubanData.musics[this.searchContent][i].version}</span></li><li class="list-group-item rating">评分：<span class="average-rating">${this.doubanData.musics[this.searchContent][i].rating}</span></li></ul></div></div></div>`,
        githubSite: 'https://github.com/CaptainInPHW/douban-query-jsonp',
        jumpToGithub: '哎呀，没有找到呢，客官要不要去我的 GitHub 一探究竟呀？',
        notFound: '暂无',
        className: {
            loading: 'site-loading',
            hide: 'site-homepage-hide',
            notFound: 'site-not-found'
        },
        propertyName: {
            bg: 'background',
            bgSize: 'background-size'
        },
        propertyValue: {
            // bg: `url("${model.doubanData.books[model.searchContent][i].image}") center center no-repeat`,
            bgSize: 'contain',
        },
        doubanData: {
            books: {},
            movies: {},
            musics: {}
        },
        templete: {
            books: [],
            movies: [],
            musics: []
        },
        initModel: function () {
            this.getOption(view);
            this.getSearchContent(view);
        },
        initTemplete: function (number) {
            for (let i = 0; i < number; i++) {
                this.templete.books[i] = `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href=${model.doubanData.books[model.searchContent][i].url} class="title">${model.doubanData.books[model.searchContent][i].title}</a></li><li class="list-group-item author">作者：<span class="author-name">${model.doubanData.books[model.searchContent][i].author}</span></li><li class="list-group-item publisher">出版社：<span class="publisher-name">${model.doubanData.books[model.searchContent][i].publisher}</span></li><li class="list-group-item pubdate">出版年月：<span class="date">${model.doubanData.books[model.searchContent][i].pubdate}</span></li><li class="list-group-item price">定价：<span class="currency-icon">￥</span><span class="price-number">${model.doubanData.books[model.searchContent][i].price}</span></li><li class="list-group-item rating">评分：<span class="average-rating">${model.doubanData.books[model.searchContent][i].rating}</span></li><li class="list-group-item ISBN">ISBN：<span class="ISBN-number">${model.doubanData.books[model.searchContent][i].ISBN}</span></li></ul></div></div></div>`;
            }
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
    });
    let controller = Controller({
        init: function () {
            window.ParseBooksJSON = function (json) {
                model.initModel();
                if (!(model.searchContent in model.doubanData.books)) {
                    let books = [];
                    books.length = json.books.length;
                    for (let i = 0; i < books.length; i++) {
                        books[i] = {};
                        books[i].image = json.books[i].images.large || model.notFound;
                        books[i].title = json.books[i].title || model.notFound;
                        books[i].author = model.ConcatItemsValueToString(json.books[i].author) || model.notFound;
                        books[i].publisher = json.books[i].publisher || model.notFound;
                        books[i].pubdate = json.books[i].pubdate || model.notFound;
                        books[i].price = json.books[i].price || model.notFound;
                        books[i].rating = json.books[i].rating.average || model.notFound;
                        books[i].ISBN = json.books[i].isbn13 || model.notFound;
                        books[i].url = json.books[i].alt || model.notFound;
                    }
                    // use push
                    model.doubanData.books[model.searchContent] = books;
                    console.log(model.doubanData);
                }
                view.renderData();
            };
        }
    });
    controller.init();
}();