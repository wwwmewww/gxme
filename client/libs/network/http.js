const METHOD = { GET: 'GET', POST: 'POST' };

function isString(object) {
    return Object.prototype.toString.call(object) === '[object String]';
}

//获取 xhr对象
function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

//格式化参数
function formatParams(data) {
    if (typeof data == 'object') {
        var arr = [];
        for (let name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        // arr.push(("v=" + Math.random()).replace(".", ""));//加随机数
        return arr.join("&");
    }
    return '';
}

////////////////////////////////////////////////////////////////

function ajax(opts) {
    let xhr = createXMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                opts.callback(xhr.responseText); //执行回调
            }
        }
    };

    if (opts.method == 'GET') {
        xhr.open(METHOD.GET, `${opts.url}?${formatParams(opts.data)}`, true); //true为异步，false为同步\
        xhr.send();
    } else {
        xhr.open(METHOD.POST, opts.url, true); //方式、ip端口、是否异步
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(formatParams(opts.data));
    }
}

let http = {};

http.get = function (url, params, callback) {
    ajax({ url: url, data: params, method: 'GET', callback: callback });
};

http.post = function (url, params, callback) {
    ajax({ url: url, data: params, method: 'POST', callback: callback });
};


let j = 0;
http.get('http://127.0.0.1:8090', { aaa: 111, bbb: 222, ccc: 333 }, function (res) {
    document.getElementById("result").innerHTML = 'aaaaaaaaaaa' + (++j);
    console.log('get res', res);
});
http.post('http://127.0.0.1:8090', { "aaa": 444, "bbb": 555, "ccc": 666 }, function (res) {
    document.getElementById("result").innerHTML = 'aaaaaaaaaaa' + (++j);
    console.log('post res', res);
});