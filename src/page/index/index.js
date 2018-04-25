require('page/common/header/index.js')
require('util/unslider/index.js')
require('page/common/nav/index.js')

require('./index.css')

var _mm = require('util/mm.js');
var navSide = require('page/common/nav-side/index.js')
var templateBanner = require('./banner.string')

navSide.init({
    name: 'order-list'
})

$(function() {

    var bannerHtml =  _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);

    var $slider = $('.banner').unslider({
        dots: true
    });

    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev')? 'prev': 'next';
        $slider.data('unslider')[forward]();
    })
});

