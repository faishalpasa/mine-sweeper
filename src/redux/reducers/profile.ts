import createReducer from 'utils/createReducer'

export const PROFILE_DATA_FETCH = 'profile/DATA_FETCH'
export const PROFILE_DATA_FETCH_SUCCESS = 'profile/DATA_FETCH_SUCCESS'
export const PROFILE_DATA_FETCH_FAILURE = 'profile/DATA_FETCH_FAILURE'
export const PROFILE_SEND_MESSAGE = 'profile/SEND_MESSAGE'
export const PROFILE_SEND_MESSAGE_SUCCESS = 'profile/SEND_MESSAGE_SUCCESS'
export const PROFILE_SEND_MESSAGE_FAILURE = 'profile/SEND_MESSAGE_FAILURE'
export const PROFILE_SEND_MESSAGE_SET = 'profile/SEND_MESSAGE_SET'

export interface ProfileInitialState {
  data: {
    msisdn: string
    name: string
    email: string
    pin: string
  }
  isLoading: boolean
  isLoadingSendMessage: boolean
  isMessageSend: boolean
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
  isLoadingSendMessage: false,
  isMessageSend: false,
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
  },
  [PROFILE_SEND_MESSAGE]: (state) => {
    state.isLoadingSendMessage = true
  },
  [PROFILE_SEND_MESSAGE_SUCCESS]: (state) => {
    state.isLoadingSendMessage = false
    state.isMessageSend = true
    state.error = { ...INITIAL_STATE.error }
  },
  [PROFILE_SEND_MESSAGE_FAILURE]: (state, action) => {
    state.isLoadingSendMessage = false
    state.error = action.payload
  },
  [PROFILE_SEND_MESSAGE_SET]: (state, action) => {
    state.isMessageSend = action.payload
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

export const profileSendMessage = (payload: string) => ({
  type: PROFILE_SEND_MESSAGE,
  payload
})
export const profileSendMessageFailure = (payload: ProfileInitialState['error']) => ({
  type: PROFILE_SEND_MESSAGE_FAILURE,
  payload
})
export const profileSendSuccess = () => ({
  type: PROFILE_SEND_MESSAGE_SUCCESS
})
export const profileSendMessageSet = (payload: ProfileInitialState['isMessageSend']) => ({
  type: PROFILE_SEND_MESSAGE_SET,
  payload
})
