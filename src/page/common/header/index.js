require('./index.css')

var _mm = require('util/mm.js')

var header = {
    init: function() {
        this.bindEvent();
    },

    onLoad: function() {
        var keyword = _mm.gerUrlParam('keywork');
        if(keyword) {
            $('#search-input').val(keyword);
        }
    },

    bindEvent: function() {
        var _this = this;
        $('#search-btn').click(function() {
            _this.searchSubmit();
        })

        $('#search-input').keyup(function(e) {
            if(e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },

    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        
        if(keyword) {
            window.location.href = './list.html?keywork=' + keyword;
        } else {
            _mm.goHome();
        }
    }
}

header.init();