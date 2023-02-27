import React, { useEffect, memo, useState } from 'react'

import { Star as StarIcon, Room as MarkerIcon } from '@material-ui/icons'

import WheelSlice from 'components/WheelSlice'
import useWindowSize from 'hooks/useWindowSize'

import useStyles from './useStylesWheel'

const rewards = [
  {
    id: 10,
    name: 'Kuota 12GB',
    imageSrc: `${process.env.REACT_APP_URL}/images/prize-4.png`,
    value: 12,
    backgroundColor: '#3f51b5'
  },
  {
    id: 11,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#39c8b8'
  },
  {
    id: 12,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#9ec839'
  },
  {
    id: 1,
    name: 'Kuota 4GB',
    imageSrc: `${process.env.REACT_APP_URL}/images/prize-1.png`,
    value: 3,
    backgroundColor: '#3f51b5'
  },
  {
    id: 2,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#9e9e9e'
  },
  {
    id: 3,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#FBC617'
  },
  {
    id: 4,
    name: 'Kuota 6GB',
    imageSrc: `${process.env.REACT_APP_URL}/images/prize-2.png`,
    value: 6,
    backgroundColor: '#3f51b5'
  },
  {
    id: 5,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#29c196'
  },
  {
    id: 6,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#b35db4'
  },
  {
    id: 7,
    name: 'Kuota 8GB',
    imageSrc: `${process.env.REACT_APP_URL}/images/prize-3.png`,
    value: 9,
    backgroundColor: '#3f51b5'
  },
  {
    id: 8,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#b7df6f'
  },
  {
    id: 9,
    name: 'Zonk',
    imageSrc: `${process.env.REACT_APP_URL}/images/zonk.png`,
    value: 0,
    backgroundColor: '#dfa46f'
  }
]
const zonkRewards = rewards.filter((item) => item.value === 0)

// console.log(zonkRewards)

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

const numberOfSlices = rewards.length
const numberOfBulbs = numberOfSlices * 2
const rotateRadius = 360 / numberOfSlices
const rotateRadiusBulb = 360 / numberOfBulbs

const randomRotation =
  generateRandomNumber(0, rotateRadius / 2) - generateRandomNumber(0, rotateRadius / 2)
const randomSelectedZonkPrize = zonkRewards[Math.floor(Math.random() * zonkRewards.length)]

interface WheelProps {
  isIdle: boolean
  isSpinning: boolean
  onSpinningEnd: (value: Record<string, any>) => void
  prize: number
}

const Wheel = ({ isSpinning, onSpinningEnd, prize }: WheelProps) => {
  const windowSize = useWindowSize()
  const [isStopped, setIsStopped] = useState(false)

  let diameter = 500 - 64
  if (windowSize.width < 500) {
    diameter = windowSize.width - 64
  }
  const radius = diameter / 2
  const circumfrance = 6.283185307 * radius
  const sliceHeight = circumfrance / numberOfSlices
  const sliceOffeset = sliceHeight / 2

  let findPrizeIndex = 0
  if (prize) {
    findPrizeIndex = mappedRewards.findIndex((item) => item.value === prize)
  } else {
    findPrizeIndex = rewards.findIndex((item) => item.value === randomSelectedZonkPrize.value)
  }

  const rotation = 20 * 360 + rotateRadius * findPrizeIndex + randomRotation

  const selectedReward = rewards.find((item) => item.value === prize)

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
        onSpinningEnd(selectedReward || {})
        setIsStopped(true)
      }, spinDuration * 1000)
    }
  }, [isSpinning])

  return (
    <div className={classes.wheelPosition}>
      <MarkerIcon className={classes.markerIcon}></MarkerIcon>
      <StarIcon
        className={classes.starIcon}
        style={{
          animationDuration: `${isSpinning ? '0.25s' : '1.5s'}`
        }}
      ></StarIcon>
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
                className={`${classes.wheelBulb} ${index % 2 === 0 ? 'even' : 'odd'}`}
                style={{
                  animationDuration: `${isSpinning ? '0.25s' : '1.5s'}`
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
              value={item.value}
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
