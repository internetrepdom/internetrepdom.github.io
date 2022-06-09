//declare body class and add preloader-site class
$(document).ready(function($) {
    var Body = $('body');
    Body.addClass('preloader-site');
    $('body').addClass('over-hidden');
});
//when content is loaded -> delete preloader-site and fadeOut preloader
$(window).load(function() {

		//.fadeOut("slow") -> slow fade out
    $('.preloader-wrapper').fadeOut(500);
    $('body').removeClass('preloader-site');
    $('body').addClass('over-lay');
    $(function() {
        $('textarea').val('');
     });
});

