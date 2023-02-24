import React, { memo } from 'react'
import { Box, Button } from '@material-ui/core'

import useStyles from './useStylesPlayButton'

interface PlayButtonProps {
  disabled?: boolean
  isSpinning?: boolean
  isActive?: boolean
  onClick?: () => void
}

const PlayButton = ({ isSpinning, isActive, onClick, disabled }: PlayButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.playButtonWrapper}>
      <div className={classes.buttonPlatform}>
        <Button
          onClick={onClick}
          disabled={disabled}
          className={`${classes.buttonPlay} ${isSpinning ? 'disabled' : ''} ${
            !isSpinning && isActive && !disabled ? 'glow' : ''
          }`}
        >
          {isActive ? 'Putar' : 'Mulai'}
        </Button>
      </div>
    </div>
  )
}

export default memo(PlayButton)
