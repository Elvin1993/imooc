var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  console.log(__filename, __dirname, http.METHODS);
	res.end('Hello w33orld\n');

  
  

}).listen(3001);

console.info('服务已启动, 端口3001');
