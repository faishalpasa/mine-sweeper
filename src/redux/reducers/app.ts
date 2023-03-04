import createReducer from 'utils/createReducer'

export const APP_THEME_SET = 'app/THEME_SET'

export interface AppInitialState {
  theme: 'dark' | 'light'
}

const INITIAL_STATE: AppInitialState = {
  theme: 'light'
}

export default createReducer(INITIAL_STATE, {
  [APP_THEME_SET]: (state, action) => {
    state.theme = action.payload
  }
})

export const appThemeSet = (theme: AppInitialState['theme']) => ({
  type: APP_THEME_SET,
  payload: theme
})
