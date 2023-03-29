import createReducer from 'utils/createReducer'

export const PROFILE_DATA_FETCH = 'profile/DATA_FETCH'
export const PROFILE_DATA_FETCH_SUCCESS = 'profile/DATA_FETCH_SUCCESS'
export const PROFILE_DATA_FETCH_FAILURE = 'profile/DATA_FETCH_FAILURE'

export interface ProfileInitialState {
  data: {
    msisdn: string
    name: string
    email: string
    pin: string
  }
  isLoading: boolean
  error: {
    message: string
  }
}

const INITIAL_STATE: ProfileInitialState = {
  data: {
    msisdn: '',
    name: '',
    email: '',
    pin: ''
  },
  isLoading: false,
  error: {
    message: ''
  }
}

export default createReducer(INITIAL_STATE, {
  [PROFILE_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [PROFILE_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [PROFILE_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  }
})

export const profileDataFetch = () => ({
  type: PROFILE_DATA_FETCH
})

export const profileDataFetchSuccess = (payload: ProfileInitialState['data']) => ({
  type: PROFILE_DATA_FETCH_SUCCESS,
  payload
})

export const profileDataFetchFailure = (payload: ProfileInitialState['error']) => ({
  type: PROFILE_DATA_FETCH_FAILURE,
  payload
})
