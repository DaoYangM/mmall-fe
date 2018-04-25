require('./index.css')
var _user = require('service/user-service.js');
var _cart = require('service/product-cart.js');
var _mm = require('util/mm.js');
var templateHtml = require('./index.string');
var templateCart = require('./cart.string');

var _nav = {
    
    data: {
        username: '',
        isLogin: false
    },

    init: function() {
        this.onLoad();
    },

    onLoad: function() {
        var _this = this;

        this.getUserInfo(function(username) {
            _this.data.username = username;
            if(_this.data.username) {
                _this.data.isLogin = true;
    
                var _html = _mm.renderHtml(templateHtml, _this.data);
                console.log(_html);
    
                $('.user-info').html(_html);
                $('.user-info').find('span').removeClass('login');

                $(document).on('click', '.js-logout', function() {
                    
                    _this.logout((target)=> {
                        alert(target);
                        _mm.goHome();
                    }, function(ee) {
                        alert(ee);
                    });
                })
            } else {
                var _html = _mm.renderHtml(templateHtml, _this.data);
                console.log(_html);
    
                $('.user-info').html(_html);
            }
        }, function() {
            _this.data.isLogin = false
            _this.data.username = '';
            var _html = _mm.renderHtml(templateHtml, _this.data);
            console.log(_html);

            $('.user-info').html(_html);
        });
            
        _this.getCartCount();
    },

    getUserInfo: function(suc, fal) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: '/users/me',
            success: function (result) {
                if (0 === result.code) {
                    suc(result.target.target.username);
                } else if (10 === result.code) {
                    fal();
                } 
            },

            error: function (err) {
                console.log(err);
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    getCartCount: function() {
        var html = '';
        _cart.getCartCount((target, msg)=> {
            this.data.cartCount = target;
            html = _mm.renderHtml(templateCart, this.data);
            $('.nav-list').html(html);
        
        // 可能需要登录
        }, (err)=> {
            html = _mm.renderHtml(templateCart, this.data);
            $('.nav-list').html(html);
        });
    },

    logout: function(suc, fal) {
        var _this = this;
        $.ajax({
            type: 'get',
            url: '/users/logout',
            success: function (result) {
                if (0 === result.code) {
                    suc(result.target);
                } else if (10 === result.code) {
                    fal();
                } 
            },

            error: function (err) {
                console.log(err);
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },}

$(()=>{
    _nav.init();
})

module.exports = _nav;