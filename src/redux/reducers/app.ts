import createReducer from 'utils/createReducer'

export const APP_BOARD_FETCH = 'app/BOARD_FETCH'
export const APP_BOARD_FETCH_SUCCESS = 'app/BOARD_FETCH_SUCCESS'
export const APP_BOARD_FETCH_FAILURE = 'app/BOARD_FETCH_FAILURE'
export const APP_BOARD_LOG_SAVE = 'app/BOARD_LOG_SAVE'
export const APP_BOARD_LOG_SAVE_SUCCESS = 'app/BOARD_LOG_SAVE_SUCCESS'
export const APP_BOARD_LOG_SAVE_FAILURE = 'app/BOARD_LOG_SAVE_FAILURE'
export const APP_THEME_SET = 'app/THEME_SET'
export const APP_TOGGLE_FLAG_SET = 'app/TOGGLE_FLAG_SET'
export const APP_GAME_OVER_SET = 'app/GAME_OVER_SET'
export const APP_GAME_WIN_SET = 'app/GAME_WIN_SET'
export const APP_GAME_PERIOD_SET = 'app/GAME_PERIOD_SET'
export const APP_DATA_FETCH = 'app/DATA_FETCH'
export const APP_DATA_FETCH_FAILURE = 'app/DATA_FETCH_FAILURE'
export const APP_DATA_FETCH_SUCCESS = 'app/DATA_FETCH_SUCCESS'
export const APP_DATA_POINT_SET = 'app/DATA_POINT_SET'
export const APP_DATA_COIN_SET = 'app/DATA_COIN_SET'
export const APP_PRIZE_FETCH = 'app/PRIZE_FETCH'
export const APP_PRIZE_FETCH_FAILURE = 'app/PRIZE_FETCH_FAILURE'
export const APP_PRIZE_FETCH_SUCCESS = 'app/PRIZE_FETCH_SUCCESS'
export const APP_NEXT_LEVEL = 'app/NEXT_LEVEL'
export const APP_NEXT_LEVEL_FAILURE = 'app/NEXT_LEVEL_FAILURE'
export const APP_NEXT_LEVEL_SUCCESS = 'app/NEXT_LEVEL_SUCCESS'
export const APP_CONTINUE_PLAY = 'app/CONTINUE_PLAY'
export const APP_CONTINUE_PLAY_FAILURE = 'app/CONTINUE_PLAY_FAILURE'
export const APP_CONTINUE_PLAY_SUCCESS = 'app/CONTINUE_PLAY_SUCCESS'
export const APP_PAY_OVO = 'app/PAY_OVO'
export const APP_PAY_OVO_FAILURE = 'app/PAY_OVO_FAILURE'
export const APP_PAY_OVO_SUCCESS = 'app/PAY_OVO_SUCCESS'
export const APP_PAY_OVO_CHECK = 'app/PAY_OVO_CHECK'
export const APP_PAY_OVO_CHECK_SUCCESS = 'app/PAY_OVO_CHECK_SUCCESS'
export const APP_PAY_OVO_CHECK_FAILURE = 'app/PAY_OVO_CHECK_FAILURE'
export const APP_PAY_GOPAY = 'app/PAY_GOPAY'
export const APP_PAY_GOPAY_FAILURE = 'app/PAY_GOPAY_FAILURE'
export const APP_PAY_GOPAY_SUCCESS = 'app/PAY_GOPAY_SUCCESS'
export const APP_PAY_GOPAY_CHECK = 'app/PAY_GOPAY_CHECK'
export const APP_PAY_GOPAY_CHECK_SUCCESS = 'app/PAY_GOPAY_CHECK_SUCCESS'
export const APP_PAY_GOPAY_CHECK_FAILURE = 'app/PAY_GOPAY_CHECK_FAILURE'
export const APP_DIALOG_LOGIN_SET = 'app/DIALOG_LOGIN_SET'
export const APP_ERROR_RESET = 'app/ERROR_RESET'
export const APP_GOPAY_ACTIONS_SET = 'app/GOPAY_ACTIONS_SET'

