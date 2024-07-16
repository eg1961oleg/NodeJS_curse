const _http = require('http');
const _path = require('path');
const _fs = require('fs');
let _url;

const _server = _http.createServer((req, res) => {
  _url =
    req.url === '/'
      ? 'tomer_super.jpg'
      : req.url.startsWith('/')
      ? req.url.slice(1)
      : req.url;

  const filePath = _path.join(__dirname, 'public', _url);
  let fileExt = String(_path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
    '.ico': 'image/x-icon',
  };
  let contentType = mimeTypes[fileExt];

  if (!contentType) {
    res.writeHead(415, { 'Content-Type': 'text/plain' });
    res.end('Unsupported file type');
    return;
  }

  _fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const errFile = _path.join(__dirname, 'public', '404.html');
        _fs.readFile(errFile, (err, content) => {
          res.writeHead(404, { 'Contet-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server error ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Contet-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = 3006;
_server.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}`);
});
