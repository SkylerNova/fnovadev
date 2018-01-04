(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

var smIsMobile = {
    Android: function() {
        return navigator.userAgent.toLowerCase().match(/android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.toLowerCase().match(/blackberry/i);
    },
    iOS: function() {
        return navigator.userAgent.toLowerCase().match(/iphone|ipad|ipod/i);
    },
    Opera: function() {
        return navigator.userAgent.toLowerCase().match(/opera mini/i);
    },
    Windows: function() {
        return navigator.userAgent.toLowerCase().match(/iemobile/i);
    },
    any: function() {
        return (smIsMobile.Android() || smIsMobile.BlackBerry() || smIsMobile.iOS() || smIsMobile.Opera() || smIsMobile.Windows());
    }
};

var fancyboxSettings = {
  hideOnContentClick: true,
  titleShow : true,
  padding : 0,
  margin:[40,10,40,10],
  nextEffect: 'fade',
  prevEffect: 'fade',
  closeEffect : 'fade',
  autoCenter: true,
  helpers: {
    overlay: {speedOut : 500, locked: true}
  },
  afterLoad: function() {
  	$('html').addClass('fancybox-lock');
  },
  afterShow: function() {
    setTimeout(function(){
    	$.fancybox.update();
    }, 200);
  }
};

jQuery(function($) {
    setTimeout(function(){
      $('.content-wrapper').css('padding-top', $('#header').height());
      $(window).resize(function(){          
        $('.content-wrapper').css('padding-top', $('#header').height());
      });
    }, 500);

  	if(!smIsMobile.any()) {
      $('body').addClass('isNotMobile'); 
    }

//     $(function(){
//       $('.shipping-banner-carousel .item:gt(0)').hide();
//       setInterval(
//         function(){
//           $('.shipping-banner-carousel > :first-child').fadeOut(function(){
//             $(this).next('.item').fadeIn().end().appendTo('.shipping-banner-carousel')
//           });
//         }, 3000);
//     });

  	//Utility bar
  	if(!Cookies.get('utility_bar_closed')) {
		$('#utility-bar').show();
      	$('#utility-bar a[href="#"]').click(function(){
          	$('#utility-bar').slideUp(function(){
            	$(window).resize();
            });
          	Cookies.set('utility_bar_closed', '1');
          	return false;
      	});
    }

  	$(document).on("click", ".quantity .minus", function() {
      	var wrapper = $(this).closest('.wrap');
    	try {
          wrapper.find('input[type=number]').get(0).stepDown();
          wrapper.find('input[type=number]').change();
        } catch(e) {
          var value = (parseInt(wrapper.find('input[type=number]').val())-1);
          wrapper.find('input[type=number]').val((value>=1 ? value : 1));
          wrapper.find('input[type=number]').change();
        }
  	});
  	$(document).on("click", ".quantity .plus", function() {
      	var wrapper = $(this).closest('.wrap');
    	try {
          wrapper.find('input[type=number]').get(0).stepUp();
          wrapper.find('input[type=number]').change();
        } catch(e) {
          var value = (parseInt(wrapper.find('input[type=number]').val())+1);
          wrapper.find('input[type=number]').val(value);
          wrapper.find('input[type=number]').change();
        }
  	});

  	if($('#side-cart').length > 0) {
    	initSideCart();
  	}

  	
  		$('body').delegate('.add-to-cart-form', 'submit', function(){
            if(validateAddCart($(this))) {
              addToCart($(this));
            }
            return false;
        });
  	
  	
  	$(window).scroll(function(){
        if($(this).scrollTop()<=200) {
          $('.scrollup').fadeOut();
        } else {
          $('.scrollup').fadeIn();
        }
     
      
      
      if(!$('body').hasClass('templateProduct') && !$('body').hasClass('templateCart')) {
        if($(this).scrollTop() > $('.content-searchbar').outerHeight()) {
            $('.search-target').show();
        } else {
            $('.search-target').hide();
          	$('.header-searchbar').slideUp();
        }
      }
      
    });
  
  	$(window).resize(function(){
  		$.fancybox.update();
  	});

  	$("a[rel='fancybox']").fancybox(fancyboxSettings);
  
    
  
  	$('#footer .mailing-list form').submit(function(e){
    	e.preventDefault();
      	e.stopImmediatePropagation();

      	$(this).find('.error').removeClass('error');
      
      	var error = false;
      	$(this).find('.required').each(function(){
          if($(this).val()=="") {
          	error = true;
            $(this).addClass('error');
          }
        });
      	if(!error) {
          if(!validateEmail($(this).find('.email').val())) {
            error = true;
          	$(this).find('.email').addClass('error');
          }
        }
      
      	if(!error) {
          var form = $(this);
          $.ajax({
              url: form.attr('action'),
              data: form.serialize(),
              type: 'POST',
              dataType: "json"
          }).always(function(){
              $('#footer .mailing-list form, #footer .mailing-list .title').fadeOut(function(){
                  $('#footer .mailing-list .success').fadeIn();
              });
          });
        }
    });
  
  	if($(window).width()<1078) {
        $('#footer .links .title').click(function(){
            $(this).next('ul').slideToggle();
        });
      
       var focusing = false;
       $('.search-target').click( function(){
         $("#header").removeClass('animation');
         $('.header-searchbar').slideToggle(function(){
         	if($('.header-searchbar').is(':visible')) {
                $("#header").css({
                  'position': 'absolute',
                  'top': $(document).scrollTop()
               });
               focusing = true;
             } else {
                $("#header").css({
                  'position': 'fixed',
                  'top': 0
                });
                focusing = false;
             }
         });
         
         return false;
       });
      
       $(window).scroll(function(){
       		//if(focusing) $("#header").css({ 'top': $(document).scrollTop() });
         	if(focusing && $('#header .header-searchbar input').is(':focus')) {
         		$("#header").css({ 'top': $(document).scrollTop() });
            } else {
              	$('.header-searchbar').slideUp();
            	$("#header").css({
                  'position': 'fixed',
                  'top': 0
                });
                focusing = false;
            }
       });
    }

  	$(document).on('beforeWishlistAdd', function(){
      	if(smIsMobile.any() && $(window).width() < 1078) {
  			$('.top-utils .wishlistLink a').removeClass('animated flash-color-pink-mobile');
        } else {
        	$('.top-utils .wishlistLink a').removeClass('animated flash-color-pink');
        }
  	});
  	$(document).on('afterWishlistAdd', function(){
  		if(smIsMobile.any() && $(window).width() < 1078) {
      		$('.top-utils .wishlistLink a').addClass('animated flash-color-pink-mobile');
        } else {
        	$('.top-utils .wishlistLink a').addClass('animated flash-color-pink');
        }
  	});
  
  	//Prevent zoom in Safari
  	document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
});

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateAddCart(form) {
  if(form.find('input[name=id]').val()=='') {
        var allOptionsSelected;
      	if(form.find('.single-option-selector').length > 0) {
            allOptionsSelected = true;
            form.find('.single-option-selector').each(function(){
                if($(this).val()=="") {
                    allOptionsSelected = false;
                    return false;
                }
            });
        } else {
          	allOptionsSelected = false;
        }
      	
      	if(allOptionsSelected) {
          	var errorMsg = form.find('.validation-msg').text();
          	if(errorMsg) {
          		alert(errorMsg);
            } else {
            	alert("The selected variant is sold out.");
            }
        } else {
        	var labels = [];
            form.find('.options label').each(function(key, obj){
                labels.push($(obj).text().replace(':', '').trim());
            });
            alert("You must select a "+labels.join('/')+".");
        }
      	return false;
    }
  	return true;
}

function initSideCart() {
	$('.header .cart-wrap').click(function(e){
      e.stopPropagation();
      showSideCart(true);
      return false;
    });

    $(document).click(function(event){
      if(!$(event.target).closest('#side-cart').length && $(event.target).attr('id')!="add-cart-overlay" && $('#side-cart').hasClass('open')) {
        hideSideCart();
      }
    });

    $('body').delegate('#side-cart a.remove-from-cart', 'click', function(){
      var variantId = $(this).attr('href').replace('#', '');
      
      
      	removeItemToCart(variantId);
      
      
      return false;
    });
}

/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var RADIANCE = {

	common : {
		init: function(){
			$('html').removeClass('no-js').addClass('js');
			setupDropdownMenus();

			$('.nav-arrow', '#top-menu').each( function(){
				$(this).css('top', Math.ceil($(this).parent(2).height()/2) + 1);
			});

		}
	},

	templateIndex : {
		init: function(){

		}
	},

	templateProduct : {
		init: function(){
			//$('#product-actions').bind( 'submit', addToCart );
			$('#thumbs li:nth-child(5n+5)').addClass('last-in-row');
		}
	},

	templateCart : {
		init: function(){
          var checkGiftNote = function() {
              if($('#chk-is-gift').is(':checked')) {
                	$('#gift-note').show();
              } else {
                  $('#gift-note').hide();
                  $('#gift-note').find('textarea').val("");
              }
          }
          $('#chk-is-gift').click(function(){
            	checkGiftNote();
          });
          checkGiftNote();
		}
	}

}

var UTIL = {

	fire : function(func,funcname, args){
		var namespace = RADIANCE;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	},

	loadEvents : function(){
		var bodyId = document.body.id;

		// hit up common first.
		UTIL.fire('common');

		// do all the classes too.
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
	}

};
$(document).ready(UTIL.loadEvents);

/**
 * Support for dropdown menus
 */
function setupDropdownMenus(){
  $('.main-menu .has-dropdown').hoverIntent({
    over: navRollOver,
    out: navRollOut,
    timeout: 300
  });

  function navRollOver(e){
    $(this).addClass('active').find('div:first').show();
    /*if($(this).parent().position().left > 1000) {
    	$(this).find('div:first').css({'right': '-20px', 'left': 'auto'});
    }*/
  }
  function navRollOut(e){
    $(this).removeClass('active').find('div:first').hide();
  }
}

/**
 * Ajaxy add-to-cart
 */
function addToCart(form){
	//$('#add-cart-overlay').fadeIn();
  	$('#product-wrap .content-available button').removeClass('added').addClass('adding').attr('disabled', 'disabled');
  	$('.top-utils .cart-wrap .body').removeClass('animated flash-pink');
  	$('.top-utils .cart-wrap .handle').removeClass('animated flash-border-pink');
  	//$.fancybox.close();
  
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		//async: false,
		data: form.serialize(),
		dataType: 'json',
		error: addToCartFail,
		success: addToCartSuccess,
		cache: false
	});
}

