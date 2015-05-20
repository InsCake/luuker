/**
 * Created by cola on 15-5-19.
 */
var homeEditorVM = new Vue({
    el: '#home_editor',
    data: {
        banner: {
            img_url: '',
            new_img_url: ''
        }
    },
    compiled: function () {
        var self = this;
        $.ajax({
            url: '/backstage/homeEditorData',
            type: 'GET',
            success: function (res) {
                self.banner.img_url = res.data.banner_image_url;
            }

        })
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
                        $('#edit-headimg').hide();
                        window.location.reload();
                    }
                }
            })
        }
    }
});