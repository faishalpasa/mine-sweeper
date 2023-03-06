import React, { useState, useEffect } from 'react'

import useStyles from './useStylesCell'

interface CellProps {
  isRevealed: boolean
  isGameOver?: boolean
  hasBomb: boolean
  positionX: number
  positionY: number
  bombDetected: number
  onClick: (position: { x: number; y: number }) => void
}

const Cell = ({
  isRevealed,
  isGameOver,
  hasBomb,
  bombDetected,
  positionX,
  positionY,
  onClick
}: CellProps) => {
  const classes = useStyles({ isGameOver })()
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
    if (!isActive && !isGameOver) {
      onClick({ x: positionX, y: positionY })
    }
  }

  useEffect(() => {
    setIsActive(isRevealed)
  }, [isRevealed])

  return (
    <div
      className={`${classes.block} ${isActive ? 'active' : ''}`}
      onClick={handleClickBlock}
      style={{ color }}
    >
      <label className={classes.label}>{label}</label>
    </div>
  )
}

export default Cell
