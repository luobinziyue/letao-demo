$(function() {
    //输入用户信息进行验证
    var uname,pnum;

    $("#username").blur(function() {
        uname = $("#username").val().trim();
        var reg = /^\w{6,18}$/;
        if(!reg.test(uname)) {
            mui.toast('请输入正确的用户名');
            return false;
        }
    })
    $("#phone").blur(function() {
        pnum =$("#phone").val().trim();
        var reg = /^1\d{10}$/;
        if(!reg.test(pnum)) {
            mui.toast('请输入正确的手机号');
            return false;
        }
    })

    //调取认证码接口
    $('#v-code').on('tap',function() {
        $.ajax({
            type:"get",
            url:"/user/vCode",
            data:{},
            dataType:'json',
            success:function(res) {
                console.log(res.vCode);
            }
        })
    })

    //移动端用轻敲事件
    $('.register').on('tap',function() {

        var pwd = $("#pwd").val().trim();
        var againP = $("#againP").val().trim();
        var vCode = $('#code').val().trim();

        $.ajax({
            type:'post',
            url:"/user/register",
            data:{
                username:uname,
                password:pwd,
                mobile:pnum,
                vCode:vCode,
            },
            dataType:'json',
            success:function(res) {
                console.log(res);
                if(res.success) {
                    mui.toast('注册成功');
                    setTimeout(function(){
                        location.href = "demo-login.html";
                    },2000);
                }
            }
        })
    })

})


//function addCheck(elementId,reg,tip) {
//    var element = document.getElementById(elementId);
//    element.onblur = function() {
//        if(!reg.test(this.value)) {
//            'mui.toast('+tip+')';
//        }
//    }
//}