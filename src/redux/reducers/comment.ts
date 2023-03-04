import createReducer from 'utils/createReducer'

export const COMMENT_FETCH = 'comment/FETCH'
export const COMMENT_FETCH_FAILURE = 'comment/FETCH_FAILURE'
export const COMMENT_FETCH_SUCCESS = 'comment/FETCH_SUCCESS'

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface CommentInitialState {
  data: Comment[]
  isLoading: boolean
  isError: boolean
}

const INITIAL_STATE: CommentInitialState = {
  data: [],
  isLoading: false,
  isError: false
}

export default createReducer(INITIAL_STATE, {
  [COMMENT_FETCH]: (state) => {
    state.isLoading = true
  },
  [COMMENT_FETCH_FAILURE]: (state) => {
    state.isLoading = false
    state.isError = true
  },
  [COMMENT_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.data = action.payload
  }
})

export const commentFetch = (postId: number) => ({
  type: COMMENT_FETCH,
  payload: postId
})
export const commentFetchFailure = () => ({
  type: COMMENT_FETCH_FAILURE
})
export const commentFetchSuccess = (data: Comment[]) => ({
  type: COMMENT_FETCH_SUCCESS,
  payload: data
})
