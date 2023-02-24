import React from 'react'

import useStyles from './useStylesWheelSlice'

const colors = ['#545454', '#EF6517', '#545454', '#545454', '#545454', '#545454']

interface WheelSliceProps {
  index: number
  name?: string
  imageSrc?: string
  radius: number
  sliceHeight: number
  sliceOffeset: number
  rotate: number
  isIdle?: boolean
  color?: string
  backgroundColor?: string
}

const WheelSlice = ({
  index,
  imageSrc = '/images/box-1.png',
  radius,
  sliceHeight,
  sliceOffeset,
  rotate,
  color,
  backgroundColor
}: WheelSliceProps) => {
  const bgColor = backgroundColor || colors[index % colors.length]
  const classes = useStyles({
    index,
    radius,
    sliceHeight,
    sliceOffeset,
    backgroundColor: bgColor,
    color
  })()

  return (
    <div className={classes.wheelSlice} style={{ transform: `rotate(${rotate}deg)` }}>
      <div className={classes.label}>
        <img src={imageSrc} alt="prize" className={classes.itemPrize}></img>
      </div>
    </div>
  )
}

export default WheelSlice
