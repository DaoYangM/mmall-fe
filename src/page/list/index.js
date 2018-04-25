require('./index.css');
require('page/common/nav-simple/index.js');

var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');
var Pagination = require('util/pagination/index.js');


var page = {

    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        this.loadList();
    },

    bindEvent: function() {
        var _this = this;

        // 排序点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        })
    },

    // 加载list
    loadList: function() {

        var _this = this;

        var listParam = this.data.listParam, 
            listHtml = '';

        _product.getProductList(listParam, function(target, msg) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: target.list
            });

            $('.p-list-con').html(listHtml);

            var pageInfo = {
                hasPreviousPage: target.hasPreviousPage,
                prePage: target.prePage,
                hasNextPage: target.hasNextPage,
                nextPage: target.nextPage,
                pageNum: target.pageNum,
                pages: target.pages
            };
            console.log(pageInfo);
            _this.loadPagination(pageInfo);

        }, function(err) {
    
        });
    },
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function () {
    page.init();
})