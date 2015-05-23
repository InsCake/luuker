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
    method  :{
        intoCity    : function() {
            var self = this;

            $.ajax({
                url     : '/backstage/intoCityData',
                type    : 'GET',
                success : function() {
                    if(res.msg == 'success'){
                        alert('添加成功！');
                    }
                }
            });
        }
    }
});