function addToCartSuccess(jqXHR, textStatus, errorThrown){
  	$('.top-utils .cart-wrap .body').addClass('animated flash-pink');
  	$('.top-utils .cart-wrap .handle').addClass('animated flash-border-pink');
  	$('#product-wrap .content-available button').removeClass('adding').addClass('added').attr('disabled', false).find('span').html("Added");
  	setTimeout(function(){
    	$('#product-wrap .content-available button').removeClass('added').find('span').html("Add to Bag");
    }, 6000);
  	if($.fancybox.isOpen) {
  		$(document).trigger({type: "afterQuickViewAdded"});
  	}

	updateCartDesc(jqXHR);
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  	var response = $.parseJSON(jqXHR.responseText);
  	$('#add-cart-overlay').fadeOut();

  	$.fancybox('<div class="error-itemincart">'+(response.status==422 ? response.description : response.description)+'</div>', {
      padding: 0,
      margin: [40,30,20,10],
      closeEffect: 'fade',
      autoCenter: true,
      helpers: {
        overlay: { speedOut : 500 }
      }
    });
  	$('#product-wrap .content-available button').removeClass('adding').attr('disabled', false);
}

function removeItemToCart(variantId){
  	$('#add-cart-overlay').fadeIn();

	$('#side-cart').remove();
  	$.ajax({
		type: 'POST',
		url: '/cart/change.js',
      	data: {
          id: variantId,
          quantity: 0
        },
		dataType: 'json',
      	error: function(){
      		updateCartDesc();
          	$('#add-cart-overlay').fadeOut();
      	},
      	success: function(){
          	updateCartDesc();
      		$('#add-cart-overlay').fadeOut();
      	},
		cache: false
	});
}

