const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: <c:url value="/"/>,	// 서버 URL or localhost:설정한포트번호
            target: 'http://localhost:11040',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
    // app.use(
    //     '/ws-stomp',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8080',
    //         ws: true
    //     }),
    // )
};