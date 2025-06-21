$(document).ready(function ($) {
    awe_backtotop();
    awe_owl();
    awe_category();
    awe_menumobile();
    awe_tab();
    $('.link-toggle-slide-menu').click(function () {
        $(".c-menu--slide-left").addClass('active');
        $(".backdrop__body-backdrop___1rvky").addClass('active');
    });
    $('#close-nav').click(function () {
        $(".c-menu--slide-left").removeClass('active');
        $(".backdrop__body-backdrop___1rvky").removeClass('active');
    });
    $('.backdrop__body-backdrop___1rvky').click(function () {
        $(".c-menu--slide-left").removeClass('active');
        $(".backdrop__body-backdrop___1rvky").removeClass('active');
    });
    $('.ng-has-child1 a .fa1').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1').find('.ul-has-child1').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
    $('.ng-has-child1 .ul-has-child1 .ng-has-child2 a .fa2').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.ng-has-child1 .ul-has-child1 .ng-has-child2').find('.ul-has-child2').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
    $('.footer-inner .col-sm-4 .footer-widget h3').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.footer-inner .col-sm-4 .footer-widget').find('ul').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
});
$(".owl_news").owlCarousel({
    nav: true,
    margin: 15,
    slideSpeed: 600,
    paginationSpeed: 400,
    singleItem: false,
    pagination: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 4500,
    autoplayHoverPause: false,
    autoHeight: false,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        543: {
            items: 2
        },
        768: {
            items: 3
        },
        991: {
            items: 3
        },
        992: {
            items: 3
        },
        1300: {
            items: 3,
        },
        1590: {
            items: 3,
        }
    }
});
$('.brand-owl').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 4
        },
        1000: {
            items: 5
        }
    }
});
$(window).on("load resize", function (e) {
    setTimeout(function () {
        awe_resizeimage();
    }, 200);
    setTimeout(function () {
        awe_resizeimage();
    }, 1000);
});
$(document).on('click', '.overlay, .close-popup, .btn-continue, .fancybox-close', function () {
    hidePopup('.awe-popup');
    setTimeout(function () {
        $('.loading').removeClass('loaded-content');
    }, 500);
    return false;
})
$(window).resize(function () {
    if ($(window).width() < 993) {
        $('.aside-filter .fiter-title').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parents('.aside-filter').find('.aside-hidden-mobile').stop().slideToggle();
            $(this).toggleClass('active')
            return false;
        });
    };
});
if ($(window).width() < 767) {
    $('.aside-filter .fiter-title').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.aside-filter').find('.aside-hidden-mobile').stop().slideToggle();
        $(this).toggleClass('active')
        return false;
    });
};

