var articleWriteVM = new Vue({
    el      : '#article-write',
    data    : {
        units    : [
            {
                type  : 'p-title',
                value : '今年说什么我也要去一趟日本'
            },
            {
                type  : 'text',
                value : '在哲学上，目标是提供通过尽可能简单的API来实现的双向数据绑定和可组合的视图组件的好处。它不是一个完整的框架 - 它被设计成一个简单的灵活的视图层。你可以单独它来快速进行原型设计，也可以和其他库结合使用来自定义前端。它也是无后端服务的例如Firebase的天作之合。'
            }
        ],
        add_unit : {
            type  : '',
            value : ''
        }
    },
    methods : {
        showAddUnit    : function(unit_type) {
            this.add_unit.type = unit_type;
        },
        addArticleUnit : function() {
            if(this.add_unit.type == 'image') {
                var formData = new FormData();
                var file = document.querySelector('.image-input').files[0];
                formData.append('upload', file);

                var xhr = new XMLHttpRequest();
                xhr.open("post", "/upload/images", true);
                xhr.send(formData);

                xhr.onreadystatechange = function() {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        alert(xhr.statusText);
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
        onImagesSelect : function(e) {
            var self = this,
                image = e.target.files[0];
            var WINURL = window.URL || window.webkitURL;
            self.add_unit.value = WINURL.createObjectURL(image);
        }
    }
});