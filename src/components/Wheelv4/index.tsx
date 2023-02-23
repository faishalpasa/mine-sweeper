import React, { useEffect, useMemo, memo, useState } from 'react'

import { PlayArrow as MarkerIcon } from '@material-ui/icons'

import WheelSlice from 'components/WheelSlice'
import useWindowSize from 'hooks/useWindowSize'

import useStyles from './useStylesWheel'

const rewards = [
  { id: 1, name: 'HADIAH' },
  { id: 2, name: 'Zonk' },
  { id: 3, name: 'Zonk' },
  { id: 4, name: 'HADIAH' },
  { id: 5, name: 'Zonk' },
  { id: 6, name: 'Zonk' },
  { id: 7, name: 'HADIAH' },
  { id: 8, name: 'Zonk' },
  { id: 9, name: 'Zonk' },
  { id: 10, name: 'HADIAH' },
  { id: 11, name: 'Zonk' },
  { id: 12, name: 'Zonk' }
]

const rearangedRewards = [...rewards].reverse()
rearangedRewards.unshift(rewards[0])
rearangedRewards.pop()
const mappedRewards = rearangedRewards.map((reward, index) => ({
  ...reward,
  moreThan: index === 0 ? rewards.length - 0.5 : index - 0.5,
  lessThan: index === 0 ? 0.5 : index + 0.5
}))

const spinDuration = 8
const colors = ['#fff', '#ffcd23']

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomNumber = generateRandomNumber(20, 20 + rewards.length)

interface WheelProps {
  isSpinning: boolean
}

const Wheel = ({ isSpinning }: WheelProps) => {
  const windowSize = useWindowSize()
  const rotation = useMemo(() => randomNumber * 360, [randomNumber])

  const diameter = windowSize.width - 64

  const numberOfSlices = rewards.length
  const rotateRadius = 360 / numberOfSlices
  const radius = diameter / 2
  const circumfrance = 6.283185307 * radius
  const sliceHeight = circumfrance / numberOfSlices
  const sliceOffeset = sliceHeight / 2
  const calculatedRotation = (rotation / rotateRadius) % rewards.length
  const selectedReward = mappedRewards.find(
    (item) => item.lessThan > calculatedRotation && item.moreThan < calculatedRotation
  )

  const classes = useStyles({
    spinDuration,
    diameter,
    rotation
  })()

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        console.log(`Hadiah terpilih ${selectedReward?.name}`)
      }, spinDuration * 1000)
    }
  }, [isSpinning])

  console.count('isSpinning')

  return (
    <>
      <div className={classes.wheelWrapper}>
        <MarkerIcon className={classes.markerIcon}></MarkerIcon>
        <div className={classes.wheelBackground}></div>
        <div className={classes.wheelBoard}>
          <div className={`${classes.wheel} ${isSpinning ? 'spin' : ''}`}>
            {rewards.map((item, index) => (
              <WheelSlice
                key={item.id}
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
      </div>
    </>
  )
}

export default memo(Wheel)
