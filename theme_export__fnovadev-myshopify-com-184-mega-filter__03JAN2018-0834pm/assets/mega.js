$(document).ready(function() {
  //add image styling
  $('.bigR').parent().addClass("mega-large-image");
  $('.bigL').parent().addClass("mega-large-image");
  $('.medR').parent().addClass("mega-med-image");
  $('.medL').parent().addClass("mega-med-image");  
  
  //stacked columns
  $(".stacked:odd").hide();
  $(".stacked").each(function() {
    $(this).prev(".stacked").append($(this).html());
  });
  
  //hide blur if firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  
  $(".menu > ul > li").has( "ul" ).mouseenter(function(e) {
    //hide mega menus switching mega menus
    $('.menu > ul > li').not(this).find( "ul" ).hide();
    $(this).find( "ul" ).show();
    
    //add blur classes
    if (!isFirefox) {
      $(".content-wrapper.clearfix").removeClass("unblur");
      $(".content-wrapper.clearfix").addClass("blur");      
    }
  })
  .mouseleave(function() {
    //remove blur classes
    if (!isFirefox) {
      $(".content-wrapper.clearfix").removeClass("blur");
      $(".content-wrapper.clearfix").addClass("unblur");
    }
    //transition if switching mega menu for new slidedown
    timer = setTimeout(function() {
      $('.menu > ul > li').find( "ul" ).show();
    }, 300)
  })
  .mouseenter(function() {
    //cancel transition if reaching new mega menu in timeout time
    if(timer){
      clearTimeout(timer);
    }
  });
});

//color last chance
$(".menu > ul > li > a:contains('Last Chance')").css("color", "#f50f96");

//hide untitled links for spacing
// $(".menu > ul > li > ul > li > ul > li > a:contains('untitled')").css("visibility", "hidden");