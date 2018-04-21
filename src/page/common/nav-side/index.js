require('./index.css')

var _mm = require('util/mm.js')
var templateIndex = require('./index.string');

var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '订单中心', href: './user-center.html'},
            {name: 'pass-update', desc: '修改密码', href: './user-password-update.html'},
            {name: 'about', desc: '关于MMALL', href: './user-center.html'}
        ],
    },

    init: function(option) {
        $.extend(this.option, option)
        this.renderNav();
    },

    renderNav: function() {
        for (let i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        };

        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });

        console.log(this.option);

        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;