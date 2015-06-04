var articleWriteVM = new Vue({
    el      : '#article-write',
    data    : {
        units    : [],
        add_unit : {
            type  : '',
            value : ''
        },
        banner   : 'http://hitour.qiniudn.com/aa7385576820bceafbff649897579a86.jpg',
        the_user    : {}
    },
    compiled : function(){
        var self = this;

        $.ajax({
            url     : '/user/getUserData',
            type    : 'GET',
            success : function(res){
                self.the_user = res.data.user;
            }
        })
    },
    methods : {
        showAddUnit     : function(unit_type) {
            this.add_unit.type = unit_type;
        },
        addArticleUnit  : function() {
            var self = this;
            if(this.add_unit.type == 'image') {
                var formData = new FormData();
                var file = document.querySelector('.image-input').files[0];
                formData.append('upload', file);

                var xhr = new XMLHttpRequest();
                xhr.open("post", "/upload/images", true);
                xhr.send(formData);

                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        self.add_unit.value = xhr.response;
                        self.units.push({
                            type  : self.add_unit.type,
                            value : self.add_unit.value
                        });
                        self.add_unit.type = '';
                        self.add_unit.value = '';
                    }
                };
                return;
            }
            this.units.push({
                type  : this.add_unit.type,
                value : this.add_unit.value
            });
            this.add_unit.type = '';
            this.add_unit.value = '';
            //WINURL.revokeObjectURL(this.add_unit.value);
        },
        onImagesSelect  : function(e) {
            var self = this,
                image = e.target.files[0];
            var WINURL = window.URL || window.webkitURL;
            self.add_unit.value = WINURL.createObjectURL(image);
        },
        submitArticle   : function() {
            var self = this;
            $.ajax({
                url      : '/backstage/add_guide',
                type     : 'POST',
                dataType : 'json',
                data     : {
                    article : {
                        name   : $('#article_name').html(),
                        banner : self.banner,
                        units  : self.units,
                        head   : self.the_user.img
                    },
                },
                success  : function(res) {
                    alert('上传成功');
                }
            })
        },
        uploadHeadImage : function() {
            $('#article_banner').click();
        },
        stopEvent       : function(e) {
            e.stopPropagation();
        },
        onBannerSelect  : function() {
            var self = this;
            var formData = new FormData();
            var file = document.getElementById('article_banner').files[0];
            formData.append('upload', file);

            var xhr = new XMLHttpRequest();
            xhr.open("post", "/upload/images", true);
            xhr.send(formData);

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    self.banner = xhr.response;
                }
            };
        }
    }
});