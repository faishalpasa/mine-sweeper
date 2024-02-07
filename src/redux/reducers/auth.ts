import createReducer from 'utils/createReducer'

export const AUTH_LOGIN = 'auth/LOGIN'
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const AUTH_PRE_REGISTER = 'auth/PRE_REGISTER'
export const AUTH_PRE_REGISTER_FAILURE = 'auth/PRE_REGISTER_FAILURE'
export const AUTH_PRE_REGISTER_SUCCESS = 'auth/PRE_REGISTER_SUCCESS'
export const AUTH_FIRST_PIN_CHECK = 'auth/FIRST_PIN_CHECK'
export const AUTH_FIRST_PIN_CHECK_FAILURE = 'auth/FIRST_PIN_CHECK_FAILURE'
export const AUTH_FIRST_PIN_CHECK_SUCCESS = 'auth/FIRST_PIN_CHECK_SUCCESS'
export const AUTH_REGISTER = 'auth/REGISTER'
export const AUTH_REGISTER_FAILURE = 'auth/REGISTER_FAILURE'
export const AUTH_REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
export const AUTH_LOGIN_PIN = 'auth/LOGIN_PIN'
export const AUTH_LOGIN_PIN_FAILURE = 'auth/LOGIN_PIN_FAILURE'
export const AUTH_LOGIN_PIN_SUCCESS = 'auth/LOGIN_PIN_SUCCESS'
export const AUTH_RESET_PIN = 'auth/RESET_PIN'
export const AUTH_RESET_PIN_FAILURE = 'auth/RESET_PIN_FAILURE'
export const AUTH_RESET_PIN_SUCCESS = 'auth/RESET_PIN_SUCCESS'
export const AUTH_CHANGE_PIN = 'auth/CHANGE_PIN'
export const AUTH_CHANGE_PIN_FAILURE = 'auth/CHANGE_PIN_FAILURE'
export const AUTH_CHANGE_PIN_SUCCESS = 'auth/CHANGE_PIN_SUCCESS'
export const AUTH_IS_PIN_CHANGED_SET = 'auth/IS_PIN_CHANGED_SET'
export const AUTH_FETCH = 'auth/FETCH'
export const AUTH_FETCH_FAILURE = 'auth/FETCH_FAILURE'
export const AUTH_FETCH_SUCCESS = 'auth/FETCH_SUCCESS'
export const AUTH_DATA_UPDATE = 'auth/DATA_UPDATE'
export const AUTH_DATA_UPDATE_FAILURE = 'auth/DATA_UPDATE_FAILURE'
export const AUTH_DATA_UPDATE_SUCCESS = 'auth/DATA_UPDATE_SUCCESS'
export const AUTH_CHECK_PIN = 'auth/CHECK_PIN'
export const AUTH_CHECK_PIN_SUCCESS = 'auth/CHECK_PIN_SUCCESS'
export const AUTH_CHECK_PIN_FAILURE = 'auth/CHECK_PIN_FAILURE'
export const AUTH_CHECK_PIN_RESET = 'auth/CHECK_PIN_RESET'
export const AUTH_ERROR_RESET = 'auth/ERROR_RESET'
export const AUTH_MSISDN_CHECK = 'auth/MSISDN_CHECK'
export const AUTH_MSISDN_CHECK_SUCCESS = 'auth/MSISDN_CHECK_SUCCESS'
export const AUTH_MSISDN_CHECK_FAILURE = 'auth/MSISDN_CHECK_FAILURE'
export const AUTH_LOGIN_WITH_RANDOM_PIN_SET = 'auth/LOGIN_WITH_RANDOM_PIN_SET'
export const AUTH_TOKEN_VALIDATE = 'auth/TOKEN_VALIDATE'
export const AUTH_TOKEN_VALIDATE_SUCCESS = 'auth/TOKEN_VALIDATE_SUCCESS'
export const AUTH_TOKEN_VALIDATE_FAILURE = 'auth/TOKEN_VALIDATE_FAILURE'

