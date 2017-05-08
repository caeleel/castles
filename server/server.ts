import * as http from 'http';
import * as fs from 'fs';
import {Pieces} from '../lib/pieces';

http.createServer(function (request, response) {
  console.log(request.url);
  if (request.url.indexOf('/static/') === 0) {
    const path : string = '.' + request.url;
    fs.readFile(path, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') response.writeHead(404);
        else response.writeHead(500);
        response.end();
        return;
      }

      response.writeHead(200);
      response.end(content, 'utf-8');
    })
    return;
  }

  response.writeHead(404);
  response.end();
}).listen(1337, '0.0.0.0');

console.log('Server running...');

Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
  console.log(pieces);
}).catch(err => {
  console.log(err);
})
