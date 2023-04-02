import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import type { RootState } from 'redux/rootReducer'
import useStyles from './useStylesCell'

const cellSelector = ({ app }: RootState) => ({
  isToggleFlag: app.isToggleFlag
})

interface CellProps {
  isRevealed: boolean
  isFlagged: boolean
  isGameOver?: boolean
  hasBomb: boolean
  positionX: number
  positionY: number
  bombDetected: number
  onClick: (position: { x: number; y: number }) => void
}

const Cell = ({
  isRevealed,
  isFlagged,
  isGameOver,
  hasBomb,
  bombDetected,
  positionX,
  positionY,
  onClick
}: CellProps) => {
  const boardState = useSelector(cellSelector, shallowEqual)
  const classes = useStyles()
  const [isActive, setIsActive] = useState(false)

  let color = ''
  if (isRevealed && bombDetected === 1) {
    color = 'green'
  } else if (isRevealed && bombDetected === 2) {
    color = 'orange'
  } else if (isRevealed && bombDetected > 2) {
    color = 'red'
  }

  let label = ''
  if (isRevealed && !hasBomb && !!bombDetected) {
    label = `${bombDetected}`
  } else if (isRevealed && hasBomb) {
    label = '💣'
  }

  const handleClickBlock = () => {
    if (!isGameOver) {
      onClick({ x: positionX, y: positionY })
    }
  }

  useEffect(() => {
    setIsActive(isRevealed)
  }, [isRevealed])

  return (
    <div
      className={`${classes.block} ${isActive ? 'active' : ''} ${
        isFlagged && boardState.isToggleFlag ? 'flagged' : ''
      }`}
      onClick={handleClickBlock}
      style={{ color }}
    >
      {isFlagged ? (
        <label className={classes.label}>🚩</label>
      ) : (
        <label className={classes.label}>{label}</label>
      )}
    </div>
  )
}

export default Cell