function callbackW() {
    iWishCheck();
    iWishCheckInCollection();
    $(".iWishAdd").click(function () {
        var iWishvId = iWish$(this).parents('form').find("[name='id']").val();
        if (typeof iWishvId === 'undefined') {
            iWishvId = iWish$(this).parents('form').find("[name='variantId']").val();
        };
        var iWishpId = iWish$(this).attr('data-product');
        if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
            iWishvId = iWish$(this).attr('data-variant');
        }
        if (typeof iWishvId === 'undefined' || typeof iWishpId === 'undefined') {
            return false;
        }
        if (iwish_cid == 0) {
            iWishGotoStoreLogin();
        } else {
            var postObj = {
                actionx: 'add',
                cust: iwish_cid,
                pid: iWishpId,
                vid: iWishvId
            };
            iWish$.post(iWishLink, postObj, function (data) {
                if (iWishFindAndGetVal('#iwish_post_result', data) == undefined) return;
                var result = (iWishFindAndGetVal('#iwish_post_result', data).toString().toLowerCase() === 'true');
                var redirect = parseInt(iWishFindAndGetVal('#iwish_post_redirect', data), 10);
                if (result) {
                    if (Bizweb.template == "product") {
                        iWish$('.iWishAdd').addClass('iWishHidden'), iWish$('.iWishAdded').removeClass('iWishHidden');
                        if (redirect == 2) {
                            iWishSubmit(iWishLink, {
                                cust: iwish_cid
                            });
                        }
                    } else if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
                        iWish$.each(iWish$('.iWishAdd'), function () {
                            var _item = $(this);
                            if (_item.attr('data-variant') == iWishvId) {
                                _item.addClass('iWishHidden'), _item.parent().find('.iWishAdded').removeClass('iWishHidden');
                            }
                        });
                    }
                }
            }, 'html');
        }
        return false;
    });
    $(".iWishAdded").click(function () {
        var iWishvId = iWish$(this).parents('form').find("[name='id']").val();
        if (typeof iWishvId === 'undefined') {
            iWishvId = iWish$(this).parents('form').find("[name='variantId']").val();
        };
        var iWishpId = iWish$(this).attr('data-product');
        if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
            iWishvId = iWish$(this).attr('data-variant');
        }
        if (typeof iWishvId === 'undefined' || typeof iWishpId === 'undefined') {
            return false;
        }
        if (iwish_cid == 0) {
            iWishGotoStoreLogin();
        } else {
            var postObj = {
                actionx: 'remove',
                cust: iwish_cid,
                pid: iWishpId,
                vid: iWishvId
            };
            iWish$.post(iWishLink, postObj, function (data) {
                if (iWishFindAndGetVal('#iwish_post_result', data) == undefined) return;
                var result = (iWishFindAndGetVal('#iwish_post_result', data).toString().toLowerCase() === 'true');
                var redirect = parseInt(iWishFindAndGetVal('#iwish_post_redirect', data), 10);
                if (result) {
                    if (Bizweb.template == "product") {
                        iWish$('.iWishAdd').removeClass('iWishHidden'), iWish$('.iWishAdded').addClass('iWishHidden');
                    } else if (Bizweb.template == 'collection' || Bizweb.template == 'index') {
                        iWish$.each(iWish$('.iWishAdd'), function () {
                            var _item = $(this);
                            if (_item.attr('data-variant') == iWishvId) {
                                _item.removeClass('iWishHidden'), _item.parent().find('.iWishAdded').addClass('iWishHidden');
                            }
                        });
                    }
                }
            }, 'html');
        }
        return false;
    });

}
window.callbackW = callbackW;

function awe_showNoitice(selector) {
    $(selector).animate({
        right: '0'
    }, 500);
    setTimeout(function () {
        $(selector).animate({
            right: '-300px'
        }, 500);
    }, 3500);
}
window.awe_showNoitice = awe_showNoitice;

function awe_showLoading(selector) {
    var loading = $('.loader').html();
    $(selector).addClass("loading").append(loading);
}
window.awe_showLoading = awe_showLoading;

function awe_hideLoading(selector) {
    $(selector).removeClass("loading");
    $(selector + ' .loading-icon').remove();
}
window.awe_hideLoading = awe_hideLoading;

function awe_showPopup(selector) {
    $(selector).addClass('active');
}
window.awe_showPopup = awe_showPopup;

function awe_hidePopup(selector) {
    $(selector).removeClass('active');
}
window.awe_hidePopup = awe_hidePopup;

function awe_convertVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
}
window.awe_convertVietnamese = awe_convertVietnamese;

function awe_resizeimage() {
    $('.product-box .product-thumbnail a img').each(function () {
        var t1 = (this.naturalHeight / this.naturalWidth);
        var t2 = ($(this).parent().height() / $(this).parent().width());
        if (t1 <= t2) {
            $(this).addClass('bethua');
        }
        var m1 = $(this).height();
        var m2 = $(this).parent().height();
        if (m1 <= m2) {
            $(this).css('padding-top', (m2 - m1) / 2 + 'px');
        }
    })
}
window.awe_resizeimage = awe_resizeimage;

function awe_category() {
    $('.nav-category .fa-angle-down').click(function (e) {
        $(this).parent().toggleClass('active');
    });
}
window.awe_category = awe_category;

function awe_menumobile() {
    $('.menu-bar').click(function (e) {
        e.preventDefault();
        $('#nav').toggleClass('open');
    });
    $('#nav .fa').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().toggleClass('open');
    });
}
window.awe_menumobile = awe_menumobile;

