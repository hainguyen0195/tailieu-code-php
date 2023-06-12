/* Validation form */
ValidationFormSelf("validation-newsletter-index");
ValidationFormSelf("validation-datlich-index");
ValidationFormSelf("validation-cart");
ValidationFormSelf("validation-user");
ValidationFormSelf("validation-contact");

/* Exists */
$.fn.exists = function () {
    return this.length;
};

/* Paging ajax */
if ($(".paging-product").exists()) {
    loadPagingAjax("ajax/ajax_product.php?perpage=" + PAGING_INDEX, '.paging-product');
}

if ($("#show_padding").exists()) {
    var list = $("#show_padding").data("id_list");
    loadPagingAjax("ajax/ajax_product.php?&idList=" + list, '#show_padding');

    $(".choose_list span").click(function () {
        if ($('.choose_list span').hasClass('choosed')) {
            $('.choose_list span').removeClass('choosed');
        }
        $(this).addClass('choosed');
        var id_list = $(this).attr("data-id_list");
        $("#show_padding").attr("data-id_list", id_list);
        loadPagingAjax("ajax/ajax_product.php?&idList=" + id_list, '#show_padding');
        return false;
    })
}


if ($(".show_padding").exists()) {
    $(".show_padding").each(function () {
        var list = $(this).data("list");
        var cat = $(this).data("cat");
        loadPagingAjax("ajax/ajax_product.php?perpage=" + PAGING_INDEX + "&idList=" + list + "&idCat=" + cat, '.show_padding' + list);
    })
}
if ($(".choose_list").exists()) {
    $(".choose_list span").click(function () {
        if ($('.choose_list span').hasClass('choosed')) {
            $('.choose_list span').removeClass('choosed');
        }
        $(this).addClass('choosed');
        var list = $(this).attr("data-list");
        var cat = $(this).attr("data-cat");
        $(".show_padding" + list).attr("data-list", list);
        $(".show_padding" + list).attr("data-cat", cat);
        loadPagingAjax("ajax/ajax_product.php?perpage=" + PAGING_INDEX + "&idList=" + list + "&idCat=" + cat, '.show_padding' + list);
        return false;
    })
}


if ($("#show-ajaxslick").exists()) {
    var list = $("#show-ajaxslick").data("id_list");
    loadPagingAjaxSlick("ajax/ajax_mod.php?idList=" + list, '#show-ajaxslick');

    $(".btn-list-ajaxslick").click(function () {
        if ($('.btn-list-ajaxslick').hasClass('active')) {
            $('.btn-list-ajaxslick').removeClass('active');
        }
        $(this).addClass('active');
        var id_list = $(this).attr("data-id_list");
        $("#show-ajaxslick").attr("data-id_list", id_list);
        loadPagingAjaxSlick("ajax/ajax_mod.php?idList=" + id_list, '#show-ajaxslick');
        return false;
    })
}

Hcode.slickajaxslick = function () {
    if ($(".slick-ajaxslick").exists()) {
        $(".slick-ajaxslick").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: false,
            infinite: true,
            verticalSwiping: false,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1000,
            arrows: true,
            dots: false,
            centerMode: true,
            centerPadding: '0px',
            responsive: [
                { breakpoint: 1199, settings: { slidesToShow: 4 } },
                { breakpoint: 993, settings: { slidesToShow: 3 } },
                { breakpoint: 580, settings: { slidesToShow: 2 } },
                { breakpoint: 400, settings: { slidesToShow: 2 } },
                ]
        });
    }
};


