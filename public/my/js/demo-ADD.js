
$(function() {
    //三级联动初始化
    var picker = new mui.PopPicker({layer:3});
    //因为是字符串，为了作为判断条件，所以要数值化
    var edit = Number(getParamsByUrl(location.href,"isEdit"));
    //console.log(edit);
    var address = {};
    //判断edit=0/1，如果1则点击编辑按钮跳转过来，如果0，则页面为空
    if(edit && localStorage.getItem("editAddress")) {
        //数组化
        address = JSON.parse(localStorage.getItem("editAddress"));
        console.log(address);
    }
    var html = template("editAddress",address);
    $(".addressBox").html(html);

    //将城市信息引入到里面
    picker.setData(cityData);
    //选择省市区
    $('.selectCity').on('tap',function() {
        picker.show(function(selectItem) {
            //选择省市区
            $('.selectCity').val(selectItem[0].text + selectItem[1].text + selectItem[2].text);
        });
    })
    //点击确认按钮添加地址
    $('.addAddress').on('tap',function() {
        var uname = $('[name="username"]').val().trim();
        var postId = $('[name="postId"]').val().trim();
        var city = $('[name="city"]').val().trim();
        var detail = $('[name="detail"]').val().trim();
        if(!uname) {
            mui.toast('请输入正确的收货人姓名');
            return;
        }
        if(!uname) {
            mui.toast('请输入正确的收货人姓名');
            return;
        }
        if(!postId) {
            mui.toast('请输入正确的邮政编号');
            return;
        }
        if(!detail) {
            mui.toast('请输入详细地址');
            return;
        }
        //点击确认按钮发送ajax请求前先确认是添加请求还是修改请求，两个请求对应的接口不一致
        var data = {
            address:city,
            addressDetail:detail,
            recipients:uname,
            postcode:postId,
        }
        if(edit) {
            //修改地址请求
            var url = "/address/updateAddress";
            data.id = address.id;
        }else{
            //添加地址请求
            var url = "/address/addAddress";
        }

        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:function(res) {
                //console.log(res);
                if(res.success) {
                    if(edit) {
                        mui.toast('修改地址成功');
                    }else {
                        mui.toast('添加地址成功');
                    }

                    setTimeout(function(){
                        location.href= "demo-address.html";
                    },2000);
                }
            }
        })
    })
})