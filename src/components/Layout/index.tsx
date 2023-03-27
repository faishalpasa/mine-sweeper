import React, { lazy, memo, Suspense } from 'react'
import { isAndroid, isIOS, isWinPhone, deviceType, getUA } from 'react-device-detect'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import type { RootState } from 'redux/rootReducer'

const Board = lazy(() => import('../Board'))
const Footer = lazy(() => import('../Footer'))
const Header = lazy(() => import('../Header'))
const TopScore = lazy(() => import('../TopScore'))
const Winner = lazy(() => import('../Winner'))
const Terms = lazy(() => import('../Terms'))
const Profile = lazy(() => import('../Profile'))

const layoutSelector = ({ navigationTab }: RootState) => ({
  selectedTab: navigationTab.selectedTab
})

const Layout = () => {
  const layoutState = useSelector(layoutSelector, shallowEqual)
  const isMobile = isAndroid || isIOS || isWinPhone

  console.log({ isMobile, isAndroid, isIOS, deviceType, getUA })

  const { selectedTab } = layoutState

  return (
    <Suspense fallback={<div />}>
      <Header />
      {selectedTab === 0 && <Board />}
      {selectedTab === 1 && <TopScore />}
      {selectedTab === 2 && <Winner />}
      {selectedTab === 3 && <Terms />}
      {selectedTab === 4 && <Profile />}
      <Footer />
    </Suspense>
  )
}

export default memo(Layout)
