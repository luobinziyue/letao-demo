$(function() {
    var imgArr = [];

    //页面加载时调取接口渲染页面内容
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:1,
            pageSize:10,
        },
        dataType:'json',
        success:function(res) {
            //console.log(res);
            var html = template('productTpl',{cont:res.rows});
            //console.log(html);
            $('#productBox').html(html);

        }
    })

    //产品品牌调取查询二级分类
    $.ajax({
        type:'get',
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100,
        },
        success:function(res) {
            console.log(res);
            var html = template('brandTpl',{cont:res.rows});
            $('#brandName').html(html);
        }
    })
    //添加图片文件按钮
    $('#fileUpload').fileupload({
        dataType:'',
        done:function(e,data) {
            imgArr.push(data.result);
        }
    })

    //添加按钮调取接口
    $('#addProduct').on('click',function() {
        var brandId = $('#brandName').val();
        var option = $('#productName').val();
        var descript = $('#productDescription').val().trim();
        var num = $('#productNum').val().trim();
        var size = $('#productSize').val().trim();
        var old = $('#productOriginPrice').val().trim();
        var now = $('#productNowPrice').val().trim();
        $.ajax({
            type:'post',
            url:"/product/addProduct",
            data:{
                proName:option,
                oldPrice:old,
                price:now,
                proDesc:descript,
                size:size,
                statu:1,
                num:num,
                brandId:brandId,
                pic:imgArr,
            },
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.reload();
                }
                else{
                    alert('输入错误！');
                }

            }
        })





    })
})