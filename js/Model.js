!function () {
    window.Model = function (userModel) {
        let model = {
            option: undefined,
            searchContent: undefined,
            getOption: function (view) {
                this.option = (function (option) {
                    return option === '类别' ?  alert('请选择查询类别！') : option;
                })(view.option.innerText.trim());
                return this.option;
            },
            getSearchContent: function (view) {
                this.searchContent = (function (searchContent) {
                    return searchContent === null ? alert('请选择查询内容！') : searchContent.join('');
                })(view.content.value.match(view.OpimizeSearchContentReg));
                return this.searchContent;
            },
        };
        for (let key in userModel) {
            model[key] = userModel[key];
        }
        return model;
    }
}();