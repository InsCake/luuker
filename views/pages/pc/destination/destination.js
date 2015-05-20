/**
 * Created by cola on 15-5-3.
 */
$(function(){
    $('.nav').on('click',function() {
        $('.nav').removeClass('active');
        $(this).addClass('active');
    });

    $('.nav').on('click',function(){
        var i = $(this).index();
        $('.nav-cont').removeClass('active').eq(i).addClass('active');
    });
});

