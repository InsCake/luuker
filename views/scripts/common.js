$(function() {

    $('.sign-up').on('click', function() {
        $('.max-mask').fadeIn();
        $('.ogin-container').hide();
        $('.register-container').fadeIn();
    });

    $('.login').on('click',function(){
        $('.max-mask').fadeIn();
        $('.register-container').hide();
        $('.login-container').fadeIn();
    });

    $('.login-exit').on('click', function() {
        $('.max-mask').fadeOut();
    });

    $('.login-confirm').on('click',function(){
        var user_name = $('.login-email').val();
        var pwd = $('.login-pwd').val();
        if(pwd == null){
            alert('输入不能为空');
        }else{
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
                        alert('登录失败，请检查输入信息');
                    } else if(res.msg =='null'){
                        alert('此用户不存在');
                    }else{
                        alert('登陆成功！');
                        $('.max-mask').fadeOut();
                        $('.header-nav').find('.login,.sign-up').hide();
                        $('.header-nav').find('.username a').text(res.msg).show();
                        $('.header-nav').find('.exit a').text('退出');
                        $('.userhead').fadeIn();
                        window.location.reload();
                    }
                }
            });
        }


    });


    <!--下面开始是我新加的-->

    $('.join-confirm').on('click',function(){
        var new_user_name = $('.join-email').val();
        var new_pwd = $('.join-pwd').val();

        if(new_pwd.length < 10){
            alert('密码长度过小');
        }if(new_user_name == null || new_user_name == ''|| new_pwd == null){
            alert('输入不能为空');
        }else{
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
                        alert(res.new_user.name+'注册成功');
                        $('.max-mask').fadeOut();
                    } else{
                        alert('用户名已存在，请另取一个');
                    }
                }
            });
        }

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


var changPwdVM = new Vue({
    el: '#update_pwd',
    data: {
        user: {
            pwd_old: '',
            pwd_new_1: '',
            pwd_new_2:''
        }
    },
    methods: {
        goUpdate: function () {
            var self = this;
            if(self.user.pwd_new_1 != self.user.pwd_new_2){
                alert('两次输入不一致，请重新输入')
            }if(self.user.pwd_new_1.length < 4){
                alert('密码过短');
            }if(self.user.pwd_new_1 == null){
                alert('输入不能为空')
            }
            else{
                $.ajax({
                    url: "/backstage/change_pwd",
                    type: 'POST',
                    data:{
                        user:self.user
                    },
                    datatype: "json",
                    success: function (res){
                        if (res.msg == 'success'){
                            alert('修改成功！');
                            window.location.href = "/backstage/sign_out";
                        }else{
                            alert('旧密码错误，请重新输入');
                        }
                    }
                })
            }

        }
    }
});



