$(function() {
    $('.sign-up a').on('click', function() {
        $('.max-mask').fadeIn();
    })

    $('.login-exit').on('click', function() {
        $('.max-mask').fadeOut();
    })

    $('.login-confirm').on('click', function() {
        var user = {
            'name'     : 'jiji',
            'passward' : 'mimi'
        }
        $.ajax({
            type     : 'POST',
            url      : '/user/login',
            data     : {
                'user' : user
            },
            dataType : 'json',
            success  : function(res) {
                alert(res.user.name + ' / ' + res.user.passward);
            }
        });
    });
});