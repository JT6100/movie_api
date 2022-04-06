const http = require("http"),
  fs = require("fs"),
  url = require("url");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello Node!\n");
    let addr = request.url,
      q = url.parse(addr, true);
    if (q.pathname.includes("documentation")) {
      filepath = "index.html";
    }
    fs.readFile(filepath, (err, datta) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
