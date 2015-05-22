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

    $('.alter-mail').on('click',function(){
        $(this).hide();
        $('#mail_show').hide();
        $('#email').show();
    });

    $('.alter-sch').on('click',function(){
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
            name  : '',
            oname : '',
            opwd  : '',
            npwd1 : '',
            npwd2 : '',
            title : '',
            mail  : '',
            school: '',
            nmail : '',
            nschool:''
        },
        current_tab : 'user_info',
        a : { text : '' }
    },
    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/user/showUserName',
            type    : 'POST',
            success : function(res) {
                self.user.oname = res.msg;
            }
        });

        $.ajax({
            url     : '/user/showUserArticle',
            type    : 'POST',
            success : function(res) {
                self.user.title = res.msg;
            }
        })

        $.ajax({
            url     : '/user/showUserTxt',
            type    : 'POST',
            success : function(res) {
                self.user.mail = res.mail;
                self.user.school = res.school;
                self.user.nmail = res.mail;
                self.user.nschool = res.school;

                if(res.mail == ''){
                    self.a.text = '添加';
                }else{
                    self.a.text = '修改';
                }

                if(res.school == ''){
                    self.a.text = '添加';
                }else{
                    self.a.text = '修改';
                }
            }
        })
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
                }
            };
        },
        updatePwd : function() {
            var self = this;
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
                        alert('sb');
                    }
                }
            });
        },
        updateTxt : function() {

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

