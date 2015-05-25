var homeEditorVM = new Vue({
    el       : '#page_home',
    data     : {
        banner : {
            img_url : ''
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
                self.rec_articles = res.data.rec_articles;
            }

        });
    },
    methods  : {}
});