export interface AuthInitialState {
  data: {
    id: number
    coin: number
    email: string
    name: string
    msisdn: string
    msisdn_enc: string
    pin: string
    new_pin: string
    is_first_time_pin: number | null
    is_game_over: number | null
    token: string
  }
  isLoading: boolean
  isLoadingLogin: boolean
  isLoadingCheckMsisdn: boolean
  isLoadingPreRegister: boolean
  isLoadingResetPin: boolean
  isLoadingTokenValidate: boolean
  isAuthenticated: boolean
  isPinChanged: boolean
  isPinReset: boolean
  isLoginWithRandomPin: boolean
  isPinChecked: boolean
  isPreRegisterRequested: boolean
  isFirstPinChecked: boolean
  isRegisterSuccess: boolean
  isEligibleToRegister: boolean
  isTokenValid: boolean
  error: {
    message: string
  }
}

const INITIAL_STATE: AuthInitialState = {
  data: {
    id: 0,
    email: '',
    coin: 0,
    name: '',
    msisdn: '',
    msisdn_enc: '',
    pin: '',
    new_pin: '',
    is_first_time_pin: null,
    is_game_over: null,
    token: ''
  },
  isLoading: false,
  isLoadingLogin: false,
  isLoadingPreRegister: false,
  isLoadingCheckMsisdn: false,
  isLoadingResetPin: false,
  isLoadingTokenValidate: false,
  isLoginWithRandomPin: false,
  isAuthenticated: false,
  isPinChanged: false,
  isPinReset: false,
  isPinChecked: false,
  isPreRegisterRequested: false,
  isFirstPinChecked: false,
  isRegisterSuccess: false,
  isEligibleToRegister: true,
  isTokenValid: false,
  error: {
    message: ''
  }
}

export default createReducer(INITIAL_STATE, {
  [AUTH_LOGIN]: (state) => {
    state.isLoadingLogin = true
  },
  [AUTH_LOGIN_FAILURE]: (state, action) => {
    state.isLoadingLogin = false
    state.error = action.payload
  },
  [AUTH_LOGIN_SUCCESS]: (state, action) => {
    state.isLoadingLogin = false
    state.data = action.payload
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_PRE_REGISTER]: (state) => {
    state.isLoadingPreRegister = true
  },
  [AUTH_PRE_REGISTER_FAILURE]: (state, action) => {
    state.isLoadingPreRegister = false
    state.error = action.payload
  },
  [AUTH_PRE_REGISTER_SUCCESS]: (state) => {
    state.isLoadingPreRegister = false
    state.isPreRegisterRequested = true
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_FIRST_PIN_CHECK]: (state) => {
    state.isLoading = true
  },
  [AUTH_FIRST_PIN_CHECK_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_FIRST_PIN_CHECK_SUCCESS]: (state) => {
    state.isLoading = false
    state.isFirstPinChecked = true
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_REGISTER]: (state) => {
    state.isLoading = true
  },
  [AUTH_REGISTER_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_REGISTER_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.data = {
      ...state.data,
      token: action.payload.token
    }
    state.isRegisterSuccess = true
    state.isPreRegisterRequested = false
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_LOGIN_PIN]: (state, action) => {
    state.isLoading = true
    state.data = {
      ...state.data,
      pin: action.payload.pin
    }
  },
  [AUTH_LOGIN_PIN_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_LOGIN_PIN_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.isAuthenticated = true
    state.isPinReset = false
    state.data = {
      ...state.data,
      token: action.payload
    }
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_RESET_PIN]: (state) => {
    state.isLoadingResetPin = true
  },
  [AUTH_RESET_PIN_FAILURE]: (state, action) => {
    state.isLoadingResetPin = false
    state.error = action.payload
  },
  [AUTH_RESET_PIN_SUCCESS]: (state, action) => {
    state.isLoadingResetPin = false
    state.data = {
      ...state.data,
      token: action.payload
    }
    state.isPinReset = true
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_CHANGE_PIN]: (state) => {
    state.isLoading = true
  },
  [AUTH_CHANGE_PIN_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_CHANGE_PIN_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.data = {
      ...state.data,
      token: action.payload
    }
    state.isPinChanged = true
    state.isPinChecked = false
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_IS_PIN_CHANGED_SET]: (state, action) => {
    state.isPinChanged = action.payload
  },
  [AUTH_FETCH]: (state) => {
    state.isLoading = true
  },
  [AUTH_FETCH_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
    state.isAuthenticated = false
  },
  [AUTH_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.isAuthenticated = true
    state.data = {
      ...state.data,
      ...action.payload
    }
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_DATA_UPDATE]: (state) => {
    state.isLoading = true
  },
  [AUTH_DATA_UPDATE_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_DATA_UPDATE_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.data = {
      ...state.data,
      ...action.payload
    }
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_CHECK_PIN]: (state) => {
    state.isLoading = true
  },
  [AUTH_CHECK_PIN_FAILURE]: (state, action) => {
    state.isLoading = false
    state.error = action.payload
  },
  [AUTH_CHECK_PIN_SUCCESS]: (state) => {
    state.isLoading = false
    state.isPinChecked = true
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_CHECK_PIN_RESET]: (state) => {
    state.isPinChecked = false
  },
  [AUTH_ERROR_RESET]: (state) => {
    state.error = { ...INITIAL_STATE.error }
  },
  [AUTH_MSISDN_CHECK]: (state) => {
    state.isLoadingCheckMsisdn = true
  },
  [AUTH_MSISDN_CHECK_SUCCESS]: (state, action) => {
    state.isLoadingCheckMsisdn = false
    state.isEligibleToRegister = !action.payload
    state.error = {
      ...INITIAL_STATE.error,
      message: action.payload ? 'Nomor HP sudah terdaftar, silakan tekan masuk.' : ''
    }
  },
  [AUTH_MSISDN_CHECK_FAILURE]: (state, action) => {
    state.isLoadingCheckMsisdn = false
    state.error = action.payload
  },
  [AUTH_LOGIN_WITH_RANDOM_PIN_SET]: (state, action) => {
    state.isLoginWithRandomPin = action.payload
  },
  [AUTH_TOKEN_VALIDATE]: (state) => {
    state.isLoadingTokenValidate = true
  },
  [AUTH_TOKEN_VALIDATE_SUCCESS]: (state, action) => {
    state.isLoadingTokenValidate = false
    state.isTokenValid = true
    state.data = {
      ...state.data,
      ...action.payload
    }
  },
  [AUTH_TOKEN_VALIDATE_FAILURE]: (state, action) => {
    state.isLoadingTokenValidate = false
    state.error = action.payload
  }
})

