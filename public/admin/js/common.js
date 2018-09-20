//登陆拦截
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	async:false, //改成同步
	success:function(result){
		if(result.error && result.error == 400){
			location.href = "login.html";
		}
	}
})
$(function(){

	// 登出
	$('.logout').on('click',function(){
		if(confirm("确定要退出吗？")) {
			$.ajax({
				type:'get',
				url:'/employee/employeeLogout',
				success:function(result){
					console.log(result)
					if(result.success){
						location.href = "login.html";
					}else{
						alert('登出失败');
					}
				}
			})
		}



	});

	//分类列表的下拉与隐藏
	var navLi = $('.navs li')

	navLi.on('click',function(){
        //slideToggle()
		$(this).find('ul').slideToggle();

	});


});