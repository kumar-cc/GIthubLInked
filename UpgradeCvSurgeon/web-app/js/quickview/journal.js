/*
	Journal - Premium & Responsive OpenCart Theme
	Version 1.8.1
	Copyright (c) 2013 Digital Atelier
	http://journal.digital-atelier.com/
	--
	MAIN JS FILE
*/
try {
// cart hover
function add_cart_hover() {
	var $cart = $('#cart');
	var timeout;
	$('section.cart').die('mouseover').die('click').live('mouseover', function() {
		if ($cart.hasClass('journal-active')) return false;

		$cart.addClass('journal-active');

		if ($('html').hasClass('ie8') || $('html').hasClass('safari5')) {
			$cart.addClass('active');
		}

		$cart.topZIndex();

		$cart.load('index.php?route=module/cart #cart > *', function() {
			if (!$cart.hasClass('journal-active')) return false;
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				$cart.addClass('active');
				$cart.topZIndex();
				$('#cart .content').topZIndex();
			}, 100);
		});
	});
	$cart.die('mouseleave').live('mouseleave', function(){
		clearTimeout(timeout);
		$cart.removeClass('active').removeClass('journal-active');
	});
}

// overwrite add to cart click
function add_cart_click() {
	var $cart = $('#cart');
	if ($('.android').length) {
		$("#cart").click(function(){
			parent.window.location = "index.php?route=checkout/cart";
		});
		return;
	}
	var timeout;
	$('#cart .heading a').die('mouseover').die('click').live('click', function() {
		if ($cart.hasClass('active')) {
			clearTimeout(timeout);
			$cart.removeClass('active');
		} else {
			$cart.load('index.php?route=module/cart #cart > *', function() {
			timeout = setTimeout(function(){
				$cart.addClass('active');
				$cart.topZIndex();
			}, 100);
		});
		}
	});
	$cart.die('mouseleave');
}

/* override functions for custom notifications */
function addToCart(product_id, quantity) {
	quantity = typeof(quantity) != 'undefined' ? quantity : 1;
	$.ajax({
		url: 'index.php?route=checkout/cart/add',
		type: 'post',
		data: 'product_id=' + product_id + '&quantity=' + quantity,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information, .error').remove();

			if (json['redirect']) {
				location = json['redirect'];
			}

			if (json['success']) {
				if (typeof(custom_notifier) == "function") {
					custom_notifier(json['success']);
				} else {
					$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
					$('.success').fadeIn('slow');
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}

				$('#cart-total').html(json['total']);
			}
		}
	});
}
function addToWishList(product_id) {
	$.ajax({
		url: 'index.php?route=account/wishlist/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();

			if (json['success']) {
				if (typeof(custom_notifier) == "function") {
					custom_notifier(json['success']);
				} else {
					$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
					$('.success').fadeIn('slow');
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}

				$('#wishlist-total').html(json['total']);
			}
		}
	});
}

