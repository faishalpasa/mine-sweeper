import createReducer from 'utils/createReducer'

export const WINNER_DATA_FETCH = 'winner/DATA_FETCH'
export const WINNER_DATA_FETCH_SUCCESS = 'winner/DATA_FETCH_SUCCESS'
export const WINNER_DATA_FETCH_FAILURE = 'winner/DATA_FETCH_FAILURE'

export interface WinnerInitialState {
  data: {
    id: number
    name: string
    msisdn: string
    points: number
    prize: string
  }[]
  isLoading: boolean
  error: {
    message: string
  }
}

const INITIAL_STATE: WinnerInitialState = {
  data: [],
  isLoading: false,
  error: {
    message: ''
  }
}

export default createReducer(INITIAL_STATE, {
  [WINNER_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [WINNER_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [WINNER_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  }
})

export const winnerDataFetch = () => ({
  type: WINNER_DATA_FETCH
})

export const winnerDataFetchSuccess = (payload: WinnerInitialState['data']) => ({
  type: WINNER_DATA_FETCH_SUCCESS,
  payload
})

export const winnerDataFetchFailure = (payload: WinnerInitialState['error']) => ({
  type: WINNER_DATA_FETCH_FAILURE,
  payload
})
