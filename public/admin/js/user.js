$(function () {
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:1,
            pageSize:10
        },
        dataType:'json',
        success:function(res) {
            //console.log(res);
            var html = template("userInfo",{info:res.rows});
            //console.log(html);
            $('tbody').html(html);

        }
    })

    $('tbody').on('click','.editKey',function() {
        //console.log(this);
        var id = $(this).data('id');
        var isDelete = Number($(this).data('use'));
        console.log(id,isDelete);
        $.ajax({
            type:'post',
            url:"/user/updateUser",
            data:{
                id:id,
                isDelete:isDelete?0:1,
            },
            success:function(result) {
                //console.log(res);
                if(result.success) {
                    location.reload();
                }
            }
        })
    })

})
