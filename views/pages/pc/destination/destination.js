/**
 * Created by cola on 15-5-3.
 */
$(function(){
    $('.des-nav li').on('click',function() {
        $('li').removeClass('des-nav-active');
        $(this).addClass('des-nav-active');
    })
});
