/**
 * Created by qq on 2018-9-13.
 */
$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    });

    //һ������ӿ�
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

    //��������ӿ�
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