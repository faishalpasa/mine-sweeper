import createReducer from 'utils/createReducer'

export const SNACKBAR_OPEN = 'snackbar/OPEN'
export const SNACKBAR_CLOSE = 'snackbar/CLOSE'

export interface SnackbarInitialState {
  isOpen: boolean
  message: string
}

const INITIAL_STATE: SnackbarInitialState = {
  isOpen: false,
  message: ''
}

export default createReducer(INITIAL_STATE, {
  [SNACKBAR_OPEN]: (state, action) => {
    state.isOpen = true
    state.message = action.payload
  },
  [SNACKBAR_CLOSE]: (state) => {
    state.isOpen = false
    state.message = ''
  }
})

export const snackbarOpen = (message: SnackbarInitialState['message']) => ({
  type: SNACKBAR_OPEN,
  payload: message
})

export const snackbarClose = () => ({
  type: SNACKBAR_CLOSE
})