function addToCompare(product_id) {
	$.ajax({
		url: 'index.php?route=product/compare/add',
		type: 'post',
		data: 'product_id=' + product_id,
		dataType: 'json',
		success: function(json) {
			$('.success, .warning, .attention, .information').remove();

			if (json['success']) {
				if (typeof(custom_notifier) == "function") {
					custom_notifier(json['success']);
				} else {
					$('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
					$('.success').fadeIn('slow');
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}

				$('#compare-total').html(json['total']);
			}
		}
	});
}

function place_super_menu_divider() {
	$('.mega-menu-divider').remove();
	var n = WIDE_LAYOUT ? 5 : 4;
	if ($(window).width() < 1220) n = 4;
	if ($(window).width() < 980) n = 3;
	if ($(window).width() < 760) return;
	$('.mega-menu').each(function(){
		var row = 0;
		var i = 0;
		$(this).find('.mega-menu-item').each(function(){
			$(this).attr('data-row', row);
			i++;
			if (i == n) {
				$(this).after($('<div class="mega-menu-divider"></div>'));
				i=0;
				row++;
			}
		});
		row++;
		for (var i=0; i<row; i++) {
			var max = 0;
			var max2 = 0;
			$(this).find('.mega-menu-item[data-row=' + i + ']').each(function(){
				max = Math.max(max, $(this).attr('data-height'));
			});
			$(this).find('.mega-menu-item[data-row=' + i + ']').each(function(){
				$(this).css('height', parseInt(max) + 20);
			});
			// if($('html').hasClass('ipad')) {
			// 	console.log(max2);
			// 	$(this).css('height', 28 * max2 + 'px');
			// 	// $(this).find('.mega-menu-item').css('min-height', 28 * max2 + 'px');
			// }
		}
	});
}

$(function(){
	var isIPad = $('html').hasClass('ipad');
	$('.mega-menu-item').each(function(){
		if (isIPad) {
			$(this).attr('data-height', $('> ul > li', this).length * 25);
		} else {
			$(this).attr('data-height', $(this).height());	
		}
		// console.log('data-height: ' + $(this).attr('data-height'));
	});
	place_super_menu_divider();
	$(window).resize(function(){
		place_super_menu_divider();
	});
});

//responsive
function responsive_980() {
	if( $(window).width() < 980 && responsive_design ){
		$('.product-info .image a').removeClass('zoom').addClass('colorbox');
		$('#journal-header .cart').before($('#journal-header .welcome'));
		$('#journal-header .cart').before($('#journal-header #search'));
		$('.top-row').after($('.fb'));
		$('.fb-box').hide();
		add_cart_click();
	} else {
		$('#journal-header #search').before($('#journal-header .cart'));
		$('#journal-header .welcome').before($('#journal-header .cart'));
		$('.fb-box').show();
		$('.fb').appendTo($('.fb-box'));
		add_cart_hover();
	}
}

function responsive_980_android() {
	if( $(window).width() < 980 && responsive_design ){
		$('.product-info .image a').removeClass('zoom').addClass('colorbox');
		$('#journal-header .cart').before($('#journal-header .welcome'));
		$('.top-row').after($('.fb'));
		$('.fb-box').hide();
		add_cart_click();
	} else {
		$('#journal-header .welcome').before($('#journal-header .cart'));
		$('.fb-box').show();
		$('.fb').appendTo($('.fb-box'));
		add_cart_hover();
	}
}

function responsive_760(){
	if (!responsive_design) return;
	$('#menu > ul li.open').unbind('click');
	if( $(window).width() < 760 ){
		enable_mobile_menu();

		$('.login-content .left').before($('.login-content .right'));
		$('#powered div p').appendTo( $('#powered div'));
		return;
	}
	disable_mobile_menu();
	$('.login-content .right').before($('.login-content .left'));
}

function responsive_470(){
	if( $(window).width() < 470 ){
		$('.checkout-product tfoot tr td:first-child').each(function(){
			$(this).attr('colspan','3');
		});
		$('.top-links a').each(function(){
			if ($(this).find('img').length > 0) {
				$(this).find('span').hide();
			}
		});
	} else{
		$('.checkout-product tfoot tr td:first-child').each(function(){
			$(this).attr('colspan','4');
		});
		$('.top-links a').each(function(){
			if ($(this).find('img').length > 0) {
				$(this).find('span').show();
			}
		});
	}
}

(function($){

	// add responsive class if enabled
	if (responsive_design) {
		$('html').addClass('responsive');
		$(function(){
			if ($('html').hasClass('android')) {
				responsive_980_android();
			}else{
				responsive_980();
			}
			responsive_760();
			responsive_470();
		});
		$(window).resize(function(){
			//mega-menu dropdown
			$('.dropdown-menu').each(function() {
				var x = $('#super-menu > ul > li').not(".open").width() + "px";
				$(this).css("min-width", x);
			});
			if ($('html').hasClass('android')) {
				responsive_980_android();
			}else{
				responsive_980();
			}
			responsive_760();
			responsive_470();
		});

	} else {
		$(function(){
			add_cart_hover();
		});
	}

})(jQuery);

(function($){


	//hide preloader
	$(window).load(function(){
		$(".loader").fadeOut(250);
	});

	$(function(){

		/* change first and last links on pagination */
		(function(){
			var $pag_first_link = $('.pagination .links a:first-child');
			if ($pag_first_link.html() === '|&lt;') {
			}
			var $pag_last_link = $('.pagination .links a').last();
			if ($pag_last_link.html() === '&gt;|') {
				$pag_last_link.html('&#187;');
			}
		})();

		/* products image effects */
		(function(){
			var $img = $('#image');
			if (!$img.length) return;
			var options = {};

			/* global options */
			options.cursor = "pointer";

			if (CLOUD_ZOOM_TYPE === "inner") {
				/* inner options */
				options.zoomType = "inner";
			} else {

			}

			if (!$('html').hasClass('mobile')){
				if ($img.elevateZoom) {
					$img.elevateZoom(options);
				}

			}

			$('.product-info .image-additional a').click(function(e){
				var $img = $('#image');
				if (!$img.length) return false;
				/* change big thumb */
				$img.attr('src', $(this).attr('href'));
				$img.parent().attr('href', $(this).attr('href'));
				/* change zoom image */
				if (!$('html').hasClass('mobile')){
					$img.data('elevateZoom').swaptheimage($(this).attr('href'), $(this).attr('href'));
				}
				return false;
			});

		})();

		/* enable swipebox gallery */
		(function(){
			if($('#swipebox .swipebox').length) {
				$('.zoomContainer, #cboxOverlay, #colorbox').remove();
				$('#first-a').click(function(e){
					if ($('html').hasClass('ie8')) {
						return false;
					}
					if($(e.target).is('#image')) {
						var url = $(this).attr('href');
						$('#swipebox a[href="' + url + '"]').first().click();
					}
					return false;
				});
			}
		})();

		if ($('.swipebox').length) {
			$('.swipebox').swipebox();
		}

		// /* journal gallery */
		// $('.journal-gallery').each(function(){
		// 	var $sb = $(this).find('.swipebox');
		// 	$sb.click(function(e, data){
		// 		console.log($('#swipebox-overlay').length);
		// 		if (data) return;
		// 		$('#swipebox-overlay').remove();
		// 		$sb.swipebox();
		// 		$(this).trigger('click', true);
		// 		return false;
		// 	});
		// 	// var imgs = [];
		// 	// $(this).find('.swipebox').each(function(){
		// 	// 	imgs.push({
		// 	// 		href: $(this).attr('href'),
		// 	// 		title: $(this).attr('title')
		// 	// 	});
		// 	// });
		// 	// $(this).find('.swipebox').click(function(){
		// 	// 	$.swipebox(imgs);
		// 	// 	console.log($.swipebox);
		// 	// 	return false;
		// 	// })
		// });

		// $('.swipebox').swipebox();

		/* opera menu fix */
		(function(){
			if ($('html').hasClass('opera')) {

				$('.sf-menu > li').each(function(){
             		$(this).hover( function(){
						$(this).height($('ul', this).height() + 300);
						$(this).css('background-color','transparent');
						$('> a', this).css({'background-color':'#ea2e49', 'height':'40px'});

				    },  function(){
				        $(this).height(40);
			    	    $('> a', this).css('background-color','transparent');
				    });

			    	$('.sf-menu > li > ul').css('top','40px');
				});

				$('#menu > ul').css('border-right', 'none !important');
				$('#menu > ul > li').addClass('noborder').each(function(){
					$(this).mouseover(function(){
						if ($(this).find('div').length) {
							$(this).attr('data-old-height', $(this).height());
							$(this).css('height', parseInt($(this).find('div').height()) + parseInt($(this).height()));
						}
					});
					$(this).mouseout(function(){
						$(this).css('height', $(this).attr('data-old-height'));
					});
				});
			}
		})();		

		/* disable default opencart cart event */
		$('#cart > .heading a').die('click');

		//add sequential class names to menu items
		$('.top-links a').each(function(i) {
			$(this).addClass('item'+(i+1));
		});

		$('#menu > ul > li > a, #menu .sf-menu > li a').each(function(i) {
			$(this).addClass('link'+(i+1));
		});

		$('#menu > ul > li > div ul li a').each(function(i) {
			$(this).addClass('sub-link'+(i+1));
		});

		//sort orders
		$('#cboxOverlay').topZIndex();
		$('#colorbox').topZIndex();
		$('#cboxWrapper > div:eq(1)').topZIndex();
		$('.loader').topZIndex();

		//positions
		$('#content .journal-slider, #content .slideshow, #content .banner').each(function(){ $('header').after($(this));});
		$('header').after($('.breadcrumb'));
		$('.home').parent().addClass('home-container');
		$('.tags a:empty').parent().hide();
		
		if (!$('html').hasClass('safari5')) {
			$('<div class="column-head"></div>').prependTo($('#column-right'));
			$('<div class="column-head"></div>').prependTo($('#column-left'));
			// side column full height background
			var cr = $('#column-right').parent();
			cr.prepend($('<div class="side-shade"></div>'));
			var cl = $('#column-left').parent();
			cl.prepend($('<div class="side-shade2"></div>'));
			var liActive = $('#column-right .box-content ul li a.active').parent();
			liActive.addClass('active');
			if ($('#column-right').length > 0){
				$('#column-left, .side-shade2').hide();
			}
		}
		
		$('#content h1').prependTo($('#content'));

		//Blog Manager
		$('.relProduct').css('width','');
		$('a.button span').contents().unwrap();
		$('.boxPlain').removeClass('boxPlain');
		$('#column-right .recentComments, #column-right .popularArticles, #column-right .recentArticles, #column-left .recentComments, #column-left .popularArticles, #column-left .recentArticles').parent().removeClass('box-content').addClass('box-product');
		$('#column-right .recentComments, #column-right .popularArticles, #column-right .recentArticles, #column-left .recentComments, #column-left .popularArticles, #column-left .recentArticles').each(function(){ $(this).addClass('prod');});
		$('#tab-related-article').appendTo( $('#content'));
		$('#tab-related-article > ul > li').each(function(){
			var a1 = $(this).find('a').first();
			var a2 = a1.next();
			a2.insertBefore(a1);
		});


		//categories menu flexible width
		$('#menu > ul > li > div > ul > li').each(function() {
			var x = $(this).parent().parent().parent().width() + "px";
			$(this).css("min-width", x);
			$('.-moz- #menu > ul > li > div > ul').css("width", x);
		});

		//super fish
		$('#menu .sf-menu > li ul').each(function() {
			var x = $('#menu .sf-menu > li').not(".open").width() + "px";
			$(this).css("min-width", x);
		});

		//mega-menu dropdown
		$('.dropdown-menu').each(function() {
			var x = $('#super-menu > ul > li').not(".open").width() + "px";
			$(this).css("min-width", x);
		});

		var xx = $('.super-menu > li').not(':has(.dropdown-menu, .mega-menu, .brands-menu, .product-menu)');
		xx.addClass('no-span');

		/* ie8 hover fix !*/
		$('.ie8 #menu > ul > li').hover(function(){
			$(this).find('div').css('filter', 'alpha(opacity=100)');
		}, function(){
			$(this).find('div').css('filter', 'alpha(opacity=0)');
		});

		//center additonal product images if < 6
		var count = $('.product-info .image-additional').children().length;
		if(count < 6){
		$('.product-info .image-additional').css('text-align','center');
		}

		//journal banners min-height
		count = $('.journal-boxes ul').children().length;
		if(count > 1){
		$('.journal-boxes ul').css('min-height','100px');
		}

		//product-over
		if (!$('html').hasClass('mobile')) {
			$('.journal-filter .product-grid > div > .image a, .box-product .image a').prepend($('<div class="product-over"></div>'));
		}

		$('#content .welcome + p').addClass('welcome-copy');

		//border for login screen
		$('<hr>').insertBefore($('.login-content .button'));

		if(!$('.breadcrumb').next().is($('#container'))){
			$('.breadcrumb').css('border','none');
		}
		$('.breadcrumb a').addClass('breadcrumbs');

		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('.back-top').fadeIn();
			} else {
				$('.back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('.back-top').click(function () {
			$('body, html').animate({
				scrollTop: 0
			}, 800, "easeInOutQuart");
			return false;
		});

		/* enable sale badge */
		if (DECIMAL_POINT === ',') {
			$.Calculation.setDefaults({
				// a regular expression for detecting European-style formatted numbers
				reNumbers: /(-?\$?)(\d+(\.\d{3})*(,\d{1,})?|,\d{1,})/g
				// define a procedure to convert the string number into an actual usable number
				, cleanseNumber: function (v){
				// cleanse the number one more time to remove extra data (like commas and dollar signs)
				// use this for European numbers: v.replace(/[^0-9,\-]/g, "").replace(/,/g, ".")
					return v.replace(/[^0-9,\-]/g, "").replace(/,/g, ".");
				}
			});
		}

		$('.price').each(function(){
			var $price_old = $(this).find('.price-old');
			var $price_new = $(this).find('.price-new');
			if ($price_old.length && $price_new.length) {
				var o = $price_old.parseNumber();
				var n = $price_new.parseNumber();
				var disc = Math.round((o - n) / o * 100);
				$(this).find('.sale').html('-' + disc + '%');
			}
		});

		$('#search input[type="text"]').live('keydown', function(e) {
			if (e.keyCode == 13) {
				url = $('base').attr('href') + 'index.php?route=product/search';

				var filter_name = $('#search input[type="text"]').attr('name');
				var filter_value = $('#search input[type="text"]').attr('value');

				if (filter_name && filter_value) {
					url += '&' + filter_name +'=' + encodeURIComponent(filter_value);
				}

				location = url;
			}
		});

		/* hide shopping cart on window resize */
		$(window).resize(function(){
			$("#cart").removeClass('active');
		});

		$.curCSS = $.css;

/*		if (!$('html').hasClass('mobile')) {
			$('#search input').autocompletesearch({
				serviceUrl: 'index.php?route=module/journal_cp/search_products',
				paramName: 'filter_name',
				onSelect: function (suggestion) {
					location = suggestion.data.href;
				},
				transformResult: function(response) {
					response = $.parseJSON(response);
					return {
						suggestions: $.map(response, function(dataItem) {
							return { value: dataItem.name, data: dataItem };
						})
					};
				}
			});
		}*/

		/* custom blocks animation */
		$('.custom-block-left .custom-block-icon').hoverIntent(function(){
			$(this).parent().stop().animate({'left' : '0px'});
		});

		$('.custom-block-left .custom-block-content').mouseleave(function(){
			var x = $(this).parent().width();
			$(this).parent().stop().animate({'left': 0 - x});
		});

		$('.custom-block-right .custom-block-icon').hoverIntent(function(){
			$(this).parent().stop().animate({'right' : '0px'});
		});

		$('.custom-block-right .custom-block-content').mouseleave(function(e){
			var y = $(this).parent().width();
			$(this).parent().stop().animate({'right' : 0 - y});
		});

		/* mega menu */
		$('.mega-menu-sub').hover(function(){
			$(this).closest('.mega-menu-item').find('img').attr('src', $(this).attr('data-img'));
		}, function(){
			$(this).closest('.mega-menu-item').find('img').attr('src', $(this).closest('.mega-menu-item').find('.mega-menu-top').attr('data-img'));
		});

		/* carousel */
		// $('.journal-carousel').each(function(){
		// 	var $this = $(this);
		// 	$this.attr('data-pos', 0);
		// 	$('<a class="prev"></a>').appendTo($this).click(function(){
		// 		var $box = $(this).parent();
		// 		var $item = $box.find('.box-product > div').first();
		// 		var $box_product = $(this).parent().find('.box-product');
		// 		var count = Math.floor($box.width() / $item.width());
		// 		var px = count * ($item.width() + parseInt($item.css('margin-right')));
		// 		var min = parseInt($box_product.css('left'));
		// 		px += 20;
		// 		px = Math.min(px, -min);
		// 		$box_product.animate({'left':'+=' + px}, 280);
		// 		return false;
		// 	});
		// 	$('<a class="next"></a>').appendTo($this).click(function(){
		// 		var $box = $(this).parent();
		// 		var $item = $box.find('.box-product > div').first();
		// 		var $box_product = $(this).parent().find('.box-product');
		// 		var count = Math.floor($box.width() / $item.width());
		// 		var passed = Math.floor(-parseInt($box_product.css('left')) / $item.width());
		// 		console.log(passed);
		// 		var px = count * ($item.width() + parseInt($item.css('margin-right')));
		// 		var min = parseInt($box_product.css('left'));
		// 		var max = ($box.find('.box-product > div').length - count) * ($item.width() + parseInt($item.css('margin-right')));
		// 		console.log(max, min-px);
		// 		px = Math.min(px, max-min);
		// 		px += 20;
		// 		$box_product.animate({'left':'-=' + px}, 280);
		// 		return false;
		// 	});
		// });
	});
})(jQuery);

