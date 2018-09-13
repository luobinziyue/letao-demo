/**
 * Created by qq on 2018-9-13.
 */
$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //一级分类接口
    $.ajax({
        type:'get',
        url:"/category/queryTopCategory",
        data:{},
        dataType:'json',
        success:function(res) {
            //console.log(res);
            var html = template('leftTem',{result:res.rows});
            $(".item").html(html);
        }
    })

    //二级分类接口
    $('.item').on("click","a",function() {
        var id = $(this).data("id");
        $(".item").find('a').removeClass('active');
        $(this).addClass('active');
        //console.log(id);
        $.ajax({
            type:'get',
            url:"/category/querySecondCategory",
            data:{id:id},
            dataType:'json',
            success:function(res) {
                console.log(res);
                var html = template('rigTem',{
                    result:res.rows
                });
                $('.waper').html(html);
            }
        })
    })

})
