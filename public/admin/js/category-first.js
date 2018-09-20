$(function() {
    var page = 1;
    var pageSize = 6;
    var pageMax;
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
    $('#prevBtn').on('click',function() {
        if(page <= 1) {
            page = 1;
            alert('已经是第一页了');
            return ;
        }
        page--;
        getPageInfo();
    })
    //封装ajax
    function getPageInfo(){
        $.ajax({
            type:'get',
            url:"/category/queryTopCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize,
            },
            dataType:'json',
            success:function(res){
                console.log(res);
                var html = template('categoryTpl',{cont:res.rows});
                $('#categoryBox').html(html);
                pageMax = Math.ceil(res.total / pageSize);
                console.log(pageMax);

            }
        })
    }


    //添加一级分类按钮
    $('#addCategory').on('click',function() {
        var cont = $('#categoryName').val().trim();
        //console.log(cont);
        if(!cont){
            alert("请输入正确的内容");
            return;
        }
        $.ajax({
            type:'post',
            url:"/category/addTopCategory",
            data:{
                categoryName:cont,
            },
            dataType:'json',
            success:function(res){
                //console.log(res);
                if(res.success) {
                    location.reload();
                }
            }
        })

    })




})