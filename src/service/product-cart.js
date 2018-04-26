var _mm = require('util/mm.js');

var _cart = {
    addToCart: function(cartInfo, resolve, reject) {
        _mm.request({
            method: 'post',
            data: cartInfo,
            url: _mm.getServerUrl('/cart'),
            success: resolve,
            error: reject
        });
    },

    getCartList: function(resolve, reject) {
        _mm.request({
            method: 'get',
            url: _mm.getServerUrl('/cart'),
            success: resolve,
            error: reject
        });
    },

    deleteProduct: function(productIds, resolve, reject) {
        _mm.request({
            method: 'delete',
            data: productIds,
            url: _mm.getServerUrl('/cart'),
            success: resolve,
            error: reject
        });
    },

    selectProduct: function(productId, resolve, reject) {
        _mm.request({
            method: 'put',
            url: _mm.getServerUrl('/cart/select/'+productId),
            success: resolve,
            error: reject
        });
    },

    unselectProduct: function(productId, resolve, reject) {
        _mm.request({
            method: 'put',
            url: _mm.getServerUrl('/cart/unselect/'+productId),
            success: resolve,
            error: reject
        });
    },

    selectAllProduct: function(resolve, reject) {
        _mm.request({
            method: 'put',
            url: _mm.getServerUrl('/cart/selectall'),
            success: resolve,
            error: reject
        });
    },

    unselectAllProduct: function(resolve, reject) {
        _mm.request({
            method: 'put',
            url: _mm.getServerUrl('/cart/unselectall'),
            success: resolve,
            error: reject
        });
    },

    getCartCount: function(resolve, reject) {
        
        $.ajax({
            type: 'get',
            url: '/cart/count',
            success: function(result) {
                if(result.code === 0) {
                    resolve(result.target, result.msg);
                }
                    
                else if (result.code === 10) {
                    reject();
                }
                    
            },
            error: function(err) {
                console.log('cart-service' + err);
            }
        })
    },

    // 修改购物车数量
    updateProduct: function(cartData, resolve, reject) {
        _mm.request({
            method: 'put',
            data: cartData,
            contentType:"application/x-www-form-urlencoded",
            url: _mm.getServerUrl('/cart'),
            success: resolve,
            error: reject
        });
    }
}

module.exports = _cart;