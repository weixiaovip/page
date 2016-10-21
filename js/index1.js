/**
 * Created by wx on 2016/10/20.
 */

$(function (){
   //清空按钮
    $('.dateClean').on('click',function (e){
        $(this).siblings('input').val('');
    });

    var urlPre = 'http://dptest.maimaiche.com/ucdp';

    var url = urlPre + '/lcwa/queryTransformDetailList.do';
    //var url = './json/data1.json';
    var exportUrl = urlPre + '/lcwa/exportTransformDetailList.do';

    var options = {
        pageSize:10,
        curPage:1, //当前页
        url: url, //请求接口地址
        elements:{ //jquery获取分页元素的对象
            first:'.firstPage', //第一页按钮
            prev:'.prevPage', //上一页按钮
            next:'.nextPage', //下一页按钮
            last:'.lastPage', //最后一页按钮
            pageListEle:'.pageNumList', //页码容器的元素
            pageNumEle:'li', //页码元素
            input:'.inputPage', //页码输入框
            form:'.header' //提交数据的表单
        },
        fnParam:fnParam,
        fnBindData:fnBindData,
        fail:function(data){
            console.log('获取数据失败！',data);
        }
    };

    function fnParam(){
        //pageSize
        //$('.pageSize').val(options.pageSize);
        //数据偏移量
        var inputPage = $('.inputPage').val();
        var startIndex = inputPage >= 1?(inputPage-1)*options.pageSize:0;
        $('.startIndex').val(startIndex);

    }

    function fnBindData(data){
        if(Object.prototype.toString.call(data) != "[object Object]"){
            console.log('返回数据不是对象！');
            return ;
        }

        var str = '';
        $.each(data.list,function (index,cur){
            str += '<tr class="'+ (index%2?'':'even') +'">';
            str += '<td class="rol1">'+ (typeof (cur.transformName) == 'undefined'?'无':cur.transformName) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.sourceSite) == 'undefined'?'无':cur.sourceSite) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.timeStr) == 'undefined'?'无':cur.timeStr) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.ip) == 'undefined'?'无':cur.ip) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.utmSource) == 'undefined'?'无':cur.utmSource) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.utmMedium) == 'undefined'?'无':cur.utmMedium) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.utmContent) == 'undefined'?'无':cur.utmContent) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.utmCampaign) == 'undefined'?'无':cur.utmCampaign) +'</td>';
            str += '<td class="rol1">'+ (typeof (cur.utmTerm) == 'undefined'?'无':cur.utmTerm) +'</td>';
            str += '</tr>'
        });

        $('.listInfo').html(str);

        //绑定页码
        str = '';
        var totalPage = Math.ceil(data.totalCount/options.pageSize);
        var begin = 1;

        var curNum = parseInt($('.inputPage').val());
        if(!curNum){ //如果页码输入input没值
            curNum = 1;
            $('.inputPage').val(1);
        }

        //处理多页
        begin = curNum - 2;
        if(begin < 1){
            begin = 1;
        }

        if(begin > 2){
            str += '<li>'+ 1 +'</li>'
            str += '<b>...</b>'
        }
        end = curNum + 2>totalPage?totalPage:curNum + 2;

        for(var i=begin; i<=end; i++){
            if(i == curNum){
                str += '<li class="cur">'+ i +'</li>'
            }else{
                str += '<li>'+ i +'</li>'
            }

        }

        if(i < totalPage){
            str += '<b>...</b>';
            str += '<li>'+ totalPage +'</li>'

        }

        $(options.elements.pageListEle).html(str);
    }

    //创建分页实例
    var page = new Page(options);

    //查询按钮
    $('.btnQuery').on('click',function (e){
        $('.inputPage').val(1);
        page.getData();
    });

    //导出按钮
    $('.btnExport').on('click',function (e){
        var startTime = $('#startTime').html();
        var endTime = $('#endTime').html();
        window.location.href = exportUrl + '?startTime='+startTime+'&endTime='+endTime;
    });


});