/* Back to top */
Hcode.BackToTop = function () {
    $(window).scroll(function () {
        if (!$('.scrollToTop').length) $("body").append('<div class="scrollToTop"><img src="' + GOTOP + '" alt="Go Top"/></div>');
        if ($(this).scrollTop() > 100) $('.scrollToTop').fadeIn();
        else $('.scrollToTop').fadeOut();
    });

    $('body').on("click", ".scrollToTop", function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
};

/* Alt images */
Hcode.AltImages = function () {
    $('img').each(function (index, element) {
        if (!$(this).attr('alt') || $(this).attr('alt') == '') {
            $(this).attr('alt', WEBSITE_NAME);
        }
    });
};

/* Tools */
Hcode.Tools = function () {
    if ($(".toolbar").exists()) {
        $(".footer").css({ marginBottom: $(".toolbar").innerHeight() });
    }
};

/* Popup */
Hcode.Popup = function () {
    if ($("#fancy-popup").exists()) {
        $().ready(function () {
            $(".fancy-popup").fancybox({ padding: 0, margin: 0, wrapCSS: "defaul" });
            setTimeout(function () { $(".fancy-popup").click(); }, 500);
        })
    }
};
/* Wow */
Hcode.WowAnimation = function () {
    new WOW().init();
};

/* Toc */
Hcode.Toc = function () {
    if ($(".toc-list").exists()) {
        $(".toc-list").toc({
            content: "div#toc-content",
            headings: "h2,h3,h4"
        });

        if (!$(".toc-list li").length) $(".meta-toc").hide();

        $('.toc-list').find('a').click(function () {
            var x = $(this).attr('data-rel');
            goToByScroll(x);
        });
    }
};

/* Simply scroll */
Hcode.SimplyScroll = function () {
    if ($(".newshome-scroll").exists()) {
        $(".newshome-scroll ul").simplyScroll({
            customClass: 'vert',
            orientation: 'vertical',
            // orientation: 'horizontal',
            auto: true,
            manualMode: 'auto',
            pauseOnHover: 1,
            speed: 1,
            loop: 0
        });
    }
};

/* Tabs */
Hcode.Tabs = function () {
    if ($(".ul-tabs-pro-detail").exists()) {
        $(".ul-tabs-pro-detail li").click(function () {
            var tabs = $(this).data("tabs");
            $(".content-tabs-pro-detail, .ul-tabs-pro-detail li").removeClass("active");
            $(this).addClass("active");
            $("." + tabs).addClass("active");
        });
    }
};

/* Photobox */
Hcode.Photobox = function () {
    if ($(".album-gallery").exists()) {
        $('.album-gallery').photobox('a', { thumbs: true, loop: false });
    }
};

/* Datetime picker */
Hcode.DatetimePicker = function () {
    if ($('#ngaysinh').exists()) {
        $('#ngaysinh').datetimepicker({
            timepicker: false,
            format: 'd/m/Y',
            formatDate: 'd/m/Y',
            minDate: '01/01/1950',
            maxDate: TIMENOW
        });
    }
};
/* Search */
Hcode.Search = function () {
    if ($(".icon-search").exists()) {
        $(".icon-search").click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(".search-grid").stop(true, true).animate({ opacity: "0", width: "0px" }, 200);
            } else {
                $(this).addClass('active');
                $(".search-grid").stop(true, true).animate({ opacity: "1", width: "230px" }, 200);
            }
            document.getElementById($(this).next().find("input").attr('id')).focus();
            $('.icon-search i').toggleClass('fa fa-search fa fa-times');
        });
    }
};
/* Videos */
Hcode.Videos = function () {

    if ($(".video").exists()) {
        $('[data-fancybox="video"]').fancybox({
            transitionEffect: "fade",
            transitionDuration: 800,
            animationEffect: "fade",
            animationDuration: 800,
            arrows: true,
            infobar: false,
            toolbar: true,
            hash: false
        });
    }
};
Hcode.fancybox_Xuhuong = function () {
    $(".fancybox")
    .attr('rel', 'gallery')
    .fancybox();
};