function updateCartDesc(data){  
  	
  	  if(data) {
        $('.floating-cart .img').html('<img src="'+data.image+'"/>');
        $('.floating-cart .info .title').html(data.title);
        $('.floating-cart .info .price').html(Shopify.formatMoney(data.price, formatStrMoney));
        Currency.convertAll(shopCurrency, Currency.currentCurrency);
        $('.floating-cart').slideDown();
        var delay = 2000;
        if(smIsMobile.any()) {
        	var delay = 2000;
        }
        setTimeout(function(){
        	$('.floating-cart').slideUp();
        }, delay);
      }
  
  	  $.ajax({
          type: 'GET',
          url: '/cart.js',
          dataType: 'json',
          cache: false,
          success: function(data){
              $('.header .cart-wrap span.count').html(data.item_count);
          }
      });
  	
  
  	updateUtilityBar();
}

function updateUtilityBar() {
    //if($('#utility-bar').is(':visible')) {
      $.ajax({
        type: 'GET',
        url: '/cart?view=ajax-utility-bar',
        cache: false,
        success: function(data){
          $('#utility-bar').remove();
          $('#header').prepend(data);
          $('#utility-bar').show();
          Cookies.remove('utility_bar_closed');
        }
      });
    //}
}

function showSideCart(animate) {
  $('body, html').css({overflow: 'hidden'});
  $('#page').addClass('mode-overlay');
  if(animate) {
    setTimeout(function(){$('#side-cart').addClass('open')}, 100);
  } else {
  	$('#side-cart').addClass('open');
    setTimeout(function(){$('#side-cart').addClass('ease-animation-med')}, 200);
  }
  setTimeout(function(){
    $('#side-cart .wrapper .buttons-wrapper').css('bottom', '1px');
  }, 800);
  
  $(document).trigger({type: "afterSideCartShowed"});
}

function hideSideCart() {
  $('#side-cart').removeClass('open');
  $('#page').removeClass('mode-overlay');
  $('body, html').css({overflow: ''});
  $('#side-cart .wrapper .buttons-wrapper').css('bottom', '0px');
}

function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$.fn.oneClickSelect = function () {
  return $(this).on('click', function () {
    // In here, "this" is the element

    var range, selection;

    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(this);
      range.select();
    }
    
    return false;
  });
};

function randomstring(L) {
    var s = '';
    var randomchar = function () {
        var n = Math.floor(Math.random() * 62);
        if (n < 10) return n; //1-10
        if (n < 36) return String.fromCharCode(n + 55); //A-Z
        return String.fromCharCode(n + 61); //a-z
    }
    while (s.length < L) s += randomchar();
    return s;
}