import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

import WheelSlice from 'components/WheelSlice'

import useStyles from './useStylesWheel'

const rewards = [
  {
    name: 'Reward 1'
  },
  {
    name: 'Reward 2'
  },
  {
    name: 'Reward 3'
  },
  {
    name: 'Reward 4'
  },
  {
    name: 'Reward 5'
  },
  {
    name: 'Reward 6'
  },
  {
    name: 'Reward 7'
  },
  {
    name: 'Reward 8'
  }
  // {
  //   name: 'Reward 9'
  // },
  // {
  //   name: 'Reward 10'
  // },
  // {
  //   name: 'Reward 11'
  // },
  // {
  //   name: 'Reward 12'
  // }
]

const colors = ['#F15D21', '#54CD05', '#D9C502']

const spinDuration = 5
const diameter = isMobile ? 280 : 340
const numberOfSlices = rewards.length
const rotateRadius = 360 / numberOfSlices
const radius = diameter / 2
const circumfrance = 6.283185307 * radius
const sliceHeight = circumfrance / numberOfSlices
const sliceOffeset = sliceHeight / 2

function generateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const Wheel = () => {
  const rotation = generateRandomNumber(10, 15) * 360
  const classes = useStyles({
    spinDuration,
    diameter,
    rotation
  })()
  const [isSpinning, setIsSpinning] = useState(false)

  const handleSetSpinning = () => {
    setIsSpinning(true)
  }

  // useEffect(() => {
  //   if (isSpinning) {
  //     setTimeout(() => {
  //       setIsSpinning(false)
  //     }, spinDuration * 1000)
  //   }
  // }, [isSpinning])

  return (
    <div className={classes.app}>
      <div style={{ position: 'relative' }}>
        <div className={classes.triangle}></div>
        <div className={classes.wheelBackground}></div>
        <div className={classes.wheelWrapper}>
          <div className={`${classes.wheel} ${isSpinning ? 'spin' : ''}`}>
            {rewards.map((item, index) => (
              <WheelSlice
                key={item.name}
                index={index}
                radius={radius}
                rotate={rotateRadius * index}
                sliceHeight={sliceHeight}
                sliceOffeset={sliceOffeset}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>

      <button type="button" onClick={handleSetSpinning} className={classes.button}>
        Putar
      </button>
    </div>
  )
}

export default Wheel
