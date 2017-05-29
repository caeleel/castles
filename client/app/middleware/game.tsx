import * as actions from '../actions/actions'
import { Middleware } from 'redux'

export const gameMiddleware: Middleware = (store: any) => (next: any) => (action: actions.Action<any>) => {
  if (actions.game.echo.matches(action)) {
    const ws = new WebSocket('ws://localhost:8080/');
    ws.onopen = () => {
      ws.onmessage = (message: any) => {
        console.log(message.data);
      };
      ws.send(action.payload.data);
    };
  }

  return next(action);
}