var journal_mobile_events = false;


function enable_mobile_menu() {
	if (journal_mobile_events) return;
	journal_mobile_events = true;

	$('#menu > ul, #menu .sf-menu, .super-menu').addClass('mobile-nav');
	$('.mobile-nav a + ul, .mobile-nav a + div').addClass('menu-hide');

	var $li = $('#menu > ul > li, #super-menu > ul > li').not('.open').addClass('menu-hide');

	$('.mobile-nav li a span').addClass('rotate-0');

	$('.mobile-nav .open').die('click').live('click', function(e){
		e.stopPropagation();
		$li.toggleClass('menu-hide');
		return false;
	});

	$('.mobile-nav a').die('click').live('click', function(e){
		e.stopPropagation();
		$(this).find('span').trigger('click', $(this).attr('href'));
	});

	$('.mobile-nav li a span').die('click').live('click', function(e, href){
		e.stopPropagation();
		if (href) return false;
		$(this).toggleClass('rotate-0').toggleClass('rotate-90');
		if($('.mobile-nav').hasClass('super-menu')) {
			$(this).parent().parent().find($('.mega-menu-item ul, .dropdown-menu')).toggleClass('menu-hide').topZIndex();
			var $div = $(this).parent().next('div').toggleClass('menu-hide').topZIndex();
			if(!$div.hasClass('menu-hide')){
				$div.show();
			}
			var $ul = $(this).parent().parent().find($('.dropdown-menu'));
			if(!$ul.hasClass('menu-hide')){
				$ul.show();
			}
		} else {
			$(this).parent().next('ul').toggleClass('menu-hide').topZIndex();
		}
		return false;
	});

}

function disable_mobile_menu() {
	journal_mobile_events = false;
	var $li = $('#menu > ul > li, #super-menu > ul > li').not('.open').removeClass('menu-hide');
	$('.mobile-nav a + ul, .mobile-nav a + div').removeClass('menu-hide');
	$('#menu > ul, #menu .sf-menu, .super-menu').removeClass('mobile-nav');
	$('.mega-menu, .dropdown-menu').hide();
}


}catch(e) {};
