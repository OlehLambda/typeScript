const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 3000 + i
    });
  }
  return setupPrimary();
}
async function main() {
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT,
      time TEXT,
      file BLOB,
      visits INTEGER
    )
  `);
  const app = express();
  const server = createServer(app);
  let visits = 0
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
    visits++
    console.log(visits);
    result = db.run('INSERT INTO messages (visits) VALUES (?)', visits);
  });
  io.on('connection', async (socket) => {
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result;
      try {
        result = await db.run('INSERT INTO messages (content, client_offset, visits) VALUES (?, ?, ?)', msg, clientOffset);
      } catch (e) {
        if (e.errno === 19) {
          callback();
        } else {
        }
        return;
      }
      io.emit('chat message', msg, result.lastID);
      callback();
    });
    if (!socket.recovered) {
      try {
        await db.each('SELECT id, content, visits FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit('chat message', row.content, row.id);
          }
        )
      } catch (e) {
      }
    }
  });
  const port = process.env.PORT;
  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
    // console.log(`server running at http://26.152.211.131:${port}`);
  });
}
main();