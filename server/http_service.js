/*导入需要用到的nodejs库*/
const http = require('http');
// const path = require('path');
const url = require('url');
const qs = require('querystring');

/*导入服务器配置*/
const cfg = { HTTP_PORT: 8090 };

http.createServer((req, res) => {
    //设置跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    //
    var method = req.method.toUpperCase();
    // var pathname = url.parse(req.url).pathname;

    if (method === 'GET') {
        if (req.url !== "/favicon.ico" && req.url !== "") {
            var query = url.parse(req.url, true).query;
            console.log('GET', query,req.url);
            res.end('{"tips": "This is GET Method"}');
        }
    } else if (method === 'POST') {
        let rawData = '';
        req.on('data', (chunk) => { rawData += chunk; });
        req.on('end', () => {
            try {
                var query = qs.parse(rawData);
                console.log('POST', query);
                res.write('{"tips":"This is POST Method"}');
                res.end();
            } catch (e) {
                console.error(e.message);
            }
        });
    } else {
        res.end();
    }
}).listen(cfg.HTTP_PORT, function () {
    console.log("listen on port " + cfg.HTTP_PORT);
});

