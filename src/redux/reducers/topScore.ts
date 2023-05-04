import createReducer from 'utils/createReducer'

export const TOP_SCORE_DATA_FETCH = 'topScore/DATA_FETCH'
export const TOP_SCORE_DATA_FETCH_SUCCESS = 'topScore/DATA_FETCH_SUCCESS'
export const TOP_SCORE_DATA_FETCH_FAILURE = 'topScore/DATA_FETCH_FAILURE'

export interface TopScoreInitialState {
  data: {
    id: number
    name: string
    msisdn: string
    points: number
    level: number
  }[]
  isLoading: boolean
  error: {
    message: string
  }
}

const INITIAL_STATE: TopScoreInitialState = {
  data: [],
  isLoading: false,
  error: {
    message: ''
  }
}

export default createReducer(INITIAL_STATE, {
  [TOP_SCORE_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [TOP_SCORE_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [TOP_SCORE_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  }
})

export const topScoreDataFetch = () => ({
  type: TOP_SCORE_DATA_FETCH
})

export const topScoreDataFetchSuccess = (payload: TopScoreInitialState['data']) => ({
  type: TOP_SCORE_DATA_FETCH_SUCCESS,
  payload
})

export const topScoreDataFetchFailure = (payload: TopScoreInitialState['error']) => ({
  type: TOP_SCORE_DATA_FETCH_FAILURE,
  payload
})
