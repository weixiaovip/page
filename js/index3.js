/**
 * Created by wx on 2016/10/20.
 */

$(function (){
   //清空按钮
    $('.dateClean').on('click',function (e){
        $(this).siblings('input').val('');
    });

    var urlPre = 'http://dptest.maimaiche.com/ucdp';
    var url = urlPre + '/queryADResultByWebSite.do';
    //var url = './json/data2.json';
    var exportUrl = urlPre + '/lcwa/exportADResultByWebSite.do';


    //获得数据和绑定数据函数
    function getDataToBind(){

        $.ajax({
            url:url,
            cache:false,
            dataType:'json',
            data:$('.form').serialize(),
            success:function (data){

                var str = '';
                $.each(data,function (index,cur){
                    str += '<tr class="'+ (index%2?'':'even') +'">';
                    str += '<td class="rol1">'+ (typeof (cur.utmSource) == 'undefined'?'无':cur.utmSource) +'</td>';
                    str += '<td class="rol1">'+ (typeof (cur.zhuce) == 'undefined'?'无':cur.zhuce) +'</td>';
                    str += '<td class="rol1">'+ (typeof (cur.liuzi) == 'undefined'?'无':cur.liuzi) +'</td>';
                    str += '<td class="rol1">'+ (typeof (cur.goutong) == 'undefined'?'无':cur.goutong) +'</td>';
                    str += '</tr>'
                });

                console.log(str);
                $('.listInfo').html(str);
            },
            error:function (data){
                console.log('ajax失败',data);
            }
        });

    }


    //查询按钮
    $('.btnQuery').on('click',function (e){
        getDataToBind();
    });

    //导出按钮
    $('.btnExport').on('click',function (e){
        var param = '?'+ $('.header').serialize();
        window.location.href = exportUrl + param;
    });

    getDataToBind();

});