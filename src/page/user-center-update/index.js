require('./index.css');
require('page/common/nav-simple/index.js');

var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var _mm = require('util/mm.js');

var formError = {

    _target: "",

    show: function (msg, target) {
        this._target = target;
        $('.error-item').show().find('.err-msg').text(msg);
        $('#'+target).css("border", "1px solid red");
    },

    hide: function (msg) {
        $('.error-item').hide().find('.err-msg').text('');
        $('#'+ this._target).css("border", "1px solid #bdbdbd");
    }
};

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function() {
        navSide.init({
            name: 'user-center'
        });

        this.loadUserInfo();

        this.bindEvent();
    },

    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var formData = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val()),
                username: '',
                password: ''
            },

            validateResult = _this.formValidate(formData);

            if(validateResult.status) {
                _user.updateUserInfo(formData, function(target, desc) {
                    console.log(target);
                    formError.hide();
                    window.location.href = './user-center.html';
                }, function(err) {
                    formError.show("用户信息更新失败");
                });
            } else {
                formError.show(validateResult.msg);
            }
        },
    )},

    formValidate: function (formData) {
        console.log(formData);
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validate(formData.phone, 'require')) {
            result.msg = '手机号名不能为空';
            return result;
        }

        if (!_mm.validate(formData.email, 'require')) {
            result.msg = '邮箱名不能为空';
            return result;
        }

        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '问题名不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '答案名不能为空';
            return result;
        }
        result.status = true;
        result.msg = "验证通过";

        return result;
    },
    loadUserInfo: function() {

        var userHtml = "";

        _user.getUserInfo(function(target, msg) {
            userHtml = _mm.renderHtml(templateIndex,  target.target);
            $('.panel-body').html(userHtml);
        }, function(error) {

        });
    }
}

$(function () {
    page.init();
})