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


var goVM = new Vue({
    el       : '#page_des',
    data     : {
        title       : 'title！',
        the_des    : {}
    },
    compiled : function() {
        var self = this;

        $.ajax({
            url     : '/go/getDesData',
            type    : 'GET',
            success : function(res) {
                self.the_des = res.data.des;
            }
        });
    },
    methods  : {

    }

});
