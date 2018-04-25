require('./index.css');
require('page/common/nav-simple/index.js');

var _product = require('service/product-service.js');
var _cart = require('service/product-cart.js');
var _nav = require('page/common/nav/index.js');

var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

var page = {
    data: {
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        this.loadCart();
    },

    bindEvent: function() {
        var _this = this;

        // 获取购物车列表
        _cart.getCartList(function(target, msg) {
            _this.renderCart(target);
            console.log(target);
        }, function(err) {
            $('.page-wrap').html('<p class="err-tip">获取购物测失败</p>')
        }),

        // 删除单个商品
        $(document).on('click', '.cart-delete', function() {
            var productId = $(this).parents('.cart-table').data('product-id');
            var sProductId = String(productId);
            _this.deleteCartProduct(sProductId);
        })

        // 点击单个选择
        $(document).on('click', '.cart-select', function() {
            var cartTable = $(this).parents('.cart-table');
            var productId = cartTable.data('product-id');
            if ($(this).is(':checked')) {
                _cart.selectProduct(productId, (target, msg)=>{
                    _this.renderAllCart();
                }, (err)=> {
                    alert("选中失败")
                });
            //取消选中    
            } else {
                _cart.unselectProduct(productId, (target, msg)=>{
                    _this.renderAllCart();
                }, (err)=> {
                    alert("取消选中失败")
                });
                
            }
        })

        // 点击全选
        $(document).on('click', '.cart-select-all', function() {
            if ($(this).is(':checked')) {
                _cart.selectAllProduct((target, msg)=>{
                    _this.renderAllCart(true);
                }, (err)=> {
                    alert("选中失败")
                });
            //取消全选中    
            } else {
                _cart.unselectAllProduct((target, msg)=>{
                    _this.renderAllCart(false);
                }, (err)=> {
                    alert("取消全选中失败")
                });
                
            }
        })

        $(document).on('click', '.delete-selected', function() {
            window.confirm("确认删除全部选中商品");
            var productIds = []
            var $selectedItem = $('.cart-select')
            
            $selectedItem.each(function(index, element) {
                if($(this).is(':checked')) {
                    var productId = $(this).parents('.cart-table').data('product-id');
                    productIds.push(productId);
                }
            })
            console.log(productIds.join(','));
            _this.deleteCartProduct(productIds.join(','));
        })
    },

    loadCart: function() {
        var html = "";
        var _this = this;
        var $pageWrap =  $('.page-wrap');

        var subImages = [];

        // $pageWrap.html('<div class="loading"></div>')
    },

    renderAllCart: function(isAll) {
        var _this = this;

        _cart.getCartList(function(target, msg) {
            _this.renderCart(target, isAll);
        }, function(err) {
            $('.page-wrap').html('<p class="err-tip">获取购物测失败</p>')
        })
    },

    renderCart: function(data, isAll) {
        this.filter(data);
        this.data.cartInfo = data;

        // 生成Html
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);

        $(document).ready(function(){
            $('.cart-select').each(function(index, element) {
                if($(this).data('check') === 1) {
                    $(this).attr('checked', true);
                    $(this).parents('.cart-table').css('border', '1px solid brown');
                }
            });            
        })

        if(isAll) {
            $('.cart-select-all').attr("checked", true); 
        }
        
    },

    filter: function(data) {
        data.notEmpty = !!data.productVOList.length;
    },

    deleteCartProduct: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, (target, msg)=>{
            _this.renderAllCart();
        }, (err)=> {

        })
    }
}

$(()=>{
    page.init();
})