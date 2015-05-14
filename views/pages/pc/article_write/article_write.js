var articleWriteVM = new Vue({
    el     : '#article-write',
    data   : {
        units    : [
            {
                type          : 'text',
                value         : '我的卡上打开机的旮旯健康不哈看的官方卡傲剑狂刀佛本是道。',
                display_order : 1
            }
        ],
        add_unit : {
            active : false,
            type   : '',
            value  : ''
        }
    },
    methods : {
        showAddUnit : function(unit_type) {
            var self = this;
            self.add_unit.active = true;
            self.add_unit.type = unit_type;
        }
    }
});