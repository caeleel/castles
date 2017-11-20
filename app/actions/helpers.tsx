import * as redux from "redux";

export interface Action<TPayload> extends redux.Action {
  payload?: TPayload;
  error?: Error;
  meta?: any;
  optimist?: {
    type: string
    id: number,
  };
}

export interface ActionCreator<TPayload> {
  (payload: TPayload): Action<TPayload>;
  (): Action<TPayload>;
  matches(action: Action<any>): action is Action<TPayload>;
}

export function actionCreator(type: string): ActionCreator<{}>;
export function actionCreator<TPayload>(type: string): ActionCreator<TPayload>;
export function actionCreator(type: string) {
  const creator: any = (payload = {}) => {
    return { type, payload };
  };

  creator.matches = (action: Action<any>) => {
    return action.type == type;
  };

  return creator;
}
