!function () {
    let doubanData = {
        books: {},
        movies: {},
        musics: {}
    };
    let controller = {
        // data =
    };
    window.ParseBooksJSON = function (json) {
        if (!(query.searchContent in doubanData.books)) {
            let books = [];
            books.length = json.books.length;
            for (let i = 0; i < books.length; i++) {
                books[i] = {};
                books[i].image = json.books[i].images.large || query.notFound;
                books[i].title = json.books[i].title || query.notFound;
                books[i].author = query.ConcatItemsValueToString(json.books[i].author) || query.notFound;
                books[i].publisher = json.books[i].publisher || query.notFound;
                books[i].pubdate = json.books[i].pubdate || query.notFound;
                books[i].price = json.books[i].price || query.notFound;
                books[i].rating = json.books[i].rating.average || query.notFound;
                books[i].ISBN = json.books[i].isbn13 || query.notFound;
                books[i].url = json.books[i].alt || query.notFound;
            }
            // use push
            doubanData.books[query.searchContent] = books;
            console.log(doubanData);
        }
        let booksNumber = doubanData.books[query.searchContent].length;
        if (booksNumber !== 0){
            let $showBooksArea = $('#show-data-area');
            $showBooksArea.empty();
            for (let i = 0; i < booksNumber; i++) {
                let bookTemplete = `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href="" class="title">${doubanData.books[query.searchContent][i].title}</a></li><li class="list-group-item author">作者：<a href="" class="author-name">${doubanData.books[query.searchContent][i].author}</a></li><li class="list-group-item publisher">出版社：<span class="publisher-name">${doubanData.books[query.searchContent][i].publisher}</span></li><li class="list-group-item pubdate">出版年：<span class="date">${doubanData.books[query.searchContent][i].pubdate}</span></li> <li class="list-group-item price">定价：<span class="currency-icon">￥</span><span class="price-number">${doubanData.books[query.searchContent][i].price}</span></li> <li class="list-group-item rating">评分：<span class="average-rating">${doubanData.books[query.searchContent][i].rating}</span></li> <li class="list-group-item ISBN">ISBN：<span class="ISBN-number">${doubanData.books[query.searchContent][i].ISBN}</span></li></ul> </div> </div> </div>`;
                $showBooksArea.append(bookTemplete);
            }
            let $showBooksAreaImages = $('.image');
            let showBooksAreaImagesNumber = $showBooksAreaImages.length;
            for (let i = 0; i < showBooksAreaImagesNumber; i++) {
                $($showBooksAreaImages[i]).css("background", `url("${doubanData.books[query.searchContent][i].image}") center center no-repeat`);
            }
            $showBooksAreaImages.css('background-size','contain');
            $('#site-homepage').addClass('site-homepage-hide');
            console.timeEnd('时间');
        } else {
            $('#site-homepage').removeClass('site-loading').addClass('site-not-found');
            setTimeout(function (){
                confirm('哎呀，没有找到呢，客官要不要去我的 GitHub 一探究竟呀？') ? window.open('https://github.com/CaptainInPHW/douban-query-jsonp') : window.location.reload();
            },1000);
        }
    };





    window.ParseMoviesJSON = function (json) {
        if (!(query.searchContent in doubanData.movies)) {
            let movies = [];
            movies.length = json.subjects.length;
            for (let i = 0; i < movies.length; i++) {
                movies[i] = {};
                movies[i].image = json.subjects[i].images.large || query.notFound;
                movies[i].title = json.subjects[i].title || query.notFound;
                movies[i].director = query.ConcatItemsValueToString(json.subjects[i].directors, 'name') || query.notFound;
                movies[i].directorUrl = query.ConcatItemsValueToString(json.subjects[i].directors, 'alt') || query.notFound;
                movies[i].cast = query.ConcatItemsValueToString(json.subjects[i].casts, 'name') || query.notFound;
                movies[i].pubdate = json.subjects[i].year || query.notFound;
                movies[i].rating = json.subjects[i].rating.average || query.notFound;
                movies[i].url = json.subjects[i].alt || query.notFound;
                movies[i].genre = query.ConcatItemsValueToString(json.subjects[i].genres) || query.notFound;
            }
            // use push
            doubanData.movies[query.searchContent] = movies;
            console.log(doubanData);
        }
        let booksNumber = doubanData.movies[query.searchContent].length;
        let $showBooksArea = $('#show-data-area');
        $showBooksArea.empty();
        for (let i = 0; i < booksNumber; i++) {
            let movieTemplete = `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href="" class="title">${doubanData.movies[query.searchContent][i].title}</a></li><li class="list-group-item author">导演：<a href="" class="author-name">${doubanData.movies[query.searchContent][i].director}</a></li><li class="list-group-item publisher">主演：<span class="publisher-name">${doubanData.movies[query.searchContent][i].cast}</span></li><li class="list-group-item pubdate">上映时间：<span class="date">${doubanData.movies[query.searchContent][i].pubdate}</span></li> <li class="list-group-item price">类型：${doubanData.movies[query.searchContent][i].genre}</li> <li class="list-group-item rating">评分：<span class="average-rating">${doubanData.movies[query.searchContent][i].rating}</span></li></ul></div></div></div>`;
            $showBooksArea.append(movieTemplete);
        }
        let $showBooksAreaImages = $('.image');
        let showBooksAreaImagesNumber = $showBooksAreaImages.length;
        for (let i = 0; i < showBooksAreaImagesNumber; i++) {
            $($showBooksAreaImages[i]).css("background", `url("${doubanData.movies[query.searchContent][i].image}") center center no-repeat`);
        }
        $showBooksAreaImages.css('background-size','contain');
        $('#site-homepage').addClass('site-homepage-hide');
        console.timeEnd('时间');
    };





    window.ParseMusicsJSON = function (json) {
        if (!(query.searchContent in doubanData.musics)) {
            let musics = [];
            musics.length = json.musics.length;
            for (let i = 0; i < musics.length; i++) {
                musics[i] = {};
                musics[i].image = json.musics[i].image || query.notFound;
                musics[i].title = json.musics[i].title || query.notFound;
                musics[i].singer = json.musics[i].author ? query.ConcatItemsValueToString(json.musics[i].author, 'name') : query.notFound;
                musics[i].publisher = json.musics[i].attrs.publisher ? json.musics[i].attrs.publisher[0] : query.notFound;
                musics[i].pubdate = json.musics[i].attrs.pubdate ? json.musics[i].attrs.pubdate[0] : query.notFound;
                musics[i].pubnum = json.musics[i].attrs.discs ? json.musics[i].attrs.discs[0] : query.notFound;
                musics[i].version = json.musics[i].attrs.version ? json.musics[i].attrs.version[0] : query.notFound;
                musics[i].media = json.musics[i].attrs.media ? json.musics[i].attrs.media[0] : query.notFound;
                musics[i].rating = json.musics[i].rating.average || query.notFound;
                musics[i].url = json.musics[i].alt || query.notFound;
            }
            // use push
            doubanData.musics[query.searchContent] = musics;
        }
        let booksNumber = doubanData.musics[query.searchContent].length;
        let $showBooksArea = $('#show-data-area');
        $showBooksArea.empty();
        for (let i = 0; i < booksNumber; i++) {
            let musicTemplete = `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href="" class="title">${doubanData.musics[query.searchContent][i].title}</a></li><li class="list-group-item author">表演者：<a href="" class="author-name">${doubanData.musics[query.searchContent][i].singer}</a></li><li class="list-group-item publisher">出版者：<span class="publisher-name">${doubanData.musics[query.searchContent][i].publisher}</span></li><li class="list-group-item pubdate">发行时间：<span class="date">${doubanData.musics[query.searchContent][i].pubdate}</span></li> <li class="list-group-item price">专辑类型：${doubanData.musics[query.searchContent][i].version}</li> <li class="list-group-item rating">评分：<span class="average-rating">${doubanData.musics[query.searchContent][i].rating}</span></li></ul></div></div></div>`;
            $showBooksArea.append(musicTemplete);
        }
        let $showBooksAreaImages = $('.image');
        let showBooksAreaImagesNumber = $showBooksAreaImages.length;
        for (let i = 0; i < showBooksAreaImagesNumber; i++) {
            $($showBooksAreaImages[i]).css("background", `url("${doubanData.musics[query.searchContent][i].image}") center center no-repeat`);
        }
        $showBooksAreaImages.css('background-size','contain');
        $('#site-homepage').addClass('site-homepage-hide');
        console.timeEnd('时间');
    }
}();