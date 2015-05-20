var articleVM = new Vue({
    el       : '#article',
    data     : {
        article : {}
    },
    compiled : function() {
        var self = this;
        $.ajax({
            url     : $request_urls.getArticleData,
            type    : 'GET',
            success : function(res) {
                self.article = res.data;
                console.log(self.article);
            }
        });
    },
    methods  : {}
});