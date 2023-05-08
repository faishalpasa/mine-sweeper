import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import {
  Home as HomeIcon,
  Equalizer as ScoreIcon,
  Star as WinnerIcon,
  Comment as TermsIcon,
  Person as ProfileIcon
} from '@material-ui/icons'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import useWindowSize from 'hooks/useWindowSize'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesFooter'

const footerSelector = ({ navigationTab, auth, app }: RootState) => ({
  selectedTab: navigationTab.selectedTab,
  isAuthenticated: auth.isAuthenticated,
  dataData: app.data
})

const Footer = () => {
  const dispatch = useDispatch()
  const footerState = useSelector(footerSelector, shallowEqual)
  const classes = useStyles()
  const windowSize = useWindowSize()
  const [windowHeight, setWindowHeight] = useState(0)

  const { selectedTab, isAuthenticated } = footerState

  const handleSelectTab = (position: number) => {
    dispatch(navigationTabSelectedSet(position))
  }

  useEffect(() => {
    setWindowHeight(windowSize.height)
  }, [])

  const isNumpadShow = windowSize.height < windowHeight

  return (
    <div className={classes.footer} style={{ position: isNumpadShow ? 'static' : 'fixed' }}>
      <Button
        className={classes.footerItem}
        color={selectedTab === 0 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(0)}
      >
        <HomeIcon />
        <Typography variant="caption">Home</Typography>
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 1 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(1)}
      >
        <ScoreIcon />
        <Typography variant="caption">Top Skor</Typography>
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 2 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(2)}
      >
        <WinnerIcon />
        <Typography variant="caption">Pemenang</Typography>
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 3 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(3)}
      >
        <TermsIcon />
        <Typography variant="caption">S&K</Typography>
      </Button>
      {isAuthenticated && (
        <Button
          className={classes.footerItem}
          color={selectedTab === 4 ? 'primary' : 'default'}
          onClick={() => handleSelectTab(4)}
        >
          <ProfileIcon />
          <Typography variant="caption">Profil</Typography>
        </Button>
      )}
    </div>
  )
}

export default Footer
