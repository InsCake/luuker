/**
 * Created by cola on 15-5-3.
 */
$(function(){
    $('.nav').on('click',function() {
        $('.nav').removeClass('active');
        $(this).addClass('active');
    });

    $('.nav').on('click',function(){
        var i = $(this).index();
        $('.nav-cont').removeClass('active').eq(i).addClass('active');
    });
});


var goVM = new Vue({
    el       : '#page_des',
    data     : {
        title       : 'title！',
        the_des    : {},
        city_articles:[],
        city_food:'',
        city_sight:'',
        city_culture:'',
        city_school:'',
        official:''

    },
    compiled : function() {
        var self = this;

        $.ajax({
            url     : $request_urls.getDesData,
            type    : 'GET',
            success : function(res) {
                self.the_des = res.data.des;
                self.city_articles = res.data.city_articles;
                self.city_food = res.data.city_food;
                self.city_sight = res.data.city_sight;
                self.city_culture = res.data.city_culture;
                self.city_school = res.data.city_school;
                self.official = res.data.official;
                console.log(res.data.official.article_id)
            }
        });
    },
    methods  : {

    }

});
