/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);

var Wishlist = function(customerId) {
	var scope = this;
	this.items = {};
	this.customer = customerId;
	this.updated = false;
	this.options = {
		selectClass: "#product-select, .single-option-selector, .single-option-selector__radio, select[id|='product-select-option'], select[id|='productSelect-option'], select[id|='ProductSelect-option'], input[id|='ProductSelect-option'], select[id|='product-variants-option'], select[id|='sca-qv-product-selected-option'], select[id|='variant-listbox-option'], select[id|='product-selectors-option']"
	};

	this.init = function() {
		scope.getSession();
		scope.bindEvents();
		
		if(!scope.customer && scope.updated) {
			scope.deleteSession();
			scope.items = {};
			scope.updated = false;
			return scope.init();
		}

		if(scope.customer && !scope.updated) {
			scope.updateServer();
		} else {
		  setTimeout(function(){
			scope.updateButtons();
		  }, 500);
		}
		scope.updateCounts();
		return scope;
	};

	this.getSession = function() {
		if(typeof(Storage) !== "undefined") {
			if(localStorage.wishlist) {
				var sessionWishlist = JSON.parse(localStorage.getItem('wishlist'));
				scope.items = sessionWishlist.items;
				scope.updated = sessionWishlist.updated;
			}
		}
	};

	this.setSession = function() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem('wishlist', JSON.stringify({items: scope.items, updated: scope.updated}));
		}
	};

	this.deleteSession = function() {
		if(typeof(Storage) !== "undefined") {
			localStorage.removeItem('wishlist');
		}
	};

	this.add = function(productHandle, productId, variantId, form) {
        $(document).trigger({
          type: "beforeWishlistAdd",
          productHandle: productHandle,
          productId: productId,
          variantId: variantId, 
          form: form
        });

      	variantId = variantId.toString();
		if(productId!="" && variantId!="") {
			if(typeof(scope.items[productId]) === "undefined") {
				scope.items[productId] = {};
				scope.items[productId]['handle'] = productHandle;
				scope.items[productId]['variants'] = [];
			}
			if(scope.items[productId]['variants'].indexOf(variantId)<0) {
				scope.items[productId]['variants'].push(variantId);
				scope.setSession();

				if(scope.customer) {
					$.ajax({
						url: '/a/smpl/wishlist_index/ajaxAdd',
						type: 'POST',
						data: {handle: productHandle, productId: productId, variantId: variantId, customer: scope.customer}
					}).done(function(data){
						console.log('wishlist - added');
                      
                      	$(document).trigger({
                          type: "afterWishlistAdd",
                          productHandle: productHandle,
                          productId: productId,
                          variantId: variantId, 
                          form: form
                        });
					});
				}
			}
          	if(form) {
          		scope.updateButton(form);
          	}
			scope.updateCounts();
		}
	};

	this.remove = function(productId, variantId, form) {
        productId = productId.toString();
      	variantId = variantId.toString();
		if(typeof scope.items[productId] !== 'undefined') { 
			var index = scope.items[productId]['variants'].indexOf(variantId);
			if(index>=0) {
				scope.items[productId]['variants'].splice(index, 1);
				scope.setSession();

				if(scope.customer) {
					$.ajax({
						url: '/a/smpl/wishlist_index/ajaxRemove',
						type: 'POST',
						data: {productId: productId, variantId: variantId, customer: scope.customer}
					}).done(function(data){
						console.log('wishlist - removed');
					});
				}
			}
			scope.updateButton(form);
			scope.updateCounts();
		}
	};

	this.updateServer = function() {
		$.ajax({
			url: '/a/smpl/wishlist_index/ajaxUpdate',
			type: 'POST',
			dataType: 'json',
			data: {items: scope.items, customer: scope.customer}
		}).done(function(data){
			scope.items = (data.length == 0 ? {} : data);
			scope.updated = true;
			scope.setSession();
			scope.updateButtons();
			scope.updateCounts();
			console.log('wishlist - updated');
		});
	};

	this.isInWishlist = function(productId, variantId) {
		if(typeof scope.items[productId] === 'undefined' || typeof scope.items[productId]['variants'] === 'undefined') {
			return false;
		} else {
			if(scope.items[productId]['variants'].indexOf(variantId)>=0) {
				return true;
			} else {
				return false;
			}
		}
	};

	this.updateButton = function(form) {
		if(scope.isInWishlist(form.find('[data-productid]').data('productid'), form.find('[name=id]').val())) {
			form.find('.wishlistAdd').addClass('hide');
			form.find('.wishlistAdded').removeClass('hide');
		} else {
			form.find('.wishlistAdded').addClass('hide');
			form.find('.wishlistAdd').removeClass('hide');
		}
	};

	this.getItemsCount = function() {
		var count = 0;
		if(typeof scope.items !== 'undefined') {
			$.each(scope.items, function(){
				if(typeof this.variants !== 'undefined') {
					count += this.variants.length;
				}
			});
		}
		return count;
	}

	this.updateCounts = function() {
		$('.wishlistLink .count').html(this.getItemsCount());
	}

	this.updateButtons = function() {
		$('form[action="/cart/add"]').each(function(){
			scope.updateButton($(this));
		});
	};

	this.seeWishlist = function() { //deprecated
		var data = {
			items: scope.items
		};
		data = JSON.stringify(data);
		var input = $('<input type="hidden" name="wishlist" />').val(data);
		$('<form method="POST" action="/a/smpl/wishlist_index"></form>').append(input).appendTo('head').submit();
	};

	this.getHandles = function(items) {
		var handles = [];
		$.each(items, function(){
			if(this.handle !== 'undefined' && this.handle != '' && handles.indexOf(this.handle) < 0 && this.variants.length > 0) {
				handles.push(this.handle);
			}
		});
		return handles;
	};

	this.getMyWishlist = function(callback, limit) {
		scope.getItemsJson(scope.items, function(items){
        	if(callback) {
        		callback(items);
        	}
        }, limit);
	};

	this.getCustomerWishlist = function(customerId, callback){
		scope.getByUser(customerId, function(data){
          	scope.getItemsJson(data.items, function(items){
          		if(callback) {
          			callback({customer: data.customer, items: items});
          		}
            });
        });
	};

	this.getByUser = function(customerId, callback) {
		$.ajax({
			url: '/a/smpl/wishlist_index/ajaxView',
			type: 'GET',
			dataType: 'json',
			data: {cid: customerId}
		}).done(function(data){
			if(callback) {
				callback(data);
			}
			console.log('wishlist - view');
		});
	};
  
	this.loadItems = function(callback, limit, handles) {
		var loaded = 0;
		var productHandleQueue = handles;
		var productsJson = {};

		var processItem = function(){
			if(productHandleQueue.length && (!limit || limit>loaded)) {
				if(productHandleQueue[0]!="") {
					jQuery.ajax({
						url: '/products/' + productHandleQueue[0] + '.json',
						cache: false,
						success: function(data) {
							productsJson[productHandleQueue[0]] = data.product;
							productHandleQueue.shift();
							loaded++;
							processItem();
						},
						error: function() {
							productHandleQueue.shift();
							processItem();
						}
					});
				} else {
					productHandleQueue.shift();
					processItem();
				}
			} else {
				if(callback) {
					callback(productsJson);
				}
			}
		};

		processItem();
	};
  
	this.getItemsJson = function(wishlistItems, callback, limit) {
		var handles = scope.getHandles(wishlistItems);
		scope.loadItems(function(productsJson){
			var items = [];
			$.each(wishlistItems, function(productId, obj){
				var handle = obj.handle;
				$.each(obj.variants, function(index, variantId){
					var product = productsJson[handle];
					if(product) {
						var selectedVariant;
						$.each(product.variants, function(){
							if(variantId==this.id) {
								selectedVariant = this;
							}
						});
						product.variant = selectedVariant;

						if(product.image && product.image.src) {
							product.img = product.image.src;
						} else {
							product.img = 'no-image';
						}
						if(product.variant.image_id && product.variant.image_id != "") {
							$.each(product.images, function(){
								if(product.variant.image_id == this.id) {
									product.img = this.src;
								}
							});
						}
						if(Shopify.resizeImage !== 'undefined') {
							product.img = Shopify.resizeImage(product.img, 'grande');
						}

						items.push(product);
					}
				});
			});
			if(callback) {
				callback(items);
			}
		}, limit, handles);
	};

	this.bindEvents = function() {
		$(document).on('click', '.wishlistAdd', function(){
			var form = $(this).parents('form');
			scope.add($(this).data('producthandle'), $(this).data('productid'), form.find("[name='id']").val(), form);
			return false;
		});
		$(document).on('click', '.wishlistAdded', function(){
			var form = $(this).parents('form');
			scope.remove($(this).data('productid'), form.find("[name='id']").val(), form);
			return false;
		});
		$(document).on('click', '.wishlistRemove', function(){
			var form = $(this).parents('form');
			scope.remove($(this).data('productid'), form.find("[name='id']").val(), form);
			$(this).parents('.grid__item').remove();
			return false;
		});
		$(document).on('change', scope.options.selectClass, function(){
			var element = $(this);
			setTimeout(function(){
				var form = element.parents('form');
				scope.updateButton(form);
			},500);
		});
		$(document).on('click', "a[href='/a/smpl/wishlist_index']", function(e){
			if(typeof(Storage) !== "undefined") {
				e.preventDefault();
				scope.seeWishlist();
			}
		});
		$(document).on('click', "#my-wishlist .share a", function(e){
          	if($(this).hasClass('copy-button')) {
          		return false;
          	}
			var settings = "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no";
			var date = new Date();
			var param = '&i=' + date.getTime();
			var url = $(this).attr('href') + encodeURIComponent(param);
			window.open(url, "Wishlist", settings);
			return false;
		});
	};

	return init();
};