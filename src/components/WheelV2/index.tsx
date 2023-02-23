import React, { useEffect, useState, useMemo, memo } from 'react'

import { PlayArrow as MarkerIcon, Star as StarIcon } from '@material-ui/icons'
import { isMobile } from 'react-device-detect'

import WheelSlice from 'components/WheelSlice'

import useStyles from './useStylesWheel'
import { Box } from '@material-ui/core'

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
  },
  {
    name: 'Reward 9'
  },
  {
    name: 'Reward 10'
  },
  {
    name: 'Reward 11'
  },
  {
    name: 'Reward 12'
  }
]

const rearangedRewards = [...rewards].reverse()
rearangedRewards.unshift(rewards[0])
rearangedRewards.pop()
const mappedRewards = rearangedRewards.map((reward, index) => ({
  ...reward,
  moreThan: index === 0 ? rewards.length - 0.5 : index - 0.5,
  lessThan: index === 0 ? 0.5 : index + 0.5
}))

const spinDuration = 5
const diameter = isMobile ? 280 : 400
const numberOfSlices = rewards.length
const rotateRadius = 360 / numberOfSlices
const radius = diameter / 2
const circumfrance = 6.283185307 * radius
const sliceHeight = circumfrance / numberOfSlices
const sliceOffeset = sliceHeight / 2
const colors = ['#F5F5F7', '#EE2B65', '#00ACE2', '#FDC202']

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomNumber = generateRandomNumber(10, 10 + rewards.length)

const Wheel = () => {
  const rotation = useMemo(() => randomNumber * 360, [randomNumber])

  const calculatedRotation = (rotation / rotateRadius) % rewards.length
  const selectedReward = mappedRewards.find(
    (item) => item.lessThan > calculatedRotation && item.moreThan < calculatedRotation
  )

  const classes = useStyles({
    spinDuration,
    diameter,
    rotation
  })()
  const [isSpinning, setIsSpinning] = useState(false)

  const handleSetSpinning = () => {
    setIsSpinning(true)
  }

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        alert(`Hadiah terpilih ${selectedReward?.name}`)
      }, spinDuration * 1000 + 500)
    }
  }, [isSpinning])

  console.log(4 % colors.length)

  return (
    <>
      <div className={classes.wheelWrapper}>
        <MarkerIcon className={classes.markerIcon}></MarkerIcon>
        <div className={classes.wheelBackground}></div>
        <div className={classes.wheelBoard}>
          <div className={`${classes.wheel} ${isSpinning ? 'spin' : ''}`}>
            {rewards.map((item, index) => (
              <WheelSlice
                key={item.name}
                radius={radius}
                rotate={rotateRadius * index}
                sliceHeight={sliceHeight}
                sliceOffeset={sliceOffeset}
                name={item.name}
                backgroundColor={colors[index % colors.length]}
                color={'#000D28'}
              />
            ))}
          </div>
        </div>
        <StarIcon className={classes.starIcon}></StarIcon>
      </div>

      <Box
        onClick={handleSetSpinning}
        className={`${classes.button} ${isSpinning ? 'disabled' : ''}`}
      >
        Putar
      </Box>
    </>
  )
}

export default memo(Wheel)
