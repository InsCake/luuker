var articleVM = new Vue({
    el       : '#article',
    data     : {
        article     : {},
        add_comment : ''
    },
    compiled : function() {
        var self = this;
        $.ajax({
            url     : $request_urls.getArticleData,
            type    : 'GET',
            success : function(res) {
                self.article = res.data;
            }
        });
    },
    methods  : {
        doAddComment : function() {
            var self = this;
            $.ajax({
                url      : '/article/addComment',
                data     : {

                    comment    : self.add_comment,
                    article_id : self.article.article.article_id
                },
                type     : 'POST',
                dataType : 'json',
                success  : function(res) {
                    if(res.msg == 'success') {
                        window.location.reload();
                    }else{
                        alert('未登录不能评论');
                    }
                }
            });
        }
    }
});