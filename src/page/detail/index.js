require('./index.css');
require('page/common/nav-simple/index.js');

var _product = require('service/product-service.js');
var _cart = require('service/product-cart.js');

var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

var page = {
    data: {
        productId: _mm.getUrlParam('productid') || '',
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
        console.log(this.data);
    },

    onLoad: function() {

        if(!this.data.productId) {
            _mm.goHome();
        } else {
            this.loadDetail();
        }
    },

    bindEvent: function() {
        var _this = this;

        // 绑定图片列表
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });

        // count 操作
        $(document).on('click', '.p-count-btn', function() {
            
            var type = $(this).hasClass('plus')? 'plus': 'minus',
            $pCount = $('.p-count'),
            currCount = parseInt($pCount.val()),
            minCount = 1,
            maxCount = _this.data.dataInfo.stock || 1;

            if(type === 'plus') {
                $pCount.val(currCount < maxCount? currCount + 1: maxCount);
            } else if(type === 'minus') {
                $pCount.val(currCount > minCount? currCount - 1: minCount);
            }
        });

        $(document).on('input ', '.p-count', function() {
            var maxCount = _this.data.dataInfo.stock || 1;
            $pCount = $('.p-count').val();
            if ($pCount > maxCount) {
                alert("超出库存数量");
                $('.p-count').val(maxCount);
            }
        }) 
            

        // 加入购物车
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(target, msg) {
                window.location.href = './result.html?type=cart-add';
            }, function(err) {

            })
        });
    },

    loadDetail: function() {
        var html = "";
        var _this = this;
        var $pageWrap =  $('.page-wrap');

        var subImages = [];

        $pageWrap.html('<div class="loading"></div>')
        _product.getProductDetail(this.data.productId, (target, msg) => {
           
            subImages = target.subImages.split(',');
            target.subImages = subImages;
            _this.data.dataInfo = target;
            console.log(_this.data.dataInfo);
            html = _mm.renderHtml(templateIndex, target);
           $pageWrap.html(html);
        }, (err)=>{
            $pageWrap.html('<p class="err-tip">无商品</p>')
        });
    }
}

$(()=>{
    page.init();
})