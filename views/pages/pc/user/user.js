$(document).ready(function() {
    $(".head-edit-txt").mouseover(function() {
        $('.head-edit').css("opacity", "0.5");
    });
    $(".head-edit-txt").mouseout(function() {
        $(".head-edit").css("opacity", "1");
    });

    //$('.nav').on('click', function() {
    //    $('.nav').css('font-weight', 'normal');
    //    $(this).css('font-weight', 'bolder');
    //});

    $('.nav').on('click', function() {
        var i = $(this).index();
        $('.nav-cont').removeClass('active').eq(i).addClass('active');
    });
});

var userVM = new Vue({
    el       : '#page_user',
    data     : {
        title       : 'title！',
        user        : {
            name  : '',
            oname : ''
        },
        current_tab : 'user_info'
    },
    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/user/showUserName',
            type    : 'POST',
            success : function(res) {
                self.user.oname = res.msg;
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
        }
    }
});

var articleshowVM = new Vue({
    "el"     : '#user_article',
    data     : {
        title   : 'title！',
        article : {
            title : ''
        }
    },
    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/user/showUserArticle',
            type    : 'POST',
            success : function(res) {
                self.article.title = res.msg;
            }
        })
    }
})

var changepwdVM = new Vue({
    el      : '#update_pwd',
    data    : {
        title : 'title！',
        user  : {
            opwd  : '',
            npwd1 : '',
            npwd2 : ''
        }
    },
    methods : {
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
        }
    }
});