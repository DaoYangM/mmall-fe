require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function() {
    
    var _this = this;

    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }
    // 事件处理

    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function'? _this.option.onSelectPage($this.data('value')): null; 
    })
}

Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);

    console.log('option', this.option);

    if(!(this.option.container instanceof jQuery)) {
        return;
    }

    if(this.option.pages <= 1) {
        return;
    }

    // 渲染分页
    this.option.container.html(this.getPaginationHtml());
}

Pagination.prototype.getPaginationHtml = function() {
    var html = '',
        pageArray = [],
        start = this.option.pageNum - this.option.pageRange >  0? this.option.pageNum: 1;
        end = this.option.pageNum +this. option.pageRange < this.option.pages? 
            this.option.pageNum + this.option.pageRange: this.option.pages;
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: this.option.hasPreviousPage? false: true,
    })

    for (let i = start; i <= end; i++){
        pageArray.push({
            name: i,
            value: i,
            active: (i === this.option.pageNum),
        })
    }

    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: this.option.hasNextPage? false: true,
    });
    console.log('pageArray'+pageArray);

    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: this.option.pageNum,
        pages: this.option.pages
    })

    return html;
}

module.exports = Pagination;