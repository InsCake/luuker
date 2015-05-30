$(document).ready(function() {
    $(".head-edit-txt").mouseover(function() {
        $('.head-edit').css("opacity", "0.5");
    });
    $(".head-edit-txt").mouseout(function() {
        $(".head-edit").css("opacity", "1");
    });

    $('.nav').on('click', function() {
        var i = $(this).index();
        $('.nav-cont').removeClass('active').eq(i).addClass('active');
    });

    $('.alter-mail').on('click', function() {
        $(this).hide();
        $('#mail_show').hide();
        $('#email').show();
    });

    $('.alter-sch').on('click', function() {
        $(this).hide();
        $('#school_show').hide();
        $('#foo').show();
    });

});

var userVM = new Vue({
    el       : '#page_user',
    data     : {
        title       : 'title！',
        user        : {
            name    : '',
            oname   : '',
            opwd    : '',
            npwd1   : '',
            npwd2   : '',
            //title   : '',
            mail    : '',
            school  : '',
            nmail   : '',
            nschool : ''
        },
        current_tab : 'user_info',
        a           : {
            mail   : '',
            school : '',
            alter  : ''
        },
        the_user    : {},
        articles    : []
    },
    compiled : function() {
        var self = this;

        $.ajax({
            url     : '/user/getUserData',
            type    : 'GET',
            success : function(res) {
                self.the_user = res.data.user;
                self.articles = res.data.articles;
                self.user.mail = res.data.user.mail;
                self.user.school = res.data.user.school;
                self.user.nmail = res.data.user.mail;
                self.user.nschool = res.data.user.school;
                console.log(res.data.articles.status);

                if(res.data.user.mail == ''||res.data.user.mail == null) {
                    self.a.mail = '添加';
                } else {
                    self.a.mail = '修改';
                }

                if(res.data.user.school == ''||res.data.user.school == null) {
                    self.a.school = '添加';
                } else {
                    self.a.school = '修改';
                }

                if(res.data.articles.status == 0||res.data.articles.status == 2){
                    self.a.alter = '修改';
                } else {
                    self.a.alter = '';
                }
            }
        });
    },
    methods  : {
        changeHead     : function() {
            var self = this;
            $.ajax({
                url      : '/user/nameEditorData',
                type     : 'POST',
                data     : {
                    user : self.user
                },
                dataType : 'json',
                success  : function(res) {
                    alert('修改成功');
                    $('.name-edit span').text(res.msg);
                }
            });
        },
        updatePwd      : function() {
            var self = this;
            if(self.user.npwd1 != self.user.npwd2) {
                alert('两次输入不一致，请重新输入');
            } else {
                $.ajax({
                    url      : '/user/changePwd',
                    type     : 'POST',
                    data     : {
                        user : self.user
                    },
                    dataType : 'json',
                    success  : function(res) {
                        if(res.msg == 'success') {
                            alert('修改成功');
                            window.location.reload();
                        } else {
                            alert('旧密码错误，请重新输入');
                        }
                    }
                });
            }
        },
        switchTab      : function(tab) {
            this.current_tab = tab;
        },
        doUploadHead   : function() {
            $('#head_logo').click();
        },
        onHeadSelected : function() {
            var formData = new FormData();
            var file = document.getElementById('head_logo').files[0];
            formData.append('upload', file);

            var xhr = new XMLHttpRequest();
            xhr.open("post", "/user/uploadHeadImage", true);
            xhr.send(formData);

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    alert('success');
                    window.location.reload();
                }
            };
        },
        updateTxt      : function() {

            var self = this;
            $.ajax({
                url      : '/user/changeTxt',
                type     : 'POST',
                data     : {
                    user : self.user
                },
                dataType : 'json',
                success  : function(res) {
                    if(res.msg == 'success') {
                        alert('');
                    } else {
                        alert('sb');
                    }
                }
            });

        }
    }
});