/* Owl */
Hcode.OwlPage = function () {
    if ($(".owl-tintuc").exists()) {
        var owl = $('.owl-tintuc');
        owl.owlCarousel({
            margin: 30,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: "",
            responsive: {
                0: {
                    margin: 0,
                    items: 1
                },
                768: {
                    margin: 10,
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        })
    }
};

/* Owl pro detail */
Hcode.OwlProDetail = function () {
    if ($(".owl-thumb-pro").exists()) {
        $('.owl-thumb-pro').owlCarousel({
            items: 4,
            lazyLoad: false,
            mouseDrag: true,
            touchDrag: true,
            margin: 10,
            smartSpeed: 250,
            nav: false,
            dots: false
        });
        $('.prev-thumb-pro').click(function () {
            $('.owl-thumb-pro').trigger('prev.owl.carousel');
        });
        $('.next-thumb-pro').click(function () {
            $('.owl-thumb-pro').trigger('next.owl.carousel');
        });
    }
};

/* Cart */
Hcode.Cart = function () {
    $("body").on("click", ".addcart", function () {

        var tms = $(this).data("tms");
        if (tms == 1) {
            // size màu sắc có giá
            var mau = ($('.ds_sm-pro-detail.active').data("color")) ? $('.ds_sm-pro-detail.active').data("color") : 0;
            var size = ($('.ds_sm-pro-detail.active').data("size")) ? $('.ds_sm-pro-detail.active').data("size") : 0;
        } else {
            // size màu sắc không có giá
            var mau = ($("input[name=color-pro-detail]:checked").val()) ? $("input[name=color-pro-detail]:checked").val() : 0;
            var size = ($("input[name=size-pro-detail]:checked").val()) ? $("input[name=size-pro-detail]:checked").val() : 0;
        }

        var id = $(this).data("id");

        var action = $(this).data("action");
        var quantity = ($(".qty-pro").val()) ? $(".qty-pro").val() : 1;

        if (id) {
            $.ajax({
                url: 'ajax/ajax_cart.php',
                type: "POST",
                dataType: 'json',
                async: false,
                data: { cmd: 'add-cart', id: id, mau: mau, size: size, quantity: quantity },
                success: function (result) {
                    if (action == 'addnow') {
                        $('.cart-header p span.cart-header-span').html(result.max);
                        $('.cart-header p span.money-header-span').html(result.allprice);
                        $('.cart-fixed span').html(result.max);
                        var image = '';
                        if (result.image == null) {
                            image = noimage;
                        } else {
                            image = result.image;
                        }
                        var $info = '<div class="row"><div class="col-xs-12"><p class="jGowl-text">' + LANG['them_sanpham_gh_thanhcong'] + '</p></div><div class="col-sm-4 col-xs-4"><a href="' + result.url + '"><img width="70px" src="' + image + '" alt="' + result.title + '"/></a></div><div class="col-sm-8 col-xs-8"><div class="jGrowl-note"><a class="jGrowl-title" href="' + result.url + '">' + result.title + '</a><ins>' + result.price + '' + ' đ' + '</ins></div></div></div>';
                        var wait = setTimeout(function () {
                            $.jGrowl($info, {
                                life: 2000
                            });
                        });
                    } else if (action == 'buynow') {
                        window.location = CONFIG_BASE + "gio-hang";
                    }
                }
            });
        }
    });

    $("body").on("click", ".del-procart", function () {
        if (confirm(LANG['delete_product_from_cart'])) {
            var code = $(this).data("code");
            var ship = $(".price-ship").val();
            var ma = $('#tenmagiamgia').val();

            $.ajax({
                type: "POST",
                url: 'ajax/ajax_cart.php',
                dataType: 'json',
                data: { cmd: 'delete-cart', code: code, ship: ship, ma: ma },
                success: function (result) {
                    $('.count-cart').html(result.max);
                    if (result.max) {

                        $(".procart-" + code).remove();
                        $('.show_tb_magiamgia').html(result.gg_Text);
                        $('.load-price-total').html(result.totalText);
                        $('.load-tiengiam').html(result.tgiam);
                        $('.load-price-total-last').html(result.totalTextlast);
                        $('.money-header-span').html(result.totalText);
                    } else {
                        $(".wrap-cart").html('<a href="" class="empty-cart text-decoration-none"><i class="fa fa-cart-arrow-down"></i><p>' + LANG['no_products_in_cart'] + '</p><span>' + LANG['back_to_home'] + '</span></a>');
                    }
                }
            });
        }
    });
    
    $("body").on("click", ".counter-procart", function () {
        var $button = $(this);
        var input = $button.parent().find("input");
        var id = input.data('pid');
        var code = input.data('code');
        var color = input.data('color');
        var size = input.data('size');
        var ma = ($('#tenmagiamgia').val()) ? $('#tenmagiamgia').val() : '';
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") quantity = parseFloat(oldValue) + 1;
        else if (oldValue > 1) quantity = parseFloat(oldValue) - 1;
        $button.parent().find("input").val(quantity);
        update_cart(id, code, quantity, size, color, ma);
    });

    $("body").on("change", "input.quantity-procat", function () {
        var quantity = $(this).val();
        var id = $(this).data("pid");
        var code = $(this).data("code");
        var color = $(this).data('color');
        var size = $(this).data('size');
        var ma = ($('#tenmagiamgia').val()) ? $('#tenmagiamgia').val() : '';
        update_cart(id, code, quantity, size, color, ma);
    });

    if ($(".select-city-cart").exists()) {
        $(".select-city-cart").change(function () {
            var id = $(this).val();
            load_district(id);
            load_ship();
        });
    }

    if ($(".select-district-cart").exists()) {
        $(".select-district-cart").change(function () {
            var id = $(this).val();
            load_wards(id);
            load_ship();
        });
    }

    if ($(".select-wards-cart").exists()) {
        $(".select-wards-cart").change(function () {
            var id = $(this).val();
            load_ship(id);
        });
    }

    if ($(".payments-label").exists()) {
        $(".payments-label").click(function () {
            var payments = $(this).data("payments");
            $(".payments-cart .payments-label, .payments-info").removeClass("active");
            $(this).addClass("active");
            $(".payments-info-" + payments).addClass("active");
        });
    }

    $("body").on("click", ".color-pro-detail", function () {
        $(this).parent().find(".color-pro-detail").removeClass("active");
        $(this).addClass("active");
    });

    $("body").on("click", ".size-pro-detail", function () {
        $(".size-pro-detail").removeClass("active");
        $(this).addClass("active");
        var id_size = $("input[name=size-pro-detail]:checked").val();
        var changeprice = $(this).data("changeprice");
        if (changeprice == 1) {
            $.ajax({
                url: 'ajax/ajax_sizes.php',
                type: "POST",
                dataType: 'html',
                data: { id_size: id_size },
                success: function (result) {
                    if (result != '') {
                        $('.price-content-pro-detail').html(result);
                    }
                }
            });
        }
    });

    $("body").on("click", ".btn-huydh", function () {
        var id = $(this).data("id");
        $.ajax({
            url: 'ajax/ajax_cart.php',
            type: "POST",
            dataType: 'html',
            data: { cmd: 'cancel-order', id: id },
            success: function (result) {
                if (result == 1) {
                    // $("a.btn-huydh[data-id=" + id + "]").html(LANG['dahuy_don']);
                    $("a.btn-huydh[data-id=" + id + "]").remove();
                    $(".tinhtiendonhangtt span[data-id=" + id + "]").html(LANG['dahuy_don']);
                }
                if (result == 0) {
                    $("a.btn-huydh[data-id=" + id + "]").html(LANG['khongthehuy_don']);
                }
            }
        });

    });

    $("body").on("click", ".ab_pro a.like_product", function () {
        var id = $(this).data("id");
        var login = $(this).data("login");
        if (login == 1) {
            $(this).parent().parent().parent().parent().find(".img_pro").append('<div class="thongbaolike">' + LANG['chua_dang_nhap'] + '</div>');
            setTimeout(function () { $('.thongbaolike').remove(); }, 2000);
        } else {
            $.ajax({
                url: 'ajax/ajax_like.php',
                type: "POST",
                dataType: 'html',
                data: { id: id },
                success: function (result) {
                    if (result == 1) {
                        $("a.like_product[data-id=" + id + "]").addClass("liked");
                    }
                    if (result == 2) {
                        $("a.like_product[data-id=" + id + "]").removeClass('liked');
                    }
                }
            });
        }
    });


    $("body").on("click", ".quantity-pro-detail span", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 1) var newVal = parseFloat(oldValue) - 1;
            else var newVal = 1;
        }
        $button.parent().find("input").val(newVal);
    });

    $(".payment_bg input").click(function () {
        $(".payment_bg .desc-payments").addClass("hide");
        $(".payment_bg .desc-" + $(this).val()).removeClass("hide");
    });

    $("body").on("click", ".kiemtrama", function () {
        var ma = $('#tenmagiamgia').val();
        if (ma == '') {
            $('.show_tb_magiamgia').html(LANG['ban_chua_nhap_ma']);
            $('#tenmagiamgia').focus();
        } else {
            $.ajax({
                url: 'ajax/ajax_cart.php',
                type: "POST",
                dataType: 'json',
                async: false,
                data: { cmd: 'check-ma', ma: ma },
                success: function (result) {
                    if (result != '') {
                        $('.show_tb_magiamgia').html(result.gg_Text);
                        $('.load-price-total').html(result.totalText);
                        $('.load-tiengiam').html(result.tgiam);
                        $('.load-price-total-last').html(result.totalTextlast);
                    }
                }
            });
        }

    });
};
/* Cart */


