import { Action } from '@ngrx/store';

export const INCREMENT = '[Counter] Increment';

export class Increment implements Action {
  readonly type = INCREMENT;
}

export type Actions = Increment;
