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

var changenameVM = new Vue({
    el: '#name_edit',
    data: {
        title: 'title！',
        user: {
            name: '',
            oname:''
        }
    },
    compiled: function (){
        var self = this;
        $.ajax({
            url: '/user/showUserName',
            type: 'POST',
            success: function (res) {
                self.user.oname = res.msg;
            }
        })
    },
    methods: {
        changeHead: function () {
            var self = this;
            $.ajax({
                url: '/user/nameEditorData',
                type: 'POST',
                data: {
                    user: self.user
                },
                dataType: 'json',
                success: function (res) {
                        alert('修改成功') ;
                    $('.name-edit span').text(res.msg);
                }
            });
        }
    }
});

var articleshowVM = new Vue({
    "el": '#user_article',
    data:{
        title: 'title！',
        article: {
            title: ''
        }
    },
    compiled: function (){
        var self = this;
        $.ajax({
            url: '/user/showUserArticle',
            type: 'POST',
            success: function (res) {
                self.article.title = res.msg;

            }
        })
    }
})

var changepwdVM = new Vue({
    el: '#update_pwd',
    data: {
        title: 'title！',
        user: {
            opwd: '',
            npwd1:'',
            npwd2:''
        }
    },
    methods: {
        updatePwd: function () {
            var self = this;
            $.ajax({
                url: '/user/changePwd',
                type: 'POST',
                data: {
                    user: self.user
                },
                dataType: 'json',
                success: function (res) {
                    if (res.msg == 'success'){
                        alert('修改成功') ;
                        window.location.reload();
                    }else{
                        alert('sb');
                    }
                }
            });
        }
    }
});