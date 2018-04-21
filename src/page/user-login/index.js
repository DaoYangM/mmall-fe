require('./index.css')
require('page/common/nav-simple/index.js')

var _user = require('service/user-service.js')
var _mm = require('util/mm.js');

var formError = {
    show: function (msg) {
        $('.error-item').show().find('.err-msg').text(msg);
    },

    hide: function (msg) {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });

        $('user-con').keyup(function (e) {
            // 表示回车
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },

    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },

            validateResult = this.formValidate(formData);

        if(validateResult.status) {
            _user.login(formData, function(target, desc) {
                console.log(target);
                formError.hide();
                alert("登录成功!");
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(err) {
                formError.show("用户名或密码错误");
            });
        } else {
            formError.show(validateResult.msg);
        }
    },

    formValidate: function (formData) {

        console.log(formData);
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }

        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码名不能为空';
            return result;
        }

        result.status = true;
        result.msg = "验证通过";

        return result;
    }
};

$(function () {
    page.init();
})