Hcode.view_product = function () {
    $("body").on("click", ".btn_c", function () {
        var $button = $(this);
        var input = $button.parent().find("input");
        var id = input.data('pid');
        var code = input.data('code');
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") quantity = parseFloat(oldValue) + 1;
        else if (oldValue > 1) quantity = parseFloat(oldValue) - 1;
        $button.parent().find("input").val(quantity);
        //update_cart(id,code,quantity);
    });
    $("body").on("click", ".view_product", function () {
        var id = $(this).data("id");
        if (id) {
            $.ajax({
                url: 'ajax/ajax_view_product.php',
                type: "POST",
                async: false,
                data: { id: id },
                success: function (result) {
                    $("#popup-view_product .modal-body").html(result);
                    $('#popup-view_product').modal('show');
                    MagicZoom.refresh("Zoom-1");
                    Hcode.OwlProDetail();
                }
            });
        }
    });
};
/* slider */
Hcode.slider = function () {
    if ($(".slider").exists()) {
        var jssor_1_SlideshowTransitions = [{
            $Duration: 800,
            $Opacity: 2
        }, {
            $Duration: 800,
            x: 0.3,
            $During: {
                $Left: [0.3, 0.7]
            },
            $Easing: {
                $Left: $Jease$.$InCubic,
                $Opacity: $Jease$.$Linear
            },
            $Opacity: 2
        }, {
            $Duration: 800,
            x: -0.3,
            $Rows: 2,
            $SlideOut: true,
            $ChessMode: {
                $Row: 3
            },
            $Easing: {
                $Left: $Jease$.$InCubic,
                $Opacity: $Jease$.$Linear
            },
            $Opacity: 2
        }, {
            $Duration: 800,
            x: -0.2,
            $Delay: 40,
            $Cols: 12,
            $During: {
                $Left: [0.4, 0.6]
            },
            $SlideOut: true,
            $Formation: $JssorSlideshowFormations$.$FormationStraight,
            $Assembly: 260,
            $Easing: {
                $Left: $Jease$.$InOutExpo,
                $Opacity: $Jease$.$InOutQuad
            },
            $Opacity: 2,
            $Outside: true,
            $Round: {
                $Top: 0.5
            },
            $Brother: {
                $Duration: 800,
                x: 0.2,
                $Delay: 40,
                $Cols: 12,
                $Formation: $JssorSlideshowFormations$.$FormationStraight,
                $Assembly: 1028,
                $Easing: {
                    $Left: $Jease$.$InOutExpo,
                    $Opacity: $Jease$.$InOutQuad
                },
                $Opacity: 2,
                $Round: {
                    $Top: 0.5
                },
                $Shift: -200
            }
        }, {
            $Duration: 500,
            $Delay: 12,
            $Cols: 10,
            $Rows: 5,
            $Opacity: 2,
            $Clip: 15,
            $SlideOut: true,
            $Formation: $JssorSlideshowFormations$.$FormationStraightStairs,
            $Assembly: 2049,
            $Easing: $Jease$.$OutQuad
        }, {
            $Duration: 500,
            $Delay: 12,
            $Cols: 10,
            $Rows: 5,
            $Opacity: 2,
            $Clip: 15,
            $Formation: $JssorSlideshowFormations$.$FormationStraightStairs,
            $Assembly: 2050,
            $Easing: {
                $Clip: $Jease$.$InSine
            }
        }, {
            $Duration: 500,
            x: 1,
            $Delay: 40,
            $Cols: 10,
            $Rows: 5,
            $Easing: {
                $Left: $Jease$.$InCubic,
                $Opacity: $Jease$.$OutQuad
            },
            $Opacity: 2
        }, {
            $Duration: 1500,
            x: 0.3,
            y: -0.3,
            $Delay: 20,
            $Cols: 10,
            $Rows: 5,
            $Opacity: 2,
            $Clip: 15,
            $During: {
                $Left: [0.2, 0.8],
                $Top: [0.2, 0.8]
            },
            $Formation: $JssorSlideshowFormations$.$FormationStraightStairs,
            $Assembly: 260,
            $Easing: {
                $Left: $Jease$.$InJump,
                $Top: $Jease$.$InJump,
                $Clip: $Jease$.$OutQuad
            },
            $Round: {
                $Left: 0.8,
                $Top: 2.5
            }
        }];
        var jssor_1_options = {
            $Idle: 3000,
            $AutoPlay: 1,
            $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $Transitions: jssor_1_SlideshowTransitions,
                $TransitionsOrder: 1
            },
            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
            },
            $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
            }
        };
        var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
        var MAX_WIDTH = 10000;

        function ScaleSlider() {
            var containerElement = jssor_1_slider.$Elmt.parentNode;
            var containerWidth = containerElement.clientWidth;
            if (containerWidth) {
                var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
                jssor_1_slider.$ScaleWidth(expectedWidth);
            } else {
                window.setTimeout(ScaleSlider, 30);
            }
        }
        ScaleSlider();
        $Jssor$.$AddEvent(window, "load", ScaleSlider);
        $Jssor$.$AddEvent(window, "resize", ScaleSlider);
        $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    }
};