export const authLogin = (payload: AuthInitialState['data']['msisdn']) => ({
  type: AUTH_LOGIN,
  payload
})
export const authLoginFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_LOGIN_FAILURE,
  payload
})
export const authLoginSuccess = (data: AuthInitialState['data']) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: data
})
export const authPreRegister = (payload: AuthInitialState['data']['msisdn']) => ({
  type: AUTH_PRE_REGISTER,
  payload
})
export const authPreRegisterFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_PRE_REGISTER_FAILURE,
  payload
})
export const authPreRegisterSuccess = () => ({
  type: AUTH_PRE_REGISTER_SUCCESS
})
export const authFirstPinCheck = ({
  msisdn,
  pin
}: {
  msisdn: AuthInitialState['data']['msisdn']
  pin: AuthInitialState['data']['pin']
}) => ({
  type: AUTH_FIRST_PIN_CHECK,
  payload: {
    msisdn,
    pin
  }
})
export const authFirstPinCheckFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_FIRST_PIN_CHECK_FAILURE,
  payload
})
export const authFirstPinCheckSuccess = () => ({
  type: AUTH_FIRST_PIN_CHECK_SUCCESS
})
export const authRegister = ({
  msisdn,
  msisdn_enc,
  pin
}: {
  msisdn: AuthInitialState['data']['msisdn']
  msisdn_enc: AuthInitialState['data']['msisdn_enc']
  pin: AuthInitialState['data']['pin']
}) => ({
  type: AUTH_REGISTER,
  payload: {
    msisdn,
    msisdn_enc,
    pin
  }
})
export const authRegisterFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_REGISTER_FAILURE,
  payload
})
export const authRegisterSuccess = (data: AuthInitialState['data']) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: data
})
export const authLoginPin = (
  msisdn: AuthInitialState['data']['msisdn'],
  pin: AuthInitialState['data']['pin']
) => ({
  type: AUTH_LOGIN_PIN,
  payload: {
    msisdn,
    pin
  }
})
export const authLoginPinFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_LOGIN_PIN_FAILURE,
  payload
})
export const authLoginPinSuccess = (token: AuthInitialState['data']['token']) => ({
  type: AUTH_LOGIN_PIN_SUCCESS,
  payload: token
})
export const authResetPin = () => ({
  type: AUTH_RESET_PIN
})
export const authResetPinFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_RESET_PIN_FAILURE,
  payload
})
export const authResetPinSuccess = (token: AuthInitialState['data']['token']) => ({
  type: AUTH_RESET_PIN_SUCCESS,
  payload: token
})
export const authChangePin = (
  pin: AuthInitialState['data']['pin'],
  newPin: AuthInitialState['data']['pin']
) => ({
  type: AUTH_CHANGE_PIN,
  payload: { pin, newPin }
})
export const authChangePinFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_CHANGE_PIN_FAILURE,
  payload
})
export const authChangePinSuccess = (token: AuthInitialState['data']['token']) => ({
  type: AUTH_CHANGE_PIN_SUCCESS,
  payload: token
})
export const authIsPinChangedSet = (value: boolean) => ({
  type: AUTH_IS_PIN_CHANGED_SET,
  payload: value
})
export const authFetch = () => ({
  type: AUTH_FETCH
})
export const authFetchFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_FETCH_FAILURE,
  payload
})
export const authFetchSuccess = (payload: AuthInitialState['data']) => ({
  type: AUTH_FETCH_SUCCESS,
  payload
})
export const authDataUpdate = (
  name?: AuthInitialState['data']['name'],
  email?: AuthInitialState['data']['email']
) => ({
  type: AUTH_DATA_UPDATE,
  payload: {
    name,
    email
  }
})
export const authDataUpdateFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_DATA_UPDATE_FAILURE,
  payload
})
export const authDataUpdateSuccess = (payload: AuthInitialState['data']) => ({
  type: AUTH_DATA_UPDATE_SUCCESS,
  payload
})
export const authCheckPin = (pin: AuthInitialState['data']['pin']) => ({
  type: AUTH_CHECK_PIN,
  payload: pin
})
export const authCheckPinFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_CHECK_PIN_FAILURE,
  payload
})
export const authCheckPinSuccess = () => ({
  type: AUTH_CHECK_PIN_SUCCESS
})
export const authCheckPinReset = () => ({
  type: AUTH_CHECK_PIN_RESET
})

