import React, { lazy, memo, Suspense } from 'react'
import { isAndroid, isIOS, isWinPhone, deviceType, getUA } from 'react-device-detect'

import { useSelector, shallowEqual } from 'react-redux'

import type { RootState } from 'redux/rootReducer'

const Home = lazy(() => import('../../molecules/Home'))
const Footer = lazy(() => import('../../molecules/Footer'))
const Header = lazy(() => import('../../molecules/Header'))
const TopScore = lazy(() => import('../../molecules/TopScore'))
const Winner = lazy(() => import('../../molecules/Winner'))
const Terms = lazy(() => import('../../molecules/Terms'))
const Profile = lazy(() => import('../../molecules/Profile'))

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
      {selectedTab === 0 && <Home />}
      {selectedTab === 1 && <TopScore />}
      {selectedTab === 2 && <Winner />}
      {selectedTab === 3 && <Terms />}
      {selectedTab === 4 && <Profile />}
      <Footer />
    </Suspense>
  )
}

export default memo(Layout)
