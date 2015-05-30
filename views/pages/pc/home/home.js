var homeEditorVM = new Vue({
    el       : '#page_home',
    data     : {
        banner : {
            img_url : '',
            txt:''
        },
        rec_articles: []
    },

    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/backstage/homeEditorData',
            type    : 'GET',
            success : function(res) {
                self.banner.img_url = res.data.head_img.url;
                self.banner.txt = res.data.head_img.txt;
                self.rec_articles = res.data.rec_articles;
            }

        });
    },
    methods  : {
        goCity: function(){
            var self = this;

        }
    }
});
