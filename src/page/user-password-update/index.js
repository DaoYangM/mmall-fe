require('./index.css')
require('../user-center-update/index.css')
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
            name: 'pass-update'
        });

        this.bindEvent();
    },

    bindEvent: function() {

        var _this = this;

        $('.btn-submit').click(function() {
            var formData = {
                oldPassword: $.trim($('#old-password').val()),
                newPassword: $.trim($('#new-password').val())
            }
            console.log(formData);
            
            var result = _this.formValidate(formData);

            if(result.status) {
                _user.updatePassword(formData, function(target, msg){
                    console.log(msg);
                }, function(error) {
                    formError.show(error);
                });
            } else {
                formError.show(result.msg);
            }
        });
    },

    formValidate: function (formData) {
        console.log(formData);
        var result = {
            status: false,
            msg: ''
        };

        if (!_mm.validate(formData.oldPassword, 'require')) {
            result.msg = '旧不能为空';
            return result;
        }

        if (!_mm.validate(formData.newPassword, 'require')) {
            result.msg = '新密码不能为空';
            return result;
        }

        result.status = true;
        result.msg = "验证通过";

        return result;
    },
}

$(function() {
    page.init();
})