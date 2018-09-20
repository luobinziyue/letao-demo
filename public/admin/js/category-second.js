$(function() {
    var page = 1;
    var pageSize = 6;
    var pageMax;
    var preview;
    //页面加载获取分类信息
    getPageInfo();

    //点击下一页跳转到下一页
    $('#nextBtn').on("click",function() {
        if(page >= pageMax) {
            page = pageMax;
            alert('已经是最后一页了');
            return ;
        }
        ++page;
        getPageInfo();

    })
    //点击上一页跳转到上一页
    $('#prevBtn').on("click",function() {
        if(page <= 1) {
            page = pageMax;
            alert('已经是第一页了');
            return ;
        }
        page--;
        getPageInfo();

    })

    function getPageInfo() {
        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(res) {
                console.log(res);
                var html = template('categoryTpl',{cont:res.rows});
                $('#categoryBox').html(html);
                pageMax = Math.ceil(res.total / pageSize);

            }
        })
    }

    //调取一级分类接口获取数据
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100,
        },
        success:function(res) {
            console.log(res);
            var html = template('optionTpl',{sel:res.rows});
            $('.categoryId').html(html);
        }
    })

    //点击上传文件按钮
    $('#fileUpload').fileupload({
        dataType:'json',
        //类似ajax的success
        done:function(e,data) {
            //console.log(data);
            //上传文件预览
            $('#showBrand').attr('src',data.result.picAddr);
            //链接地址
            preview = data.result.picAddr;
        }
    })

    //点击保存按钮
    $('#addCategory').on('click',function() {
        var selected = $('select').val();
        var brandName = $('#brandName').val().trim();
        var brandLogo = $('[name = "file"]').val().trim();
        //console.log(select);
        $.ajax({
            type:'post',
            url:"/category/addSecondCategory",
            data:{
                brandName:brandName,
                categoryId:selected,
                brandLogo:preview,
                hot:0,
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })

    })

})