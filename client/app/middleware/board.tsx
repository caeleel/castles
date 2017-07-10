import * as actions from '../actions/actions'
import { Middleware } from 'redux'

const ws = new WebSocket('ws://localhost:8080/');

export const boardMiddleware: Middleware = (store: any) => (next: any) => (action: actions.Action<any>) => {
  if (actions.board.addPiece.matches(action)) {
    ws.onopen = () => {
      ws.onmessage = (message: any) => {
        console.log(message.data);
      };
      ws.send(action.payload.id);
    };
  }

  return next(action);
}
