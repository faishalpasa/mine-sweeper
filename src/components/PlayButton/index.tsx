import React, { memo } from 'react'
import { Button } from '@material-ui/core'

import useStyles from './useStylesPlayButton'

interface PlayButtonProps {
  disabled?: boolean
  isSpinning?: boolean
  onClick?: () => void
}

const PlayButton = ({ isSpinning, onClick, disabled }: PlayButtonProps) => {
  const classes = useStyles()

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      className={`${classes.buttonPlay} ${isSpinning ? 'disabled' : ''}`}
    >
      Putar
    </Button>
  )
}

export default memo(PlayButton)
