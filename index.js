const http = require('http');
const app = require('./server/app');
const db = require('./server/db');

const server = http.createServer(app);

const { PORT, MONGO_URI, DB } = process.env;
db.connect(MONGO_URI, DB);
server.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
