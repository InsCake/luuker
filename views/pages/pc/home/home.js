var homeEditorVM = new Vue({
    el       : '#main-banner',
    data     : {
        banner : {
            img_url : ''
        }
    },

    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/backstage/homeEditorData',
            type    : 'GET',
            success : function(res) {
                self.banner.img_url = res.data.head_img.url;
            }

        });
    },
    methods  : {}
});
