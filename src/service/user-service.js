var _mm = require('util/mm.js');

var _user = {
    login: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'post',
            data: userInfo,
            url: _mm.getServerUrl('/users/login'),
            success: resolve,
            error: reject
        });
    },

    register: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'post',
            data: userInfo,
            url: _mm.getServerUrl('/users/register'),
            success: resolve,
            error: reject
        });
    },

    checkUsername: function (username, resolve, reject) {
        _mm.request({
            method: 'post',
            data: {
                'username' : username
            },
            url: _mm.getServerUrl('/users/check/username'),
            success: resolve,
            error: reject
        });
    },

    getUserInfo: function(resolve, reject) {
        _mm.request({
            method: 'get',
            url: _mm.getServerUrl('/users/me'),
            success: resolve,
            error: reject
        });
    },

    updateUserInfo: function (userInfo, resolve, reject) {
        _mm.request({
            method: 'put',
            data: userInfo,
            url: _mm.getServerUrl('/users/update/detail'),
            success: resolve,
            error: reject
        });
    },

    updatePassword: function(userInfo, resolve, reject) {
        _mm.request({
            method: 'put',
            data: userInfo,
            url: _mm.getServerUrl('/users/password'),
            success: resolve,
            error: reject
        });
    },

    getUsername: function() {
        _mm.request({
            method: 'put',
            data: userInfo,
            url: _mm.getServerUrl('/users/password'),
            success: resolve,
            error: reject
        });
    },

    logout: function(resolve, reject) {
        _mm.request({
            method: 'get',
            url: '/logout',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;