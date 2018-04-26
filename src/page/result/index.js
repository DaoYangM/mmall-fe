require('./index.css')
require('page/common/nav-simple/index.js')

var _mm = require('util/mm.js')

$(function() {
    var type = _mm.getUrlParam('type') || 'default';
    var $element = $('.' + type +'-success');
    $element.show();
    $element.append('<a href="./cart.html" style="color: red; font-size: 30px; margin-left: 20px">这就去结算</a>');
})