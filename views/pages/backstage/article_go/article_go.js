/**
 * Created by cola on 15-5-24.
 */
var articleGo = new Vue({
    el       : '#article_go',
    data     : {
        title       : 'title！',

        articles    : [],
        current_article_id : '',
        current_article_city: ''
    },
    compiled : function() {
        var self = this;

        $.ajax({
            url     : '/backstage/getArticleData',
            type    : 'GET',
            success : function(res) {
                self.articles = res.data.articles;
            }
        });
    },
    methods : {
        viewArticle: function (article_id) {
            var self = this;
            self.current_article_id = article_id;
        },
        passArticle: function (res){
            var self = this;
            $.ajax({
                url  :'/backstage/passArticleData',
                type :'POST',
                data :{
                    article_id : self.current_article_id,
                    article_city:self.current_article_city
                },
                success: function(res){
                    if(res.msg == 'success'){
                        alert('发布成功');
                        window.location.reload();
                    }
                }
            });
        },
        unpassArticle: function(res){
            var self = this;
            $.ajax({
                url  :'/backstage/unpassArticleData',
                type :'POST',
                data :{
                    article_id : self.current_article_id
                },
                success: function(res){
                    if(res.msg == 'success'){
                        alert('已驳回');
                        window.location.reload();
                    }
                }
            });
        }


    }
});
