import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import type { RootState } from 'redux/rootReducer'
import useStyles from './useStylesCell'
import { Typography } from '@material-ui/core'

const cellSelector = ({ app }: RootState) => ({
  isToggleFlag: app.isToggleFlag,
  board: app.board
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
  const { board } = boardState

  const classes = useStyles({ hasBomb, columns: board.columns })
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
    >
      <div className={classes.flipBoxInner}>
        <div className={classes.flipBoxFront} />
        <div className={classes.flipBoxBack}>
          {isFlagged ? (
            <Typography className={classes.label}>🚩</Typography>
          ) : (
            <Typography className={classes.label} style={{ color }}>
              {label}
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cell
