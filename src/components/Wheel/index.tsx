import React, { useEffect, useMemo, memo, useState } from 'react'

import { Star as StarIcon, Room as MarkerIcon } from '@material-ui/icons'

import WheelSlice from 'components/WheelSlice'
import useWindowSize from 'hooks/useWindowSize'

import useStyles from './useStylesWheel'

const rewards = [
  {
    id: 1,
    name: 'Kuota 4GB',
    imageSrc: '/images/prize-1.png',
    value: 1,
    backgroundColor: '#545454'
  },
  {
    id: 2,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#9b0000'
  },
  {
    id: 3,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#FBC617'
  },
  {
    id: 4,
    name: 'Kuota 6GB',
    imageSrc: '/images/prize-2.png',
    vaue: 2,
    backgroundColor: '#545454'
  },
  {
    id: 5,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#6DBD42'
  },
  {
    id: 6,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#EF6517'
  },
  {
    id: 7,
    name: 'Kuota 8GB',
    imageSrc: '/images/prize-3.png',
    value: 3,
    backgroundColor: '#545454'
  },
  {
    id: 8,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#9b0000'
  },
  {
    id: 9,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#FBC617'
  },
  {
    id: 10,
    name: 'Kuota 12GB',
    imageSrc: '/images/prize-4.png',
    value: 4,
    backgroundColor: '#545454'
  },
  {
    id: 11,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#6DBD42'
  },
  {
    id: 12,
    name: 'Zonk',
    imageSrc: '/images/zonk.png',
    value: 0,
    backgroundColor: '#EF6517'
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

const spinDuration = 10

const generateRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomNumber = generateRandomNumber(20, 20 + rewards.length)

interface WheelProps {
  isIdle: boolean
  isSpinning: boolean
  onSpinningEnd: (value: Record<string, any>) => void
}

const Wheel = ({ isSpinning, onSpinningEnd }: WheelProps) => {
  const windowSize = useWindowSize()
  const rotation = useMemo(() => randomNumber * 360, [randomNumber])
  const [isStopped, setIsStopped] = useState(false)

  let diameter = 500 - 64
  if (windowSize.width < 500) {
    diameter = windowSize.width - 64
  }

  const numberOfSlices = rewards.length
  const numberOfBulbs = numberOfSlices * 2
  const rotateRadius = 360 / numberOfSlices
  const rotateRadiusBulb = 360 / numberOfBulbs
  const radius = diameter / 2
  const circumfrance = 6.283185307 * radius
  const sliceHeight = circumfrance / numberOfSlices
  const sliceOffeset = sliceHeight / 2
  const calculatedRotation = (rotation / rotateRadius) % rewards.length
  const selectedReward = mappedRewards.find(
    (item) => item.lessThan > calculatedRotation && item.moreThan < calculatedRotation
  )

  const bulbs = Array.from(Array(numberOfBulbs).keys())

  const classes = useStyles({
    spinDuration,
    diameter,
    rotation,
    sliceHeight,
    sliceOffeset
  })()

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        console.log(`Hadiah terpilih ${selectedReward?.name}`)
        onSpinningEnd(selectedReward || {})
        setIsStopped(true)
      }, spinDuration * 1000)
    }
  }, [isSpinning])

  return (
    <div className={classes.wheelPosition}>
      <MarkerIcon className={classes.markerIcon}></MarkerIcon>
      <StarIcon className={classes.starIcon}></StarIcon>
      <div className={classes.wheelBackground}></div>
      <div className={classes.wheelBulbWrapper}>
        <div className={classes.wheelBulbs}>
          {bulbs.map((bulb, index) => (
            <div
              className={classes.wheelBulbPlace}
              key={bulb}
              style={{
                transform: `rotate(${rotateRadiusBulb * index}deg)`
              }}
            >
              <div
                className={classes.wheelBulb}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: `${isSpinning ? '0.25s' : '1s'}`
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.wheelBoard}>
        <div className={`${classes.wheel} ${isSpinning ? 'spin' : ''} ${isStopped ? 'stop' : ''}`}>
          {rewards.map((item, index) => (
            <WheelSlice
              index={index}
              key={item.id}
              radius={radius}
              rotate={rotateRadius * index}
              sliceHeight={sliceHeight}
              sliceOffeset={sliceOffeset}
              name={item.name}
              imageSrc={item.imageSrc || `/images/box-${(index % 4) + 1}.png`}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(Wheel)
