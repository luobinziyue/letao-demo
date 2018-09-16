/*如果ajax在$加载括号里面，那么就是等user页面都加载完后再跳转到登陆页面，这样一来用户体验不好，同时，因为ajax是异步请求，所以这个功能加载完后，会继续加载html页面里的内容，所以这里要把ajax改成同步请求*/
//但是这里碰到了一个bug，退回到登陆界面后，输入信息登陆后无法进入到个人中心页面，仍是返回到空白的登陆界面，这个看后期会不会有解决的办法。
var userInfo = null;

$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    async: false,//改成同步请求
    success:function(res) {
        console.log(res);
        if(res.error && res.error == 400) {
            location.href = "demo-login.html";
        }
        userInfo = res;
    }
})

$(function() {
    $('.logout').on('click',function() {
        $.ajax({
            type:'get',
            url:"/user/logout",
            data:{},
            dataType:'json',
            success:function(res) {
                console.log(res);
                if(res.success){
                    mui.toast('退出登录成功');
                    setTimeout(function(){
                        location.href="demo.html";
                    },2000);
                }
            }
        })
    })



    var html = template("userInfo",userInfo);
    $('.user').html(html);

})