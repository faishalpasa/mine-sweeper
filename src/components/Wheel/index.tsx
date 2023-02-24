import React, { useEffect, useMemo, memo, useState } from 'react'

import { Star as StarIcon, Room as MarkerIcon } from '@material-ui/icons'

import WheelSlice from 'components/WheelSlice'
import useWindowSize from 'hooks/useWindowSize'

import useStyles from './useStylesWheel'

const rewards = [
  { id: 1, name: 'Kuota 4GB' },
  { id: 2, name: 'Kuota 4GB' }, // change to Zonk
  { id: 3, name: 'Zonk' },
  { id: 4, name: 'Kuota 6GB' },
  { id: 5, name: 'Kuota 6GB' }, // change to zonk
  { id: 6, name: 'Zonk' },
  { id: 7, name: 'Kuota 8GB' },
  { id: 8, name: 'Kuota 8GB' }, // change to zonk
  { id: 9, name: 'Zonk' },
  { id: 10, name: 'Kuota 12GB' },
  { id: 11, name: 'Kuota 12GB' }, // change to zonk
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

const spinDuration = 10

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomNumber = generateRandomNumber(20, 20 + rewards.length)

interface WheelProps {
  isIdle: boolean
  isSpinning: boolean
  onSpinningEnd: (value: string) => void
}

const Wheel = ({ isIdle, isSpinning, onSpinningEnd }: WheelProps) => {
  const windowSize = useWindowSize()
  const rotation = useMemo(() => randomNumber * 360, [randomNumber])
  const [isStopped, setIsStopped] = useState(false)

  let diameter = 500 - 64
  if (windowSize.width < 500) {
    diameter = windowSize.width - 64
  }

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
        onSpinningEnd(selectedReward?.name || '')
        setIsStopped(true)
      }, spinDuration * 1000)
    }
  }, [isSpinning])

  return (
    <>
      <div className={classes.wheelWrapper}>
        <div className={classes.wheelPosition}>
          <MarkerIcon className={classes.markerIcon}></MarkerIcon>
          <StarIcon className={classes.starIcon}></StarIcon>
          <div className={`${classes.wheelBackground} ${isSpinning ? 'spin' : ''}`}></div>
          <div className={classes.wheelBoard}>
            <div
              className={`${classes.wheel} ${isSpinning ? 'spin' : ''} ${isStopped ? 'stop' : ''} `}
            >
              {rewards.map((item, index) => (
                <WheelSlice
                  index={index}
                  key={item.id}
                  radius={radius}
                  rotate={rotateRadius * index}
                  sliceHeight={sliceHeight}
                  sliceOffeset={sliceOffeset}
                  name={item.name}
                  isIdle={isIdle}
                  color={'#000D28'}
                  imageSrc={`/images/box-${(index % 4) + 1}.png`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Wheel)
