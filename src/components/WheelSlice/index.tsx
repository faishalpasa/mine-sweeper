import React from 'react'

import useStyles from './useStylesWheelSlice'

interface WheelSliceProps {
  name: string
  radius: number
  sliceHeight: number
  sliceOffeset: number
  rotate: number
  backgroundColor: string
  color?: string
}

const WheelSlice = ({
  name,
  radius,
  sliceHeight,
  sliceOffeset,
  rotate,
  backgroundColor,
  color
}: WheelSliceProps) => {
  const classes = useStyles({
    radius,
    sliceHeight,
    sliceOffeset,
    background: backgroundColor,
    color
  })()

  return (
    <div className={classes.wheelSlice} style={{ transform: `rotate(${rotate}deg)` }}>
      <div className={classes.label}>{name}</div>
    </div>
  )
}

export default WheelSlice