/* Fix menu */
Hcode.FixMenu = function () {
    $(window).scroll(function () {
        var get_height = $('header').height();
        if ($(window).scrollTop() >= get_height) {
            $(".menu").css({ position: "fixed", left: '0px', right: '0px', top: '0px', zIndex: '999' });
            $('.menu').addClass('fadeInDown animated');
            $('header').css({ 'height': get_height });
        } else {
            $(".menu").css({ position: "relative", zIndex: '9' });
            $('.menu').removeClass('fadeInDown animated');
            $('header').css({ 'height': 'auto' });
        }
    });
};

Hcode.menu_reponsive = function () {
    if ($("#responsive-menu").exists()) {
        $menu = $("#main-nav").clone();
        $menu.removeAttr("id");
        $menu.removeAttr("class");
        $menu.find(".no-index").remove();
        $("#responsive-menu .content").append($menu);
        $("#responsive-menu .content").append('<div class="clearfix"></div>');
        $menu = $("#responsive-menu .content ul");
        $menu.find("li").each(function () {
            if ($(this).find("ul").length) {
                $(this).addClass("has-child");
                $(this).find("a").first().append("<span class='toggle-menu'><i class='fal fa-plus'></i></span>");
            }
        });
        $("#responsive-menu .toggle-menu").click(function () {
            if (!$(this).hasClass("active")) {
                $(this).find("i").first().removeClass('fa-plus');
                $(this).find("i").first().addClass('fa-minus');
                $(this).parent().parent().find("ul").first().slideDown();
                $(this).addClass("active");
            } else {
                $(this).find("i").first().removeClass('fa-minus');
                $(this).find("i").first().addClass('fa-plus');
                $(this).parent().parent().find("ul").first().slideUp();
                $(this).removeClass("active");
            }
            return false;
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $('.title-rpmenu').addClass('fixed fadeInDown animated');
                $('#responsive-menu').addClass('ctop ');
            } else {
                $('.title-rpmenu').removeClass('fixed fadeInDown animated');
                $('#responsive-menu').removeClass('ctop');
            }
        });
        var show = 0;
        $('a.searchrp').click(function () {
            if (show == 1) {
                $('.form-row-searchrp').css({ 'width': 0 });
                $('.search-formrp').css({ 'width': 0, 'opacity': 0 });
                $('a.searchrp').removeClass('active');
                show = 0;
                var keyword = $('#keywordrp').val();
                if (keyword != '') {
                    window.location.href = "tim-kiem?keyword=" + keyword;
                    return false;
                }
            } else {
                $('.form-row-searchrp').css({ 'width': '100%' });
                if ($(window).width() <= 1100) {
                    $('.search-formrp').css({ 'width': 200, 'opacity': 1 });
                } else {
                    $('.search-formrp').css({ 'width': 200, 'opacity': 1 });
                }
                $('a.searchrp').addClass('active');
                document.getElementById("frm_searchrp").reset();
                show = 1;
            }
        });
    }
};

