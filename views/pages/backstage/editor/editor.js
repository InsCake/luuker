/**
 * Created by cola on 15-5-19.
 */

var homeEditorVM = new Vue({
    el: '#home_editor',
    data: {
        banner: {
            img_url: '',
            new_img_url: '',
            new_txt:''
        },
        rec_articles: [],
        new_article : {
            new_id : ''
        },
        current_rec : -1
    },
    compiled: function () {
        var self = this;
        $.ajax({
            url: '/backstage/homeEditorData',
            type: 'GET',
            success: function (res) {
                self.banner.img_url = res.data.head_img.url;
                self.rec_articles = res.data.rec_articles;
            }
        });
    },

    methods: {
        goEditimg: function () {
            var self = this;

            $.ajax({
                url: "/backstage/changeHomeBanner",
                type: 'POST',
                data: {
                    url: self.banner
                },
                datatype: "json",
                success: function (res) {
                    if (res.msg == 'success') {
                        $('#edit-headimg').modal('hide')
                        window.location.reload();
                    }
                }
            })
        },
        goEditingTxt: function(){
            var self = this;
            $.ajax({
                url: "/backstage/changeHomeTxt",
                type: 'POST',
                data: {
                    txt: self.banner
                },
                datatype: "json",
                success: function (res) {
                    if (res.msg == 'success'){
                        alert('修改成功');
                    }
                }
            })
        },
        showInput: function(index){
            this.current_rec = index;
        },
        updateRec: function(rec_id){
            var self = this;
            $.ajax({
                url:"/backstage/changeRecArticle",
                type:'POST',
                data:{
                   rec_id : rec_id,
                   new_id : self.new_article.new_id
                },
                datatype:'json',
                success:function(res){
                    if(res.msg == 'success'){
                        alert('ok');
                        window.location.reload();
                    }
                }
            });

        }

    }
});

