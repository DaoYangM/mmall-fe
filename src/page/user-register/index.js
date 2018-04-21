require('./index.css')
require('page/common/nav-simple/index.js')

var _user = require('service/user-service.js')
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

var username = $('#username');
var _password = $('#password');

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

        $('#username').blur(function() {
            var username = $.trim($(this).val());

            _user.checkUsername(username, function(result) {
                formError.hide();
            }, function(error) {
                formError.show(error, 'username');
            });
        })
    },

    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim(username.val()),
            password: $.trim($('#password').val()),
            phone: $.trim($('#phone').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        },

        validateResult = this.formValidate(formData);

        if(validateResult.status) {
            console.log(formData);
            _user.register(formData, function(target, desc) {
                console.log(target);
                formError.hide();
                window.location.href = './result.html?type=register';
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
            username.css("border", "1px solid red");
            return result;
        }

        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码名不能为空';
            _password.css("border", "1px solid red");
            return result;
        }
        if (!_mm.validate(formData.passwordConfirm, 'require')) {
            result.msg = '确认密码名不能为空';
            return result;
        }

        if (formData.password != formData.passwordConfirm) {
            result.msg = "两次密码不同";
            return result;
        }

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
    }
};

$(function () {
    page.init();
})