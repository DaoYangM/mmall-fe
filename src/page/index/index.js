require('page/common/header/index.js')
require('page/common/nav/index.js')
var _mm = require('util/mm.js');
var navSide = require('page/common/nav-side/index.js')
navSide.init({
    name: 'order-list'
})


// console.log(_mm.getUrlParam('name'));

// var html = '<div>{{ data }}</div>'
// var data = {
//     data: 123
// }

// console.log(_mm.renderHtml(html, data));

// console.log("email: " + _mm.validate(value="498721777@qq.com", type="email"))