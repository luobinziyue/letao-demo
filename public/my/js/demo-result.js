
var key = getParamsByUrl(location.href, "keyword");
//注意作用域
var html = "";
var page = 1;
var priceSort =1;
var that = "";
//加载页面时mui会自动上拉加载一次，发生在price点击事件之前
$(function () {

    mui.init({
        pullRefresh: {
            container: refCont,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getMore, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //调整价格升降序
    //选择价格排序后，页面重新从第一页开始排版，html初始化，page初始化,重启上拉刷新
    $(".price").on('tap',function() {
        priceSort = priceSort == 1 ? 2 : 1;
        html = "";
        page = 1;
        //注意：refresh()中需传入true
        mui('#refCont').pullRefresh().refresh(true);
        getMore();

    })
})

//ajax请求
function getMore() {
    //这个操作的意义是that为空时，就会这个判断，以后this指针都会指向mui的d对象，然后赋值给that，that的值不会再变动
    if(!that) {
        that = this;
    }

    console.log(that);  //指向的是mui d对象

    $.ajax({
        type: 'get',
        url: "/product/queryProduct",
        data: {
            page: page++,
            pageSize: 2,
            key: key,
            price: priceSort
        },
        dataType: 'json',
        success: function (res) {
            //console.log(this); 指向的是window对象
            //console.log(res);
            if(res.data.length > 0) {
                html += template('productTem', {content: res.data});

                $('.result').html(html);
                that.endPullupToRefresh(false); //有反应，就是网速太快了显不出来
                //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
                //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                //这里this原指向window对象，现指向的是getMore()里的指针
            }
            else {
                that.endPullupToRefresh(true);
            }
        }
    })

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