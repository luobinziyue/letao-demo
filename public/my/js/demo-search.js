$(function() {
    $("#btn").on('click',function() {
        var keywords = $(this).siblings('input').val();

        if(keywords) {
            keyArr.unshift(keywords);
            //本地存储，比sessionStorage要好，这里存放所有关键字，即是数组，不是单次的关键词，犹豫localStorage里只能存放字符串，所以要把keyArr转换成字符串。
            window.localStorage.setItem('keywords',JSON.stringify(keyArr));

            location.href = "demo-result.html?keyword=" + keywords;
        }
        else {
            console.log("请输入关键字");
        }
    })

    var keyArr = [];

    //将搜索记录保存到页面上
    if(window.localStorage.getItem('keywords')) {
        keyArr = JSON.parse(localStorage.getItem('keywords'));
        console.log(keyArr);
        //var html = template('searchHis',{key:keyArr});
        var html = template('searchHis',{key:keyArr});
        //console.log(html);
        $('.history').html(html);

    }

    //清空历史记录，给清空历史添加点击事件
    $('.clear').on('tap',function() {
        $('.history').html('');
        localStorage.removeItem('keywords');
        keyArr.length = 0;

    })
})