
//进行登陆界面的验证拦截，如果已经登陆过了直接跳往user界面
$.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    async:false,
    success:function(res) {
        if(res.success) {
            location.href = "user.html";
        }
    }
})
$(function () {
    var uname;
    //验证用户名是否有输入
    $('input[type = "text"]').blur(function () {
        uname = $('input[type = "text"]').val().trim();
        if (!uname) {
            confirm('请输入正确的用户名');
            return;
        }
    })
    //登陆按钮调取登陆接口
    $('#loginBtn').on('click',function() {
        var pwd = $('input[type = "password"]').val().trim();
        $.ajax({
            type:'post',
            url:"/employee/employeeLogin",
            data:{
                username:uname,
                password:pwd,
            },
            success:function(res) {
                //console.log(res);
                if(res.success) {
                    location.href = "user.html";
                }
                else{
                    alert(res.message);
                }
            }
        })
    })

})