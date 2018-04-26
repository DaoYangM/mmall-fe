var Hogan = require('hogan.js')
var conf = {
    serverHost: ''
}

var _mm = {
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            // dataType: param.type || 'json',
            data: param.data || '',
            success: function (result) {
                console.log("success "+result.code);
                if (0 === result.code) {
                    typeof param.success === 'function' && param.success(result.target, result.desc);

                } else if (10 === result.code) {
                    _this.doLogin();

                } else if (1 === result.code) {
                    typeof param.error === 'function' && param.error(result.desc);
                }
            },

            error: function (err) {
                console.log(err);
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    goHome: function() {
        window.location.href = './index.html'
    },

    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    getUrlParam: function (name) {
        //happymmall.com/products?keywork=xxx&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);

        return result ? decodeURIComponent(result[2]) : null;
    },

    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
        result = template.render(data);

        return  result;
    },

    successTips: function(msg) {
        alert(msg || '操作成功');
    },

    errorTips: function(msg) {
        alert(msg || '错了');
    },

    validate: function(value, type) {
        var value = $.trim(value);

        if('require' === type) {
            return !!value;
        }

        if('phone' === type) {
            return /^1\d{10}$/.test(value);
        }

        if('email' === type) {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    }
}

module.exports = _mm;