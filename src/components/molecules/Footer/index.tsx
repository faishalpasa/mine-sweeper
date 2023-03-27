import React from 'react'
import { Button } from '@material-ui/core'
import {
  Home as HomeIcon,
  Equalizer as ScoreIcon,
  Star as WinnerIcon,
  Comment as TermsIcon,
  Person as ProfileIcon
} from '@material-ui/icons'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesFooter'

const footerSelector = ({ navigationTab }: RootState) => ({
  selectedTab: navigationTab.selectedTab
})

const Footer = () => {
  const dispatch = useDispatch()
  const footerState = useSelector(footerSelector, shallowEqual)
  const classes = useStyles()()

  const { selectedTab } = footerState

  const handleSelectTab = (position: number) => {
    dispatch(navigationTabSelectedSet(position))
  }

  return (
    <div className={classes.footer}>
      <Button
        className={classes.footerItem}
        color={selectedTab === 0 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(0)}
      >
        <HomeIcon />
        Home
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 1 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(1)}
      >
        <ScoreIcon />
        Top Skor
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 2 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(2)}
      >
        <WinnerIcon />
        Pemenang
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 3 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(3)}
      >
        <TermsIcon />
        S&K
      </Button>
      <Button
        className={classes.footerItem}
        color={selectedTab === 4 ? 'primary' : 'default'}
        onClick={() => handleSelectTab(4)}
      >
        <ProfileIcon />
        Profil
      </Button>
    </div>
  )
}

export default Footer
