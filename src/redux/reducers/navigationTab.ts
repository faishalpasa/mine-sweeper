import createReducer from 'utils/createReducer'

export const NAVIGATION_TAB_SELECTED_SET = 'navigationTab/SELECTED_SET'

export interface NavigationTabInitialState {
  selectedTab: number
}

const INITIAL_STATE: NavigationTabInitialState = {
  selectedTab: 0
}

export default createReducer(INITIAL_STATE, {
  [NAVIGATION_TAB_SELECTED_SET]: (state, action) => {
    state.selectedTab = action.payload
  }
})

export const navigationTabSelectedSet = (theme: NavigationTabInitialState['selectedTab']) => ({
  type: NAVIGATION_TAB_SELECTED_SET,
  payload: theme
})
