/**
 * Created by cola on 15-5-14.
 */


var signinVM = new Vue({
    el: '#page-signin',
    data: {
        title: 'title！',
        user: {
            name: '',
            pwd: ''
        }


    },
    methods: {
        goSignin: function () {
            var self = this;
            $.ajax({
                url: '/backstage/sign_in',
                type: 'POST',
                data: {
                    user: self.user
                },
                dataType: 'json',
                success: function (res) {
                    if (res.msg == 'failed') {
                        alert('用户名或密码错误，请重新输入');
                    } else if(res.msg =='null'){
                        alert('用户不存在');
                    }else{
                        //window.location.href = "/backstage";
                    }
                }
            });
        }
    }
});