import * as counter from '../actions/counter';

export interface State {
  countOpened: number;
  countClosed: number;
}

const initialState: State = {
  countOpened: 0,
  countClosed: 0,
};

export function reducer(
  state = initialState,
  action: counter.Actions,
  showSideNav?: boolean
): State {
  switch (action.type) {
    case counter.INCREMENT:
      return {
        ...state,
        countOpened: showSideNav ? state.countOpened + 1 : state.countOpened,
        countClosed: showSideNav ? state.countClosed : state.countClosed + 1,
      };

    default:
      return state;
  }
}

export const getCountOpened = (state: State) => state.countOpened;
export const getCountClosed = (state: State) => state.countClosed;
