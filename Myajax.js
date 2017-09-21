/**
 * Created by 葱头 on 2017/9/21.
 */
// 原生JS ajax封装库
// 输入属性obj中包含访问类型type，访问地址url，是否异步async，本次传送的参数data(对象)，成功后回调函数success，失败后回调函数fail
// 默认为异步

var Myajax = function (obj) {
    obj = obj || {};
    obj.type = (obj.type == null?'GET':obj.type.toUpperCase());
    obj.url = obj.url || '';
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () { };
    obj.fail = obj.fail || function () { };

    var xmlHttp = this.create();

    if(xmlHttp ==  null || xmlHttp == undefined){
        var str = '您的浏览器不支持ajax啊！换个现代点的浏览器吧！';
        obj.fail(str);
    }else{
        //解析obj.data数据
        var params = [];
        var postdata;
        for (var key in obj.data){
            params.push(key + '=' + obj.data[key]);
        }
        postdata = params.join('&');

        if(obj.type  == 'GET'){
            xmlHttp.open(obj.method,obj.url + '?' + postdata,obj.async);
            xmlHttp.send(null);
        }else if(obj.type  == 'POST'){
            xmlHttp.open(obj.method,obj.url,obj.async);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.send(postdata);
        }
    }

    xmlHttp.onreadystatechange = function () {
        switch (xmlHttp.readyState){
            case 1:
                var str1 = '请求未发送！';
                obj.fail(str1);
                console.log(str1);
                break;
            case 2 :
                var str2 = '服务器未响应！';
                obj.fail(str2);
                console.log(str2);
                break;
            case 3 :
                var str3 = '响应接收不完全！';
                obj.fail(str3);
                console.log(str3);
                break;
            case 4 :
                if(xmlHttp.status > 200 && xmlHttp.status <300 || xmlHttp.status == 304){
                    obj.success(xmlHttp.responseText);
                }
        }
    }

};

Myajax.prototype.create = function () {
    var xmlHttp;
    if(XMLHttpRequest){
        //非IE
        xmlHttp = new XMLHttpRequest();
    }else{
        //IE情况下
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xmlHttp;
};

Myajax.prototype.abort = function () {
    this.xmlHttp.abort();
};