Hcode.label_input = function () {

    $("input").change(function () {
        var vr = $(this).val();
        if (vr != '') {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    });
    $("textarea").change(function () {
        var vr = $(this).val();
        if (vr != '') {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    });
};
Hcode.loaderwrapper = function () {
    if ($("#loader-wrapper").exists()) {
        setTimeout(function () {
            $("#loader-wrapper").addClass('show1')
        }, 1000);
        setTimeout(function () {
            $('#loader-wrapper').remove()
        }, 3000);
    }
};
Hcode.search_filter = function () {
    if ($(".select2").exists()) {
        $('.select2').select2();
    }
    if ($(".box-search").exists()) {

        $(".btn_search").click(function () {
            $id_list = "";
            $ngaygiaohang = "";
            $mod_postcode = "";
            $url = "";
            $fall = 0;

            $ngaygiaohang = $("#ngaygiaohang").val();
            $id_list = $("#id_list").val();
            $mod_postcode = $("#mod_postcode").val();

            if ($ngaygiaohang != undefined && $ngaygiaohang != "") {
                $url += "ngaygiao=" + $ngaygiaohang + "&";
            }
            if ($id_list != undefined && $id_list != "" && $id_list > 0) {
                $url += "id_l=" + $id_list + "&";
                $fall = 1;
            }
            if ($mod_postcode != undefined && $mod_postcode != "" && $mod_postcode > 0) {
                $url += "pc=" + $mod_postcode + "&";
                $fall = 1;
            }
            if ($fall == 0) {
                alert(LANG['ban_chua_chon_truong_nao']);
            } else {
                var $newurl = $url.substring(0, $url.length - 1);
                window.location.href = "search-gift?" + $newurl;
            }
            return false;
        });
    }
    if ($(".row_fiter").exists()) {

        $("#sort-product").change(function () {
            Hcode.load_filter();
        });
        $("#filter-list").change(function () {
            Hcode.load_filter();
        });
        $("#filter-size").change(function () {
            Hcode.load_filter();
        });
        $("#filter-color").change(function () {
            Hcode.load_filter();
        });

    }
};

Hcode.load_filter = function () {
    if ($(".row_fiter").exists()) {
        var com_product = $("#com-product").val();
        var sort = $("#sort-product").val();
        var idl_filter = $("#idl-filter").val();
        var idc_filter = $("#idc-filter").val();
        var idi_filter = $("#idi-filter").val();
        var list_filter = $("#filter-list").val();
        var size_filter = $("#filter-size").val();
        var color_filter = $("#filter-color").val();
        var input_keyword = $("#keyword").val();
        $url = "";
        if (sort != undefined && sort != "") {
            $url += "s=" + sort + "&";
        }
        if (idl_filter != undefined && idl_filter != "") {
            $url += "s1=" + idl_filter + "&";
        } else {
            if (list_filter != undefined && list_filter != "") {
                $url += "s1=" + list_filter + "&";
            }
        }
        if (idc_filter != undefined && idc_filter != "") {
            $url += "s2=" + idc_filter + "&";
        }
        if (idi_filter != undefined && idi_filter != "") {
            $url += "s3=" + idi_filter + "&";
        }
        if (size_filter != undefined && size_filter != "" && size_filter > 0) {
            $url += "ss=" + size_filter + "&";
        }
        if (color_filter != undefined && color_filter != "" && color_filter > 0) {
            $url += "sc=" + color_filter + "&";
        }
        if (com_product == 'tim-kiem' && input_keyword != undefined && input_keyword != '') {
            var $url = com_product + "?keyword=" + input_keyword + "&" + $url;
        } else {
            var $url = com_product + "?" + $url;
        }

        var $newurl = $url.substring(0, $url.length - 1);
        window.location.href = $newurl;
        return false;
    }
};
Hcode.show_menuuser = function () {

    if ($(".name-account").exists()) {
        $(".name-account").click(function () {
            $("#info-account").slideToggle();
        });
    }
    if ($(".lang-header").exists()) {
        $(".lang-header span").click(function () {
            $(".slideTogglelangheader").slideToggle();
        });
    }
    if ($(".btn-xemttdh").exists()) {
        $(".btn-xemttdh").click(function () {
            var id = $(this).data("id");
            $(".thongtingiaohang[data-id=" + id + "]").slideToggle();
        });
    }

    if ($(".title_lichsu i.btn-andsdh").exists()) {
        $(".title_lichsu i.btn-andsdh").click(function () {
            var id = $(this).data("id");
            $(".cthdsl[data-id=" + id + "]").slideToggle();
        });
    }
};
/*danh gia sao*/

Hcode.rate_start = function () {
    if ($("#rate").exists()) {
        $('#rate').raty({
            half: false,
            path: null,
            single: false,
            starHalf: 'assets/images/star-half-big.png',
            starOff: 'assets/images/star-off-big.png',
            starOn: 'assets/images/star-on-big.png',
            score: function () {
                return $(this).attr('data-score');
            },
            click: function (score, evt) {

                $('#RatingCmt button.btn-send').hide();
                $('#RatingCmt button.btn-remove').show();
                $('#RatingCmt .box-rating').slideDown(500);
                $('.score_input').val(score);
            }
        });
    }
    if ($(".avgrating").exists()) {
        $('.avgrating').click(function (event) {
            $('html, body').animate({
                scrollTop: $("#RatingCmt").offset().top - 100
            }, 500);
        });
    }
    if ($("#RatingCmt button.btn-send").exists()) {
        $('#RatingCmt button.btn-send').click(function (event) {
            $('#RatingCmt .box-rating').slideDown(500);
            $(this).hide();
            $('#RatingCmt button.btn-remove').show();
        });
    }
    if ($("#RatingCmt button.btn-remove").exists()) {
        $('#RatingCmt button.btn-remove').click(function (event) {
            $('#rate-ct').val('');
            $(this).hide();
            $('#RatingCmt .box-rating').slideUp(500);
            $('#RatingCmt button.btn-send').show();
        });
    }
    if ($("#RatingCmt .box-rating button").exists()) {
        $('#RatingCmt .box-rating button').click(function (event) {
            var hoten = $('#name-rate').val();
            dienthoai = $('#dienthoai-rate').val();
            email = $('#email-rate').val();
            noidung = $('#rate-ct').val();
            $loi_rate = 0;
            if (hoten == '') {
                alert(LANG['vuilongnhap_hoten']);
                $('#name-rate').focus();
                $loi_rate = 1;
            } else if (dienthoai == '') {
                alert(LANG['vuilongnhap_sodienthoai']);
                $('#dienthoai-rate').focus();
                $loi_rate = 1;
            } else if (email == '') {
                alert(LANG['vuilongnhap_diachiemail']);
                $('#name-rate').focus();
                $loi_rate = 1;
            } else if (noidung == '') {
                alert(LANG['vuilongnhap_noidung']);
                $('#rate-ct').focus();
                $loi_rate = 1;
            }
            if ($loi_rate == 0) {
                $.ajax({
                    url: 'ajax/ajax_rating.php',
                    type: 'POST',
                    data: new FormData($('#form_rating')[0]),
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        $('.loaddingding').addClass('show');
                    },
                    success: function (data) {
                        $('.loaddingding').removeClass('show');
                        if (data == 1) {
                            location.reload();
                        } else if (data == 2) {
                            $('#RatingCmt .box-rating').slideUp(500);
                            swal(LANG['camon_danhgia'], "success");
                        } else {
                            swal(LANG['danhgia_khongthanhcong'], "error");
                        }
                        $('#rate-ct').val('');
                        $('#RatingCmt button.btn-remove').hide();
                        $('#RatingCmt button.btn-send').show();
                        $('.jFiler-items').remove();
                    }
                });
            }
        });
    }
};

// effect run
$(window).bind("load resize", function () {
    if ($(".effect-run").exists()) {
        var api = $(".effect-run").peShiner({
            api: true,
            paused: true,
            reverse: true,
            repeat: 1,
            color: 'white'
        });

        api.resume();
    }
});
Hcode.checkdichvu = function(){
   $("body").on("click", ".btn-themdichvu", function () {
        if($('.box-choose-combo').hasClass('open'))
        {
            $('.box-choose-combo').removeClass('open');
        }
        else
        {
            $('.box-choose-combo').addClass('open');
        }
    });
    $("body").on("click", ".li-combo p.choose-combo", function () {
        var id=$(this).attr('data-id');
        if($(this).hasClass('check'))
        {
            $(this).removeClass('check');
            $(this).find('i').removeClass('fa-check-square');
            $(this).find('i').addClass('fa-square');
            $(this).find('input').remove();
        }
        else
        {
            $(this).addClass('check');
            $(this).find('i').removeClass('fa-square');
            $(this).find('i').addClass('fa-check-square');
            $(this).append('<input type="hidden" name="combo_checkeds[]"  value="'+id+'">');
        }
        Hcode.ajaxcheckgiadichvu();
    });

};
Hcode.ajaxcheckgiadichvu = function(){
    var array_value = [];
    if ($(".choose-combo.check").exists()) {
        $(".choose-combo.check").each(function () {
            var id = $(this).data("id");
            var name = $(this).data("name");
            var object_vl={
                id:id,
                name:name
            }
            array_value.push(object_vl);
        })
        $.ajax({
            url: 'ajax/ajax_dichvu.php',
            type: "POST",
            dataType: 'json',
            async: false,
            data: { array_value: array_value },
            success: function (result) {
                $('.box-choose-combo-bottom span').html(result.tongtien);
                $('.tongtiendichvu span').html(result.tongtien);
                $('.box-dichvu-choose').html(result.ten);
            }
        });
    }else{
        $('.box-choose-combo-bottom span').html('');
        $('.tongtiendichvu span').html('0 $');
        $('.box-dichvu-choose').html('');
    }
};
/* Ready */
$(document).ready(function () {
    Hcode.loaderwrapper();
    Hcode.Tools();
    Hcode.Popup();
    Hcode.WowAnimation();
    Hcode.AltImages();
    Hcode.BackToTop();
    Hcode.OwlPage();
    Hcode.OwlProDetail();
    Hcode.Toc();
    Hcode.Cart();
    Hcode.SimplyScroll();
    Hcode.Tabs();
    Hcode.Videos();
    Hcode.Photobox();
    Hcode.Search();
    Hcode.DatetimePicker();
    Hcode.slider();
    // Hcode.FixMenu();
    /*moi*/
    Hcode.menu_reponsive();
    Hcode.view_product();
    Hcode.label_input();
    Hcode.show_menuuser();
    Hcode.rate_start();
    Hcode.search_filter();
    Hcode.fancybox_Xuhuong();
    Hcode.checkdichvu();
    $("body").on("change", "#dichvu-datlich", function () {
        var id = $(this).val();
        $.ajax({
            type: "POST",
            url: 'ajax/ajax_dichvu.php',
            dataType: 'json',
            data: {  id: id },
            success: function (result) {
                $('.tongtiendichvu span').html(result.tongtien);
            }
        });
    });
});