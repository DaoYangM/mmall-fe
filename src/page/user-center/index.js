require('./index.css');
require('page/common/nav-simple/index.js');

var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-center'
        });

        this.loadUserInfo();
    },

    loadUserInfo: function() {

        var userHtml = "";

        _user.getUserInfo(function(target, msg) {
            userHtml = _mm.renderHtml(templateIndex,  target.target);
            $('.panel-body').html(userHtml);
            console.log(target);
        }, function(error) {
            window.location.href('./user-login.html');
        });
    }
}

$(function () {
    page.init();
})