export interface AppInitialState {
  theme: 'dark' | 'light'
  board: {
    columns: number
    rows: number
    mines: number
    state: string
  }
  data: {
    level: number
    level_id: number
    points: number
    coins: number
    time: number
  }
  prizes: {
    id: number
    label: string
    name: string
    imageSrc: string
  }[]
  error: {
    message: string
  }
  gopayActions: {
    method: ''
    name: ''
    url: ''
  }[]
  isLoading: boolean
  isLoadingLog: boolean
  isLoadingPay: boolean
  isLoadingBoard: boolean
  isGameOver: boolean
  isGameWin: boolean
  isPeriodActive: boolean
  isToggleFlag: boolean
  isDialogLoginOpen: boolean
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
    level: 0,
    level_id: 0,
    points: 0,
    coins: 0,
    time: 0
  },
  prizes: [],
  error: {
    message: ''
  },
  gopayActions: [],
  isLoading: false,
  isLoadingLog: false,
  isLoadingPay: false,
  isLoadingBoard: false,
  isGameOver: false,
  isGameWin: false,
  isPeriodActive: false,
  isToggleFlag: false,
  isDialogLoginOpen: false
}

export default createReducer(INITIAL_STATE, {
  [APP_THEME_SET]: (state, action) => {
    state.theme = action.payload
  },
  [APP_BOARD_FETCH]: (state) => {
    state.isLoadingBoard = true
  },
  [APP_BOARD_FETCH_SUCCESS]: (state, action) => {
    state.isLoadingBoard = false
    state.error = { ...INITIAL_STATE.error }
    state.board = action.payload
  },
  [APP_BOARD_FETCH_FAILURE]: (state, action) => {
    state.isLoadingBoard = false
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
      state: action.payload.state
    }
    state.data = {
      ...state.data,
      points: action.payload.points
    }
  },
  [APP_BOARD_LOG_SAVE_FAILURE]: (state, action) => {
    state.isLoadingLog = false
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
  [APP_GAME_PERIOD_SET]: (state, action) => {
    state.isPeriodActive = action.payload
  },
  [APP_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [APP_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
  [APP_DATA_POINT_SET]: (state, action) => {
    state.data.points = action.payload
  },
  [APP_DATA_COIN_SET]: (state, action) => {
    state.data.coins = action.payload
  },
  [APP_PRIZE_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_PRIZE_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.prizes = action.payload
  },
  [APP_PRIZE_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
  [APP_NEXT_LEVEL]: (state) => {
    state.isLoading = true
  },
  [APP_NEXT_LEVEL_SUCCESS]: (state) => {
    state.isLoading = false
  },
  [APP_NEXT_LEVEL_FAILURE]: (state, action) => {
    state.isLoadingPay = true
    state.error = action.payload
  },
  [APP_PAY_OVO]: (state) => {
    state.isLoadingPay = true
  },
  [APP_PAY_OVO_FAILURE]: (state, action) => {
    state.isLoadingPay = true
    state.error = action.payload
  },
  [APP_PAY_OVO_CHECK]: (state) => {
    state.isLoadingPay = true
  },
  [APP_PAY_OVO_CHECK_SUCCESS]: (state) => {
    state.isLoadingPay = false
  },
  [APP_PAY_OVO_CHECK_FAILURE]: (state, action) => {
    state.isLoadingPay = false
    state.error = action.payload
  },
  [APP_PAY_GOPAY]: (state) => {
    state.isLoadingPay = true
  },
  [APP_PAY_GOPAY_FAILURE]: (state, action) => {
    state.isLoadingPay = true
    state.error = action.payload
  },
  [APP_PAY_GOPAY_CHECK]: (state) => {
    state.isLoadingPay = true
  },
  [APP_PAY_GOPAY_CHECK_SUCCESS]: (state) => {
    state.isLoadingPay = false
  },
  [APP_PAY_GOPAY_CHECK_FAILURE]: (state, action) => {
    state.isLoadingPay = false
    state.error = action.payload
  },
  [APP_DIALOG_LOGIN_SET]: (state, action) => {
    state.isDialogLoginOpen = action.payload
  },
  [APP_ERROR_RESET]: (state) => {
    state.error = { ...INITIAL_STATE.error }
  },
  [APP_GOPAY_ACTIONS_SET]: (state, action) => {
    state.gopayActions = action.payload
  }
})

export const appThemeSet = (theme: AppInitialState['theme']) => ({
  type: APP_THEME_SET,
  payload: theme
})

export const appBoardFetch = () => ({
  type: APP_BOARD_FETCH
})

export const appBoardFetchSuccess = (payload: AppInitialState['board']) => ({
  type: APP_BOARD_FETCH_SUCCESS,
  payload
})

export const appBoardFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_BOARD_FETCH_FAILURE,
  payload
})

export const appBoardLogSave = (cellsStringify: string, points: number, time: number) => ({
  type: APP_BOARD_LOG_SAVE,
  payload: {
    decodedStateName: cellsStringify,
    decodedPointName: points,
    decodedTimeName: time
  }
})

export const appBoardLogSaveSuccess = (payload: {
  state: AppInitialState['board']['state']
  points: AppInitialState['data']['points']
}) => ({
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

export const appGamePeriodSet = (value: AppInitialState['isPeriodActive']) => ({
  type: APP_GAME_PERIOD_SET,
  payload: value
})

export const appDataFetch = () => ({
  type: APP_DATA_FETCH
})

export const appDataFetchSuccess = (payload: AppInitialState['data']) => ({
  type: APP_DATA_FETCH_SUCCESS,
  payload
})

export const appDataFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_DATA_FETCH_FAILURE,
  payload
})

export const appDataPointSet = (value: AppInitialState['data']['points']) => ({
  type: APP_DATA_POINT_SET,
  payload: value
})

export const appDataCoinSet = (value: AppInitialState['data']['coins']) => ({
  type: APP_DATA_COIN_SET,
  payload: value
})

export const appPrizeFetch = () => ({
  type: APP_PRIZE_FETCH
})

export const appPrizeFetchSuccess = (payload: AppInitialState['prizes']) => ({
  type: APP_PRIZE_FETCH_SUCCESS,
  payload
})

export const appPrizeFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_PRIZE_FETCH_FAILURE,
  payload
})

