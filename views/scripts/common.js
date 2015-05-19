var changPwdVM = new Vue({
    el: '#myModal',
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
            $.ajax({
                url: "/backstage/change_pwd",
                type: 'POST',
                data:{
                    user:self.user
                },
                datatype: "json",
                success: function (res){
                    if (res.msg == 'success'){
                        alert('修改成功！')
                        window.location.href = "/backstage/sign_out";
                    }
                }


            })
        }
    }
});

