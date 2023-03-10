import createReducer from 'utils/createReducer'

export const APP_BOARD_DATA_FETCH = 'app/BOARD_DATA_FETCH'
export const APP_BOARD_DATA_FETCH_SUCCESS = 'app/BOARD_DATA_FETCH_SUCCESS'
export const APP_BOARD_DATA_FETCH_FAILURE = 'app/BOARD_DATA_FETCH_FAILURE'
export const APP_THEME_SET = 'app/THEME_SET'
export const APP_TOGGLE_FLAG_SET = 'app/TOGGLE_FLAG_SET'
export const APP_GAME_OVER_SET = 'app/GAME_OVER_SET'

export interface AppInitialState {
  theme: 'dark' | 'light'
  board: {
    columns: number
    rows: number
    mines: number
  }
  error: {
    message: string
  }
  isLoading: boolean
  isGameOver: boolean
  isToggleFlag: boolean
}

const INITIAL_STATE: AppInitialState = {
  theme: 'light',
  board: {
    columns: 0,
    rows: 0,
    mines: 0
  },
  error: {
    message: ''
  },
  isLoading: false,
  isGameOver: false,
  isToggleFlag: false
}

export default createReducer(INITIAL_STATE, {
  [APP_THEME_SET]: (state, action) => {
    state.theme = action.payload
  },
  [APP_BOARD_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_BOARD_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.board = action.payload
  },
  [APP_BOARD_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
  [APP_TOGGLE_FLAG_SET]: (state, action) => {
    state.isToggleFlag = action.payload
  },
  [APP_GAME_OVER_SET]: (state, action) => {
    state.isGameOver = action.payload
  }
})

export const appThemeSet = (theme: AppInitialState['theme']) => ({
  type: APP_THEME_SET,
  payload: theme
})

export const appBoardDataFetch = () => ({
  type: APP_BOARD_DATA_FETCH
})

export const appBoardDataFetchSuccess = (payload: AppInitialState['board']) => ({
  type: APP_BOARD_DATA_FETCH_SUCCESS,
  payload
})

export const appBoardDataFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_BOARD_DATA_FETCH_FAILURE,
  payload
})

export const appToggleFlagSet = (value: AppInitialState['isToggleFlag']) => ({
  type: APP_TOGGLE_FLAG_SET,
  payload: value
})

export const appGameOverSet = (value: AppInitialState['isGameOver']) => ({
  type: APP_GAME_OVER_SET,
  payload: value
})