export const authErrorReset = () => ({
  type: AUTH_ERROR_RESET
})

export const authMsisdnCheck = (
  msisdn: AuthInitialState['data']['msisdn'],
  token: string | null
) => ({
  type: AUTH_MSISDN_CHECK,
  payload: {
    msisdn,
    token
  }
})

export const authMsisdnCheckSuccess = (id: number) => ({
  type: AUTH_MSISDN_CHECK_SUCCESS,
  payload: id
})

export const authMsisdnCheckFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_MSISDN_CHECK_FAILURE,
  payload
})

export const authTokenValidate = (
  msisdn: AuthInitialState['data']['msisdn'],
  token: string | null
) => ({
  type: AUTH_TOKEN_VALIDATE,
  payload: {
    msisdn,
    token
  }
})

export const authTokenValidateSuccess = (payload: {
  msisdn: string
  msisdn_enc: string
  pin: string | null
}) => ({
  type: AUTH_TOKEN_VALIDATE_SUCCESS,
  payload
})

export const authTokenValidateFailure = (payload: AuthInitialState['error']) => ({
  type: AUTH_TOKEN_VALIDATE_FAILURE,
  payload
})

export const authLoginWithRandomPinSet = (payload: AuthInitialState['isLoginWithRandomPin']) => ({
  type: AUTH_LOGIN_WITH_RANDOM_PIN_SET,
  payload
})
