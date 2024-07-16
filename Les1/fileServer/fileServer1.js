const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Путь к изображению
  const imagePath = path.join(__dirname, 'public', 'tomer_super.jpg');

  // Проверяем, что запрос именно на чтение файла
  if (req.url === '/tomer_super.jpg' && req.method === 'GET') {
    // Читаем файл
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        // Устанавливаем заголовок Content-Type для JPG изображений
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });
  } else {
    // Если запрошен другой URL или метод
    res.writeHead(404, { 'Content-Type': 'contentType' });
    res.end('File not found');
  }
});

// Запускаем сервер на порту 3000
server.listen(3006, () => {
  console.log('Сервер запущен на http://localhost:3006');
});
