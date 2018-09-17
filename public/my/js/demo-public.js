$(function() {

    $('body').on('tap','a',function() {
        mui.openWindow({
            url: $(this).attr('href'),
        })
    })


})

//截取链接?后面的内容 还有就是为什么要把这个函数放在$(外面
function getParamsByUrl(url, name) {
    //截取问号之后的字符串
    var params = url.substr(url.indexOf("?") + 1);
    var param = params.split('&');

    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        //console.log(current);
        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}