export const appNextLevel = () => ({
  type: APP_NEXT_LEVEL
})

export const appNextLevelSuccess = () => ({
  type: APP_NEXT_LEVEL_SUCCESS
})

export const appNextLevelFailure = (payload: AppInitialState['error']) => ({
  type: APP_NEXT_LEVEL_FAILURE,
  payload
})

export const appContinuePlay = () => ({
  type: APP_CONTINUE_PLAY
})

export const appContinuePlaySuccess = () => ({
  type: APP_CONTINUE_PLAY_SUCCESS
})

export const appContinuePlayFailure = (payload: AppInitialState['error']) => ({
  type: APP_CONTINUE_PLAY_FAILURE,
  payload
})

export const appPayOvo = (payload: { amount: number; msisdn: string }) => ({
  type: APP_PAY_OVO,
  payload
})

export const appPayOvoSuccess = () => ({
  type: APP_PAY_OVO_SUCCESS
})

export const appPayOvoFailure = (payload: AppInitialState['error']) => ({
  type: APP_PAY_OVO_FAILURE,
  payload
})

export const appPayOvoCheck = (paymentId: string) => ({
  type: APP_PAY_OVO_CHECK,
  payload: paymentId
})

export const appPayOvoCheckSuccess = () => ({
  type: APP_PAY_OVO_CHECK_SUCCESS
})

export const appPayOvoCheckFailure = (payload: AppInitialState['error']) => ({
  type: APP_PAY_OVO_CHECK_FAILURE,
  payload
})

export const appPayGopay = (payload: { amount: number; msisdn: string }) => ({
  type: APP_PAY_GOPAY,
  payload
})

export const appPayGopaySuccess = () => ({
  type: APP_PAY_GOPAY_SUCCESS
})

export const appPayGopayFailure = (payload: AppInitialState['error']) => ({
  type: APP_PAY_GOPAY_FAILURE,
  payload
})

export const appPayGopayCheck = (paymentId: string) => ({
  type: APP_PAY_GOPAY_CHECK,
  payload: paymentId
})

export const appPayGopayCheckSuccess = () => ({
  type: APP_PAY_GOPAY_CHECK_SUCCESS
})

export const appPayGopayCheckFailure = (payload: AppInitialState['error']) => ({
  type: APP_PAY_GOPAY_CHECK_FAILURE,
  payload
})

export const appDialogLoginSet = (payload: AppInitialState['isDialogLoginOpen']) => ({
  type: APP_DIALOG_LOGIN_SET,
  payload
})

export const appErrorReset = () => ({
  type: APP_ERROR_RESET
})

export const appGopayActionsSet = (payload: AppInitialState['gopayActions']) => ({
  type: APP_GOPAY_ACTIONS_SET,
  payload
})
