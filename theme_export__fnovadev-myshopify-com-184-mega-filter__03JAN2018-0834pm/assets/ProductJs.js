var ProductJs = function( product ) {
	var item = $('[id="product-item-'+product.id+'"]:not(.initialized)');
	var variantSelectorId = "product-select-"+product.id+'-'+randomstring(10);
    $('#product-select-'+product.id).attr('id', variantSelectorId);

	var init = function() {
      	if(!item.hasClass('initialized')) {
          initVariantStatus();
          initializeVariantSelector();
          initGallery();
          item.addClass('initialized');
        }
	};
	
	var initVariantStatus = function() {
		$.each(product.variants, function(key, variant){
          	//AVAILABLE
          	if(variant.available) {
            	variant.status = 'available';
          	} else {
            	//SOLDOUT
            	variant.status = 'soldout';
          	}
		})
	};
	
	var initializeVariantSelector = function() {
		var selectCallback = onVariantSelected();
	  
		new Shopify.OptionSelectors(variantSelectorId, { product: product, onVariantSelected: selectCallback });

      	if(product.options.length > 1) {
			if(product.variants.length > 1) {
              Shopify.linkOptionSelectors(product);

			  /*$.each(product.options, function(key, variant){
				item.find('.single-option-selector:eq('+key+')')
				.filter(function() { return $(this).find('option').size() > 1  })
				.prepend('<option value="">Choose '+product.options[key]+'</option>')
				.val('')
				.trigger('change');
			  });*/
			}

			// Add label if only one product option and it isn't 'Title'.
			if(product.options.length == 1 && product.options[0] != 'Title') {
			  item.find('.selector-wrapper:eq(0)').prepend('<label>'+product.options[0]+'</label>');
			}

          	item.find('.selector-wrapper label').append(':');
		} else {
          	if(product.variants.length > 1) {
              	item.find('.single-option-selector').prepend('<option value="" selected disabled="disabled">'+product.options[0]+'</option>');
              
                item.find('.select-variant').change(function(){
                    var variantSelected = false;
                  	$.each(product.variants, function(key, variant){
                        if(variant.id==item.find('.select-variant').val()) {
                            variantSelected = variant;
                            return;
                        }
                    });
                  	selectCallback(variantSelected, null);
                });
            }
		}
      
      	

      	if(product.variants.length==1) {
      		selectCallback(product.variants[0], null);
      	}
	
        
            var getSoldOutVariant = addSoldOutVariant(product);
        	var availableVariant = getFirstAvailableVariant(product);
        	setDefaultVariant(product.id, availableVariant);
        
  };

  function addSoldOutVariant(prod) {
    for( var i = 0; i < prod.variants.length; i++){ 
      var v = i+2;
	  console.log(prod.variants[i].available);
      if(prod.variants[i].available == false) {
        $('.single-option-selector option:nth-of-type('+v+')').append(" - Sold Out");
      }
    }
  }
  
  function getFirstAvailableVariant(prod) {
    for( var i = 0; i < prod.variants.length; i++){ 
      if(prod.variants[i].available){
        if(item.hasClass('product-plus')){
          if(prod.variants[i].title == "1X" || prod.variants[i].title == "2X" || prod.variants[i].title == "3X"){
            return prod.variants[i];
          }
        }else{
          return prod.variants[i];
        }
      }
    }
    return false;
  } 

  function setDefaultVariant(productId, _variant){
    if(!_variant) {
      	_variant = product.variants[0];
    }
    
    if(_variant && productId) {
      $('.single-option-selector').each(function(){
        var selector = this;
        var option = $(selector).data('option');
        $(selector).find('option').each(function(){
          if(this.value == _variant[option]){
            $(selector).val(this.value).trigger('change');
            return;
          }
        });
      });
    }
  }
	var onVariantSelected = function() {
		return function(variant, selector) {
			if(variant && variant.id) {

              	
              
              	//Update the price
              	item.find('.price .deal span').html(Shopify.formatMoney(variant.price, formatStrMoney)/*.replace('.00', '')*/);
				if(variant.compare_at_price != null){
					item.find('.price .retail span').html(Shopify.formatMoney(variant.compare_at_price, formatStrMoney).replace('.00', ''));
					var percent = Math.round( (((variant.compare_at_price - variant.price) * 100 ) / variant.compare_at_price) );
					item.find('.off-percent strong').html(percent+'%');
				}

				//Update the fetured image
              	if(variant.featured_image) {
					//Image in grid
					item.find('.image img').attr('src', variant.featured_image.src);

					//Image in product page
					item.find('#active-wrapper .img').css('background-image', 'url('+variant.featured_image.src+')');
					item.find('#active-wrapper a').attr('href', variant.featured_image.src);
				}

				//Update the variant value to add to cart
              	item.find('#product-'+product.id+'-variant').val(variant.id);

                item.find('.soldout-product-message').show();
                item.find('.sold-out-button .without-extended-offer').show();
			} else {
				item.find('#product-'+product.id+'-variant').val("");
			}
			updateButtons(variant);
          
          	$(document).trigger({
                type: "afterVariantSelected",
                item: item,
              	variant: variant
            });
          
            
		}
	};

	var updateButtons = function(variant) {
		var status = variant ? variant.status : null;  
		item.find('.buttons-wrapper .add-button, .buttons-wrapper .sold-out-button, .soldout-product-message').hide(); //Grid
		item.find('.content-available, .content-soldout').hide(); //Product page
      	//item.find('.content-available input').val("ADD TO BAG - "+variant.title);
		switch(status) {
			case "available":
				item.find('.buttons-wrapper .add-button').show(); //Grid
            	$('#product-info .cta').show(); //Product page
				item.find('.content-available').show(); //Product page
				break;
			case "soldout":
				item.find('.buttons-wrapper .sold-out-button').show(); //Grid
            	item.find('.soldout-product-message').show(); //Grid
            	item.find('.cta').show(); //Product page
				item.find('.content-soldout').show(); //Product page
                if(window.location.hash.indexOf('bis') >= 0) {
                  $('.BIS_trigger').trigger('click');
                }
				break;
          	case null:
            	item.find('.cta').hide(); //Product page
		}
	};

  	var initGallery = function(){
      	var onImagesLoaded = function(images, callback){
            var imagesLoaded = 0;
            images.each(function(){
              var img = new Image();
              img.onload = function() {
                imagesLoaded++;
                if(imagesLoaded==images.length) {
                  callback();
                }
              };
              img.src = $(this).attr('src');
            });
        };
      	var isQuickView = (item.closest('.quick-view').length>0 ? true : false);

     	//Initialize thumbs on main product page
      	item.find('#thumbs.switch a').on('click', function(e) { 
            e.preventDefault();
          	var variantId = $(this).attr('variant-id');
            var count = $("#active-wrapper").slick("getSlick").$slides.length;
            var slide = item.find('#thumbs.switch a.gallery').index(this);
            if(!isQuickView && $(document).width()>584 && slide==(count-1)) {
              slide = slide - 1;
            }
            item.find('#active-wrapper').slick('slickGoTo', slide);

            if(variantId && variantId!='') {
              	var variant = $.grep(product.variants, function(obj){ return obj.id==variantId; });
              	if(variant[0] && variant[0].available) {
                	if(product.options.length <= 1) {
                        item.find('.select-variant').val(variantId).change();
                    } else {
                        var variantTitle = item.find('.select-variant option[value='+variantId+']').text();
                        $.each(variantTitle.split(' / '), function(key, val){
                            item.find('.single-option-selector:eq('+key+')').val(val).change();
                        });s
                    }
                }
            }
        });
      
      	onImagesLoaded(item.find('#thumbs img'), function(){
          window.slickSliderThumbs = item.find('#thumbs').slick({
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            infinite: false,
            slidesToScroll: 1,
            
              slidesToShow: 4,
              vertical: true,
              verticalSwiping: true,
              prevArrow: '<i class="lnr lnr-chevron-up up-arrow animation"></i>',
              nextArrow: '<i class="lnr lnr-chevron-down down-arrow animation"></i>',
            
            responsive: [
              {
                breakpoint: 584,
                settings: {
                  slidesToShow: (item.find('#thumbs img').length > 3 ? 4 : item.find('#thumbs img').length),
                  slidesToScroll: 1,
                  vertical: false,
                  verticalSwiping: false,
                  autoplay: false,
                  prevArrow: '<i class="lnr lnr-chevron-left left-arrow animation"></i>',
                  nextArrow: '<i class="lnr lnr-chevron-right right-arrow animation"></i>',
                  speed: 150,
                  swipeToSlide: true,
                  arrows: false
                }
              },
              {
                breakpoint: 1025,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 1,
                  vertical: false,
                  verticalSwiping: false,
                  prevArrow: '<i class="lnr lnr-chevron-left left-arrow animation"></i>',
                  nextArrow: '<i class="lnr lnr-chevron-right right-arrow animation"></i>',
                }
              }
            ]
          });
          
          var current = item.find('#thumbs').slick('slickCurrentSlide');
          item.find('#thumbs').slick('slickGoTo', current);
        });
      
        setTimeout(function(){
			 window.slickSliderMain = item.find('#active-wrapper').slick({
              autoplay: false,
              infinite: false,
              arrows: false,
              speed: 500,
              autoplaySpeed: 5000,
              slidesToShow: (isQuickView ? 1 : 2),
              slidesToScroll: 1,
              responsive: [
                {
                    breakpoint: 584,
                    settings: {
                      	slidesToShow: 1,
                        dots: true
                    }
                }
              ]
            });

            setTimeout(function(){
				var current = $('#active-wrapper').slick('slickCurrentSlide');
            	$('#active-wrapper').slick('slickGoTo', current);
            }, 200);

        }, 500);

      	var openPhotoSwipe = function(link) {
          	var getElementIndex = function(link){
            	var src = link.attr('href');
              	return $('#thumbs.switch a.gallery').index($('#thumbs.switch a.gallery[href="'+src+'"]'));
            };

          	var index = getElementIndex(link);
            var pswpElement = $('.pswp').get(0);

            // build items array
            var items = [];
            $('#thumbs a').each(function(){
              items.push({ src: $(this).attr('href'), w: 0, h: 0 });
            });

            // define options (if needed)
            var options = {
              	index: index,
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.listen('gettingData', function (index, item) {
                if (item.w < 1 || item.h < 1) {
                    var img = new Image();
                    img.onload = function () {
                        item.w = this.width;
                        item.h = this.height;
                        gallery.updateSize(true);
                    };
                    img.src = item.src;
                }
            });
            gallery.init();
        };
      
      	item.find('#active-wrapper a.productImage').click(function(){
          //cdn.shopify.com/s/files/1/0628/4681/products/Fashion_Nova-01-24-17-325_1024x1024.jpg?v=1486031375
          openPhotoSwipe($(this));
          return false;
        });
      
      
  	}

	return init();
  
};