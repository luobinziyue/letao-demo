$(function() {

    $('body').on('tap','a',function() {
        mui.openWindow({
            url: $(this).attr('href'),
        })
    })


})

//��ȡ����?��������� ���о���ΪʲôҪ�������������$(����
function getParamsByUrl(url, name) {
    //��ȡ�ʺ�֮����ַ���
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