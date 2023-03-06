import React from 'react'
import { Button } from '@material-ui/core'
import {
  Home as HomeIcon,
  Equalizer as ScoreIcon,
  Star as WinnerIcon,
  Comment as TermsIcon,
  Person as ProfileIcon
} from '@material-ui/icons'

import useStyles from './useStylesFooter'

const Footer = () => {
  const classes = useStyles()()

  return (
    <div className={classes.footer}>
      <Button className={classes.footerItem}>
        <HomeIcon />
        Home
      </Button>
      <Button className={classes.footerItem}>
        <ScoreIcon />
        Top Skor
      </Button>
      <Button className={classes.footerItem}>
        <WinnerIcon />
        Pemenang
      </Button>
      <Button className={classes.footerItem}>
        <TermsIcon />
        S&K
      </Button>
      <Button className={classes.footerItem}>
        <ProfileIcon />
        Profil
      </Button>
    </div>
  )
}

export default Footer
