import * as http from 'http';
import * as fs from 'fs';
import * as WebSocket from 'ws';
import {Pieces} from '../lib/pieces';

http.createServer(function (request, response) {
  console.log(request.url);
  let path : string = '../client/dist' + request.url;
  if (request.url.indexOf('/static/') === 0) {
    path = '.' + request.url;
  }

  fs.readFile(path, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') response.writeHead(404);
      else response.writeHead(500);
      response.end();
      return;
    }

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200);
    response.end(content, 'utf-8');
  })
}).listen(1337, '0.0.0.0');

const wss: WebSocket.Server = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: any) => {
    ws.send(message);
  });
});

console.log('Server running...');

Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
  console.log(pieces);
}).catch(err => {
  console.log(err);
})