function awe_accordion() {
    $('.accordion .nav-link').click(function (e) {
        e.preventDefault;
        $(this).parent().toggleClass('active');
    })
}
window.awe_accordion = awe_accordion;

function awe_owl() {
    $('.owl-carousel:not(.not-dqowl)').each(function () {
        var xs_item = $(this).attr('data-xs-items');
        var md_item = $(this).attr('data-md-items');
        var sm_item = $(this).attr('data-sm-items');
        var margin = $(this).attr('data-margin');
        var dot = $(this).attr('data-dot');
        if (typeof margin !== typeof undefined && margin !== false) { } else {
            margin = 30;
        }
        if (typeof xs_item !== typeof undefined && xs_item !== false) { } else {
            xs_item = 1;
        }
        if (typeof sm_item !== typeof undefined && sm_item !== false) {

        } else {
            sm_item = 3;
        }
        if (typeof md_item !== typeof undefined && md_item !== false) { } else {
            md_item = 3;
        }
        if (typeof dot !== typeof undefined && dot !== true) {
            dot = true;
        } else {
            dot = false;
        }
        $(this).owlCarousel({
            loop: false,
            margin: Number(margin),
            responsiveClass: true,
            dots: dot,
            nav: true,
            responsive: {
                0: {
                    items: Number(xs_item)
                },
                600: {
                    items: Number(sm_item)
                },
                1000: {
                    items: Number(md_item)
                }
            }
        })
    })
}
window.awe_owl = awe_owl;

function awe_backtotop() {
    if ($('.back-to-top').length) {
        var scrollTrigger = 100,
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.back-to-top').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('.back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}
window.awe_backtotop = awe_backtotop;

function awe_tab() {
    $(".e-tabs").each(function () {
        $(this).find('.tabs-title li:first-child').addClass('current');
        $(this).find('.tab-content').first().addClass('current');

        $(this).find('.tabs-title li').click(function () {
            var tab_id = $(this).attr('data-tab');
            var url = $(this).attr('data-url');
            $(this).closest('.e-tabs').find('.tab-viewall').attr('href', url);
            $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
            $(this).closest('.e-tabs').find('.tab-content').removeClass('current');
            $(this).addClass('current');
            $(this).closest('.e-tabs').find("#" + tab_id).addClass('current');
        });
    });
}
window.awe_tab = awe_tab;
$('.dropdown-toggle').click(function () {
    $(this).parent().toggleClass('open');
});
$('.btn-close').click(function () {
    $(this).parents('.dropdown').toggleClass('open');
});
$('body').click(function (event) {
    if (!$(event.target).closest('.dropdown').length) {
        $('.dropdown').removeClass('open');
    };
});
$(document).on('keydown', '#qty, #quantity-detail, .number-sidebar', function (e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

// Services page pagination
$(document).ready(function () {
    // Handle pagination clicks
    $('.pagination a').click(function (e) {
        e.preventDefault();

        // Don't do anything if clicking the active page
        if ($(this).hasClass('active')) {
            return;
        }

        // Handle prev/next buttons
        if ($(this).hasClass('prev-page')) {
            const currentPage = parseInt($('.pagination a.active').data('page'));
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
            return;
        }

        if ($(this).hasClass('next-page')) {
            const currentPage = parseInt($('.pagination a.active').data('page'));
            const maxPage = $('.pagination a[data-page]').length;
            if (currentPage < maxPage) {
                showPage(currentPage + 1);
            }
            return;
        }

        // Show the clicked page
        showPage($(this).data('page'));
    });

    function showPage(pageNum) {
        // Hide all pages
        $('.page-services, .page-services.page-2').hide();

        // Show the selected page
        if (pageNum === 1) {
            $('.page-services:not(.page-2)').show();
        } else {
            $('.page-services.page-2').show();
        }

        // Update active state in pagination
        $('.pagination a').removeClass('active');
        $('.pagination a[data-page="' + pageNum + '"]').addClass('active');

        // Scroll to top of services section
        $('html, body').animate({
            scrollTop: $('.page-services:visible').offset().top - 100
        }, 500);
    }
});