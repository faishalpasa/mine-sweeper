import React from 'react'

import useStyles from './useStylesWheelSlice'

const hColors = ['21', '46', '248', '289', '96', '1'] // for hsl colors: hsl(1 100% 50%)

interface WheelSliceProps {
  index: number
  name?: string
  imageSrc?: string
  radius: number
  sliceHeight: number
  sliceOffeset: number
  rotate: number
  isIdle: boolean
  color?: string
}

const WheelSlice = ({
  index,
  imageSrc = '/images/box-1.png',
  radius,
  sliceHeight,
  sliceOffeset,
  rotate,
  isIdle,
  color
}: WheelSliceProps) => {
  const hColor = hColors[index % hColors.length]
  const classes = useStyles({
    index,
    radius,
    sliceHeight,
    sliceOffeset,
    hColor,
    color
  })()

  return (
    <div
      className={`${classes.wheelSlice} ${isIdle ? 'glowing' : ''}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className={classes.label}>
        <img src={imageSrc} alt="prize" className={classes.itemPrize}></img>
      </div>
    </div>
  )
}

export default WheelSlice
