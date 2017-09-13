import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';
import * as layout from '../core/actions/layout';
import * as counter from '../core/actions/counter';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '../core/reducers/layout';
import * as fromCounter from '../core/reducers/counter';
import { Action } from '@ngrx/store';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface Root {
  layout: fromLayout.State;
  counter: fromCounter.State;
}

export type RootActions = layout.Actions | counter.Actions;

export const initialState = {
  layout: fromLayout.reducer(undefined, {} as layout.Actions),
  counter: fromCounter.reducer(undefined, {} as counter.Actions),
};

export interface State {
  root: Root;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const rootReducer = (
  state: Root = initialState,
  action: RootActions
) => {
  return {
    layout: fromLayout.reducer(state.layout, action as layout.Actions),
    counter: fromCounter.reducer(
      state.counter,
      action as counter.Actions,
      state.layout.showSidenav
    ),
  };
};

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  root: rootReducer,
  routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

export const getRoot = (state: State) => state.root;

/**
 * Layout Reducers
 */

export const getLayoutState = createSelector(
  getRoot,
  (state: Root) => state.layout
);

export const getCounter = createSelector(
  getRoot,
  (state: Root) => state.counter
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
