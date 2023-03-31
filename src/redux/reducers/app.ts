import createReducer from 'utils/createReducer'

import type { CellPorps } from 'types/board'

export const APP_BOARD_DATA_FETCH = 'app/BOARD_DATA_FETCH'
export const APP_BOARD_DATA_FETCH_SUCCESS = 'app/BOARD_DATA_FETCH_SUCCESS'
export const APP_BOARD_DATA_FETCH_FAILURE = 'app/BOARD_DATA_FETCH_FAILURE'
export const APP_BOARD_LOG_SAVE = 'app/BOARD_LOG_SAVE'
export const APP_BOARD_LOG_SAVE_SUCCESS = 'app/BOARD_LOG_SAVE_SUCCESS'
export const APP_BOARD_LOG_SAVE_FAILURE = 'app/BOARD_LOG_SAVE_FAILURE'
export const APP_THEME_SET = 'app/THEME_SET'
export const APP_TOGGLE_FLAG_SET = 'app/TOGGLE_FLAG_SET'
export const APP_GAME_OVER_SET = 'app/GAME_OVER_SET'
export const APP_GAME_WIN_SET = 'app/GAME_WIN_SET'
export const APP_DATA_POINT_SET = 'app/DATA_POINT_SET'

export interface AppInitialState {
  theme: 'dark' | 'light'
  board: {
    columns: number
    rows: number
    mines: number
    state: string
  }
  data: {
    points: number
  }
  error: {
    message: string
  }
  isLoading: boolean
  isLoadingLog: boolean
  isGameOver: boolean
  isGameWin: boolean
  isToggleFlag: boolean
}

const INITIAL_STATE: AppInitialState = {
  theme: 'light',
  board: {
    columns: 0,
    rows: 0,
    mines: 0,
    state: ''
  },
  data: {
    points: 0
  },
  error: {
    message: ''
  },
  isLoading: false,
  isLoadingLog: false,
  isGameOver: false,
  isGameWin: false,
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
  [APP_BOARD_LOG_SAVE]: (state) => {
    state.isLoadingLog = true
  },
  [APP_BOARD_LOG_SAVE_SUCCESS]: (state, action) => {
    state.isLoadingLog = false
    state.error = { ...INITIAL_STATE.error }
    state.board = {
      ...state.board,
      state: action.payload
    }
  },
  [APP_BOARD_LOG_SAVE_FAILURE]: (state, action) => {
    state.isLoadingLog = true
    state.error = action.payload
  },
  [APP_TOGGLE_FLAG_SET]: (state, action) => {
    state.isToggleFlag = action.payload
  },
  [APP_GAME_OVER_SET]: (state, action) => {
    state.isGameOver = action.payload
  },
  [APP_GAME_WIN_SET]: (state, action) => {
    state.isGameWin = action.payload
  },
  [APP_DATA_POINT_SET]: (state, action) => {
    state.data.points = action.payload
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

export const appBoardLogSave = (cellsStringify: string, points: number) => ({
  type: APP_BOARD_LOG_SAVE,
  payload: {
    decodedStateName: cellsStringify,
    decodedPointName: points
  }
})

export const appBoardLogSaveSuccess = (payload: AppInitialState['board']['state']) => ({
  type: APP_BOARD_LOG_SAVE_SUCCESS,
  payload
})

export const appBoardLogSaveFailure = (payload: AppInitialState['error']) => ({
  type: APP_BOARD_LOG_SAVE_FAILURE,
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

export const appGameWinSet = (value: AppInitialState['isGameWin']) => ({
  type: APP_GAME_WIN_SET,
  payload: value
})

export const appDataPointSet = (value: AppInitialState['data']['points']) => ({
  type: APP_DATA_POINT_SET,
  payload: value
})
