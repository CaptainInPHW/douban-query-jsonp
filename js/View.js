!function () {
    window.View = function (userView) {
        let view ={
            homepage: $('#site-homepage'),
            option: $('#site-dropdown-button')[0],
            content: $('#site-search-content')[0],
            OpimizeSearchContentReg: new RegExp(/[a-zA-Z0-9\u4e00-\u9fa5]+/,'g')
        };
        for (let key in userView) {
            view[key] = userView[key];
        }
        return view;
    }
}();