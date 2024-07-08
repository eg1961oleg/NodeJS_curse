const _http = require('http');
const _server = _http.createServer((req, res) => {

    res.end(`Hello`)
});

const PORT = 3000;
_server.listen(PORT,() => {
    console.log(`Server is running  on port ${PORT}`);
   
} )