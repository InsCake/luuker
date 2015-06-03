/**
 * Created by cola on 15-5-23.
 */
var cityEditorVM = new Vue({
    el: '#city_editor',
    data: {
        city: {
            title       : 'title！',
            chname      : '',
            egname      : '',
            img         : '',
            intro       : '',
            book        : ''
        },

        city_item: {
            id      : '',
            type    : '',
            title   : '',
            txt     : '',
            img     : ''
        }
    },
    methods  :{
        intoCity    : function() {
            var self = this;

            $.ajax({
                url     : '/backstage/intoCityData',
                type    : 'POST',
                data     : {
                    city : self.city
                },
                dataType : 'json',
                success : function(res) {
                    if(res.msg == 'success'){
                        alert('添加成功！');
                    }
                }
            });
        },

        intoCityItem    : function(){
            var self = this;

            $.ajax({
                url     :'/backstage/intoCityItem',
                type    :'POST',
                data    :{
                    city_item : self.city_item
                },
                datatype: 'json',
                success : function(res) {
                    if(res.msg == 'success'){
                        alert('添加成功！');
                    }
                }
            })

        },
        doUploadItem   : function() {
            $('#item_img').click();
        },
        onItemSelected : function() {
            var self = this;
            var formData = new FormData();
            var file = document.getElementById('item_img').files[0];
            formData.append('upload', file);

            var xhr = new XMLHttpRequest();
            xhr.open("post", "/backstage/uploadItemImage", true);
            xhr.send(formData);

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    self.city_item.img = xhr.response;
                }
            };
        }
    }
});
