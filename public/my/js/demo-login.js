

$(function() {

    $('.loginBtn').on('tap',function(){
        var uname = $('[name="username"]').val().trim();
        var pwd = $('[name="pwd"]').val().trim();

        $.ajax({
            type: 'post',
            url: "/user/login",
            data: {
                username: uname,
                password: pwd
            },
            beforeSend: function () {
                //  \S 非空白字符
                var reg = /^\S{6,18}$/;
                if (!reg.test(uname) || !reg.test(pwd)) {
                    mui.toast("请输入正确的用户名或密码");
                    return ;
                }
                $('.loginBtn').html('正在登陆...');

            },
            dataType: 'json',
            success: function (res) {
                //console.log(res);
                mui.toast('登陆成功');
                $('.loginBtn').html('登陆');
                setTimeout(function() {
                    location.href = "demo-user.html";
                },2000);
            }
        })


    })



})