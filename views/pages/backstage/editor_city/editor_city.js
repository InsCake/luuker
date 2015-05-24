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
        }
    }
});
