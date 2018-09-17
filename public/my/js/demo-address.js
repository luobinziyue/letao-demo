$(function() {

    var address = null;
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
            $('.queryAddress').html(html);
            //console.log(html);
            address = res;

        }


    })

    //删除收货地址 ,因为用了模板引擎，所以要用事件委托
    $('#editAddress').on('tap','.del',function(){
        var id = $(this).data("id");
        //为什么这里要下标值，因为swipeoutClose（）括号里是dom对象，jquery得到的是个伪数组，所以后面要加下标值
        var li = $(this).parent().parent()[0];
        mui.confirm("确认要删除吗?",function(mes) {
            //console.log(mes); index 0/1
            if(mes.index == 1) {
                $.ajax({
                    type:'post',
                    url:"/address/deleteAddress",
                    data:{id:id},
                    dataType:'json',
                    success:function(res){
                        //console.log(res);
                        if(res.success) {
                            mui.toast('删除成功');
                            setTimeout(function(){
                                //重新加载
                                location.reload();
                            },1000);
                        }
                    }
                })
            }else{
                //取消删除
                //关闭列表
                mui.swipeoutClose(li);
            }
        });
    })

    //编辑收货地址
    //跳转到收货地址编辑页面，
    $('#editAddress').on('tap','.edit',function(){

        var id = $(this).data('id');
        for (var i = 0; i < address.length; i++) {
            if(address[i].id == id) {
                //序列化后本地存储
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                break; //终止循环
            }
            location.href = "demo-addAddress.html?isEdit=1";
        }
    })
})