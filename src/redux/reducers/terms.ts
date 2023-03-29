import createReducer from 'utils/createReducer'

export const TERMS_DATA_FETCH = 'terms/DATA_FETCH'
export const TERMS_DATA_FETCH_SUCCESS = 'terms/DATA_FETCH_SUCCESS'
export const TERMS_DATA_FETCH_FAILURE = 'terms/DATA_FETCH_FAILURE'

export interface TermsInitialState {
  data: {
    id: number
    description: string
  }[]
  isLoading: boolean
  error: {
    message: string
  }
}

const INITIAL_STATE: TermsInitialState = {
  data: [],
  isLoading: false,
  error: {
    message: ''
  }
}

export default createReducer(INITIAL_STATE, {
  [TERMS_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [TERMS_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [TERMS_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  }
})

export const termsDataFetch = () => ({
  type: TERMS_DATA_FETCH
})

export const termsDataFetchSuccess = (payload: TermsInitialState['data']) => ({
  type: TERMS_DATA_FETCH_SUCCESS,
  payload
})

export const termsDataFetchFailure = (payload: TermsInitialState['error']) => ({
  type: TERMS_DATA_FETCH_FAILURE,
  payload
})
