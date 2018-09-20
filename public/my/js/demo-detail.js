$(function() {

    //获取结果页面跳转过来的id,根据id调取对应的详细内容
    var id = getParamsByUrl(location.href,'id');
    //console.log(id);
    var num = 0;
    var size;
    var int;
    $.ajax({
        type:'get',
        url:"/product/queryProductDetail",
        data:{
            id:id,
        },
        dataType:'json',
        success:function(res) {
            console.log(res);
            var html = template('detailTpl',res);
            //console.log(html);
            $('.box').html(html);

            num = res.num;

            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

        }
    })
    //选择码数变色
    $('.box').on('tap','.size span',function() {
        $(this).addClass('active').siblings().removeClass('active');
        size = $(this).text();

    })
    //购买数量增加
    $('.box').on('tap', '.increase', function() {
        int = Number($('#text').val());
        int++;
        if(int > num){
            int = num;
        }
        $('#text').val(int);
    })
    //购买数量减少
    $('.box').on('tap', '.reduce', function() {
        int = Number($('#text').val());
        int--;
        if(int < 1) {
            int = 1;
        }
        $('#text').val(int);
    })

    //加入到购物车调取接口
    $('.addCart').on('tap',function() {
        if(!size) {
            mui.toast('请选择尺码!');
            return;
        }
        //console.log(int);
        $.ajax({
            type:'post',
            url:"/cart/addCart",
            data:{
                productId:id,
                num:int,
                size:size,
            },
            success:function(res) {
                if(res.success) {
                   mui.confirm('加入购物车成功,跳转到购物车吗？',function(message){
                       if(message.index==1) {
                           location.href = "demo-cart.html";
                       }
                       else{
                           location.reload()
                       }
                   });

                }
            }
        })

    })


})