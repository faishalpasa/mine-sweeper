import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { commentFetch } from 'redux/reducers/comment'
import type { RootState } from 'redux/rootReducer'

export const boardSelector = ({ app }: RootState) => ({
  theme: app.theme
})

const Board = () => {
  const dispatch = useDispatch()
  const boardState = useSelector(boardSelector, shallowEqual)
  console.log(boardState)
  useEffect(() => {
    dispatch(commentFetch(1))
  }, [])

  return <div>Game</div>
}

export default Board
