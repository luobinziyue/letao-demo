$(function() {
    //调取查询用户收货地址接口
    $.ajax({
        type:'get',
        url:"/address/queryAddress",
        data:{},
        dataType:'json',
        success:function(res) {
            //是个数组
            console.log(res);
            var html = template("addressTpl",{result:res});
            $('#queryAddress').html(html);

            //console.log(html);

        }


    })
})