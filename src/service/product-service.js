var _mm = require('util/mm.js');

var _product = {
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            method: 'get',
            data: listParam,
            url: _mm.getServerUrl('/products'),
            success: resolve,
            error: reject
        });
    },
    
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            method: 'get',
            data: productId,
            url: _mm.getServerUrl('/products/'+productId),
            success: resolve,
            error: reject
        });
    }
}

module.exports = _product;