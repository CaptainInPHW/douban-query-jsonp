!function () {
    window.ParseJSON = function (json) {
        // let douban = {
        //     books: {
        //         '红楼梦': []
        //     },
        //     movies: {},
        //     musics: {}
        // };
        // switch (queryOption){
        //     case '图书': SaveBook(json.books); break;
        //     case '电影': SaveBook(json.subjects); break;
        //     case '音乐': SaveBook(json.musics); break;
        // }
        // // console.dir(douban.book);
        // function SaveBook(books){
        //     for (let bookName in douban.books){
        //         if (queryContent === bookName) return;
        //     }
        //     douban.books[queryContent] = {};
        //     douban.books[queryContent]['firstPage']  = books.slice(0,20);
        //     douban.books[queryContent]['secondPage'] = books.slice(20,40);
        //     douban.books[queryContent]['thirdPage']  = books.slice(40,60);
        //     douban.books[queryContent]['fourthPage'] = books.slice(60,80);
        //     douban.books[queryContent]['fifthPage']  = books.slice(80);
        //     console.log(douban);
        // }

        console.log(json);
        $('#book-show-area').append(bookTemplete);
        // $('.site-homepage').toggleClass('site-homepage-hide');
        $('#site-homepage').addClass('site-homepage-hide');
        console.timeEnd('时间');

    };
    window.ParseBooksJSON = function (json) {
        if (!(query.searchContent in query.parsedDoubanData.books)) {
            let books = [];
            books.length = json.books.length;
            for (let i = 0; i < books.length; i++) {
                books[i] = {};
                books[i].image = json.books[i].images.large || query.notFound;
                books[i].title = json.books[i].title || query.notFound;
                books[i].author = (function (authors) {
                    let author = '';
                    let authorsNumber = authors.length;
                    for (let i = 0; i < authorsNumber; i++) {
                        author += authors[i] + ' ';
                    }
                    return author.trim();
                })(json.books[i].author) || query.notFound;
                books[i].publisher = json.books[i].publisher || query.notFound;
                books[i].pubdate = json.books[i].pubdate || query.notFound;
                books[i].price = json.books[i].price || query.notFound;
                books[i].rating = json.books[i].rating.average || query.notFound;
                books[i].ISBN = json.books[i].isbn13 || query.notFound;
            }
            // use push
            query.parsedDoubanData.books[query.searchContent] = books;
        }
        let booksNumber = query.parsedDoubanData.books[query.searchContent].length;
        let showBooksArea = $('#book-show-area');
        showBooksArea.empty();
        for (let i = 0; i < booksNumber; i++) {
            let bookTemplete = `<div class="col-12 col-md-6 item"><div class="row"><div class="col-4 col-md-3 book-image"></div><div class="col-8 col-md-9"><ul class="list-group"><li class="list-group-item"><a href="" class="book-title">${query.parsedDoubanData.books[query.searchContent][i].title}</a></li><li class="list-group-item author">作者：<a href="" class="author-name">${query.parsedDoubanData.books[query.searchContent][i].author}</a></li><li class="list-group-item publisher">出版社：<a href="" class="publisher-name">${query.parsedDoubanData.books[query.searchContent][i].publisher}</a></li><li class="list-group-item pubdate">出版年：<span class="date">${query.parsedDoubanData.books[query.searchContent][i].pubdate}</span></li> <li class="list-group-item price">定价：<span class="currency-icon">￥</span><span class="price-number">${query.parsedDoubanData.books[query.searchContent][i].price}</span></li> <li class="list-group-item rating">评分：<span class="average-rating">${query.parsedDoubanData.books[query.searchContent][i].rating}</span></li> <li class="list-group-item ISBN">ISBN：<span class="ISBN-number">${query.parsedDoubanData.books[query.searchContent][i].ISBN}</span></li></ul> </div> </div> </div>`;
            showBooksArea.append(bookTemplete);
        }
        let showBooksAreaImages = $('.book-image');
        let showBooksAreaImagesNumber = showBooksAreaImages.length;
        for (let i = 0; i < showBooksAreaImagesNumber; i++) {
            $(showBooksAreaImages[i]).css("background", `url("${query.parsedDoubanData.books[query.searchContent][i].image}") center center no-repeat`);
        }
        showBooksAreaImages.css('background-size','contain');
        $('#site-homepage').addClass('site-homepage-hide');
        console.timeEnd('时间');
    }
}();