import React, { useState, useEffect } from 'react'

import useStyles from './useStylesCell'

interface CellProps {
  isRevealed: boolean
  hasBomb: boolean
  positionX: number
  positionY: number
  onClick: (position: { x: number; y: number }) => void
}

const Cell = ({ isRevealed, hasBomb, positionX, positionY, onClick }: CellProps) => {
  const classes = useStyles()()
  const [isActive, setIsActive] = useState(false)

  const handleClickBlock = () => {
    if (!isActive) {
      onClick({ x: positionX, y: positionY })
    }
  }

  useEffect(() => {
    setIsActive(isRevealed)
  }, [isRevealed])

  return (
    <div className={`${classes.block} ${isActive ? 'active' : ''}`} onClick={handleClickBlock} />
  )
}

export default Cell
