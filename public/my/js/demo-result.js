$(function() {

    var key = getParamsByUrl(location.href,"keyword");
    //console.log(key);

    $.ajax({
        type:'get',
        url:"/product/queryProduct",
        data:{
            page:1,
            pageSize:6,
            key:key
        },
        dataType:'json',
        success:function(res) {
            //console.log(res);
            var html = template('productTem',{content:res.data});
            //console.log(html);
            $('.result').html(html);
        }
    })



})

function getParamsByUrl(url,name) {
    //截取问号之后的字符串
    var params = url.substr(url.indexOf("?")+1);
    var param = params.split('&');

    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        console.log(current);
        if(current[0] == name) {
            return current[1];
        }
    }
    return null ;

}
//console.log(param);
//经过试验及查询，forEach没有办法跳出循环，ruturn无效
//param.forEach(function(value,index) {
//    var current = value.split('=');
//    console.log(current);
//    if(current[0] == name) {
//        return current[1];
//    }
//});