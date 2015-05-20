$(function() {

    $('.sign-up a').on('click', function() {
        $('.max-mask').fadeIn();
        $('.register-container').fadeIn();
    })

    $('.login a').on('click',function(){
        $('.max-mask').fadeIn();
        $('.login-container').fadeIn();
    })

    $('.login-exit').on('click', function() {
        $('.max-mask').fadeOut();
    })

    $('.login-confirm').on('click',function(){
        var user_name = $('.login-email').val();
        var pwd = $('.login-pwd').val();

        $.ajax({
            url: '/user/login',
            type : 'POST',
            data : {
                user: {
                    name: user_name,
                    pwd: pwd
                }
            },
            datatype: 'json',
            success : function(res) {

               if(res.msg =='failed'){
                   alert('sb');
               } else{
                   $('.max-mask').fadeOut();
                   $('.header-nav').find('.login,.sign-up').hide();
                   $('.header-nav').find('.username').text(res.msg).show();
                   $('.header-nav').find('.exit').text('退出');
               }

            }



        });
    });


  <!--下面开始是我新加的-->

    $('.join-confirm').on('click',function(){
        var new_user_name = $('.join-email').val();
        var new_pwd = $('.join-pwd').val();

        $.ajax({
            url: '/user/join',
            type : 'POST',
            data : {
                new_user: {
                    name: new_user_name,
                    pwd: new_pwd
                }
            },
            datatype: 'json',
            success : function(res) {

                if(res.msg =='success'){
                    alert(res.new_user.name);
                } else{
                   alert('sb');
                }

            }


        });

    });

    $('.go-login').on('click',function(){
        $('.register-container').css('display','none');
        $('.login-container').css('display','block');
    });

    $('.go-regist').on('click',function(){
        $('.login-container').css('display','none');
        $('.register-container').css('display','block');
    })


});


var homeEditorVM = new Vue({
    el: '#main-banner',
    data: {
        banner: {
            img_url: ''
        }
    },
    compiled: function () {
        var self = this;
        $.ajax({
            url: '/backstage/homeEditorData',
            type: 'GET',
            success: function (res) {
                self.banner.img_url = res.data.banner_image_url;
            }

        })
    },

    methods: {
        //goEditimg: function () {
        //    var self = this;
        //
        //    $.ajax({
        //        url: "/backstage/changeHomeBanner",
        //        type: 'POST',
        //        data: {
        //            url: self.banner
        //        },
        //        datatype: "json",
        //        success: function (res) {
        //            if (res.msg == 'success') {
        //                $('#edit-headimg').hide();
        //                window.location.reload();
        //            }
        //        }
        //    })
        //}
    }
});