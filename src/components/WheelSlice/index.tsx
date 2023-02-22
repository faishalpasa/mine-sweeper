import React from 'react'

import useStyles from './useStylesWheelSlice'

const colors = ['#F15D21', '#54CD05', '#D9C502']

interface WheelSliceProps {
  index: number
  name: string
  radius: number
  sliceHeight: number
  sliceOffeset: number
  rotate: number
}

const WheelSlice = ({
  index,
  name,
  radius,
  sliceHeight,
  sliceOffeset,
  rotate
}: WheelSliceProps) => {
  const background = colors[index % 3]
  const classes = useStyles({
    radius,
    sliceHeight,
    sliceOffeset,
    background
  })()

  return (
    <div className={classes.wheelSlice} style={{ transform: `rotate(${rotate}deg)` }}>
      <div className={classes.label}>{name}</div>
    </div>
  )
}

export default WheelSlice
