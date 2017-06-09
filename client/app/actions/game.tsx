import { actionCreator } from './helpers'

export namespace game {
  export const echo = actionCreator<{ data: any }>('ECHO');
  export const nextState = actionCreator<{}>('GAME_NEXT_STATE');
}
