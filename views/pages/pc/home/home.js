var homeEditorVM = new Vue({
    el   : '#page_home',
    data : {
        banner       : {
            img_url : '',
            txt     : ''
        },
        rec_articles : [],
        hot_city     : '',
        search_key   : ''
    },

    compiled : function() {
        var self = this;
        $.ajax({
            url     : '/homeEditorData',
            type    : 'GET',
            success : function(res) {
                self.banner.img_url = res.data.head_img.url;
                self.banner.txt = res.data.head_img.txt;
                self.rec_articles = res.data.rec_articles;
                self.hot_city = res.data.hot_city;
            }

        });
    },
    methods  : {
        goCity   : function() {
            var self = this;

        },
        doSearch : function() {
            var self = this;
            $.ajax({
                url     : '/go/searchDes?city_name=' + self.search_key,
                type    : 'GET',
                success : function(res) {
                    console.log(res.city);
                    window.location.href = '/go/' + res.city.city_id;
                }
            });
        }
    }
});
