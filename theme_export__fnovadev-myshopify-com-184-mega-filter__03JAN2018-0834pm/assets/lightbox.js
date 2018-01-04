$( document ).ready(function() {
//   $("#block-1504221328541").addClass( "fancybox fancybox.iframe" );
//   $("#block-1504221328541").attr("href", "https://player.vimeo.com/video/231634224?autoplay=1&loop=1&autopause=0");
if ($(window).width() < 640) {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '480px',
      height  : '270px',
      aspectRatio : false
    });
} else if ($(window).width() < 960) {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '720px',
      height  : '405px',
      aspectRatio : false
    });
}else if ($(window).width() < 1280) {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '960px',
      height  : '540px',
      aspectRatio : false
    });
}else if ($(window).width() < 1440) {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '1280px',
      height  : '720px',
      aspectRatio : false
    });
}else if ($(window).width() < 1920) {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '1440px',
      height  : '810px',
      aspectRatio : false
    });
}else {
  $(".fancybox").fancybox({
      padding    : 0,
      margin     : 10,
      nextEffect : 'fade',
      prevEffect : 'none',
      width   : '1920px',
      height  : '1080px',
      aspectRatio : false
    });
}
});
