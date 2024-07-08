const _http = require("http");
const _path = require("path");
const _fs = require("fs");
//const { error } = require("console");
//const { connect } = require("http2");
const path = require("path");

const _server = _http.createServer((req, res) => {
    //console.log(`Request URL ${req.url}`)
    const _url = req.url === '/' ? 'tomer_super.jpg' : req.url;
    const filePath = _path.join(__dirname, "public", _url);
    const fileExt = path.extname(filePath);
    console.log(`filePath ${filePath}`);
    let contentType = "";


    switch (fileExt) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        default:
            res.end('Unsupported file type');
            break;
    }

    _fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error === "ENOENT") {
                const errFile = path.join(__dirname, "public", "404.html");
                _fs.readFile(errFile, (error, data) => {
                    res.writeHead(404, { 'Contet-Type': fileExt });
                    res.end(data, 'utf8')
                });
            } else {
                res.writeHead(500);
                res.end(`Server error ${error.code}`)

            }
        } else {
            res.writeHead(200, { 'Contet-Type': fileExt });
            res.end(content, 'utf8');
        }

    });


    // res.end(`testing`)
    res.end(`filePath ${filePath}`)
});

const PORT = 3006;
_server.listen(PORT, () => {
    //console.log(`Server is running  on port ${PORT}`);
})