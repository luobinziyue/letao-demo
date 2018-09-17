$(function() {
    var newPass,confirmPass;

    //确认密码一致
    $('[name="confirmPass"]').blur(function() {
        newPass = $('[name="newPass"]').val().trim();
        confirmPass = $('[name="confirmPass"]').val().trim();

        if(newPass != confirmPass) {
            mui.toast('两次输入的密码不一致');
            return ;
        }
    })
    //调取验证码接口
    $('#v-code').on('tap',function() {
        $.ajax({
            type:'get',
            url:"/user/vCodeForUpdatePassword",
            data:{},
            dataType:'json',
            success:function(res) {
                console.log(res.vCode);
            }
        })
    })

    //调取修改密码成功后跳转接口
    $('.modified').on('tap',function() {
        var pwd = $('[name="pwd"]').val().trim();
        var vcode = $('#code').val().trim();
        if(!pwd) {
            mui.toast('请输入原密码');
            return ;
        }
        if(!vcode) {
            mui.toast('请输入验证码');
        }

        $.ajax({
            url:"/user/updatePassword",
            type:'post',
            data:{
                oldPassword:pwd,
                newPassword:newPass,
                vCode:vcode
            },
            dataType:'json',
            success:function(result) {
                console.log(result);
                if(result.success) {
                    mui.toast("修改密码成功");
                    setTimeout(function(){
                        location.href = "demo-login.html";
                    },2000);

                }
            }



        })

    })

})