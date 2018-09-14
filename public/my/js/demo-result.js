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
    //��ȡ�ʺ�֮����ַ���
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
//�������鼰��ѯ��forEachû�а취����ѭ����ruturn��Ч
//param.forEach(function(value,index) {
//    var current = value.split('=');
//    console.log(current);
//    if(current[0] == name) {
//        return current[1];
//    }
//});