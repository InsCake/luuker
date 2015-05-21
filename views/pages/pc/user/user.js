/**
 * Created by cola on 15-5-21.
 */
$(document).ready(function(){
    $(".head-edit-txt").mouseover(function(){
        $('.head-edit').css("opacity","0.5");
    });
    $(".head-edit-txt").mouseout(function(){
        $(".head-edit").css("opacity","1");
    });

    $('.nav').on('click',function() {
        $('.nav').css('font-weight','normal');
        $(this).css('font-weight','bolder');
    });

    $('.nav').on('click',function(){
        var i = $(this).index();
        $('.nav-cont').removeClass('active').eq(i).addClass('active');
    });
});

