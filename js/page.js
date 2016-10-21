/**
 * Created by wx on 2016/10/20.
 */


/**
 * Page 分页组件
 * @param options 配置
 * @constructor 此组件的封装是基于jquery，查询条件是一个form，所有的参数条件都是form中的input元素
 */
function Page(options){
    this.options = options; //配置项
    this.curPage = options.curPage || 1; //当前页码
    this.totalPage = options.totalPage || 10;  //总页码
    this.pageSize = options.pageSize || 10;  //每页条数
    this.elements = options.elements ||{}; //分页元素
    this.fnBindData = options.fnBindData || function(){alert('请传入回调函数！')}; //ajax成功的回调
    this.fail = options.fail; //ajax失败的回调
    this.fnParam = options.fnParam; //提交接口参数处理
    this.init();
}

Page.prototype.init = function (){
    this.getData();
    this.btnBind();

};

//获得分页数据，并展示
Page.prototype.getData = function (){
    var _this = this;
    //先处理参数
    this.fnParam && this.fnParam();
    //请求数据
    $.ajax({
        url:_this.options.url,
        cache:false,
        dataType:'json',
        data:$(_this.elements.form).serialize(),
        success:function (data){
            _this.totalPage = Math.ceil(data.totalCount / _this.pageSize); //设置总页面数
            _this.fnBindData.call(_this,data); //绑定数据
            _this.curPage = $(_this.elements.input).val(); //更新当前页
            _this.pageNumBind(); //页码绑定点击事件
        },
        error:_this.fail
    });
};

//按钮绑定实践
Page.prototype.btnBind = function (){
    var _this = this;
    //首页
    $(_this.elements.first).on('click',function (e){
        _this.curPage = 1;
        $(_this.elements.input).val(_this.curPage);
        _this.getData();
    });

    //上一页
    $(_this.elements.prev).on('click',function (e){
        var page = parseInt(_this.curPage) - 1;

        _this.curPage = page<=1?1:page;
        $(_this.elements.input).val(_this.curPage);
        _this.getData();
    });

    //下一页
    $(_this.elements.next).on('click',function (e){

        var page = parseInt(_this.curPage) + 1;
        _this.curPage = page>=_this.totalPage?_this.totalPage:page;

        $(_this.elements.input).val(_this.curPage);
        _this.getData();
    });

    //尾页
    $(_this.elements.last).on('click',function (e){
        _this.curPage = _this.totalPage;
        $(_this.elements.input).val(_this.curPage);
        _this.getData();
    });

    //input
    $(_this.elements.input).on('keyup',function (e){
        var num = Number(e.target.value);
        //边界判断
        if(isNaN(num) || num < 1){
            num = 1;
        }else if(num > _this.totalPage){
            num = _this.totalPage;
        }
        //设置提交的页码input框的value
        $(this).val(num);

        //如果input不在form标签中，则监测回车键
        if(e.keyCode == 13){
            _this.getData();
        }

    });
};

//页码绑定点击事件
Page.prototype.pageNumBind = function (){
    var _this = this;
    //点击页码
    $(_this.elements.pageListEle+' '+_this.elements.pageNumEle).on('click',function (e){
        _this.curPage = e.target.innerHTML;
        $(_this.elements.input).val(_this.curPage);
        _this.getData();
    })
};

