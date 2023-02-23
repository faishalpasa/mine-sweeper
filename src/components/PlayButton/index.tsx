import React, { memo } from 'react'
import { Box } from '@material-ui/core'

import useStyles from './useStylesPlayButton'

interface PlayButtonProps {
  disabled?: boolean
  isSpinning?: boolean
  isActive?: boolean
  onClick?: () => void
}

const PlayButton = ({ isSpinning, isActive, onClick }: PlayButtonProps) => {
  const classes = useStyles()

  return (
    <div className={classes.playButtonWrapper}>
      <div className={classes.buttonPlatform}>
        <Box
          onClick={onClick}
          className={`${classes.buttonPlay} ${isSpinning ? 'disabled' : ''} ${
            !isSpinning && isActive ? 'glow' : ''
          }`}
        >
          {isActive ? 'Putar' : 'Mulai'}
        </Box>
      </div>
    </div>
  )
}

export default memo(PlayButton)
