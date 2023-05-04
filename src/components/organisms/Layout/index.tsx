import React, { lazy, memo, Suspense, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
// import { isAndroid, isIOS, isWinPhone, deviceType, getUA } from 'react-device-detect'

import { snackbarClose, snackbarOpen } from 'redux/reducers/snackbar'

import type { RootState } from 'redux/rootReducer'

const Home = lazy(() => import('../../molecules/Home'))
const Footer = lazy(() => import('../../molecules/Footer'))
const Header = lazy(() => import('../../molecules/Header'))
const TopScore = lazy(() => import('../../molecules/TopScore'))
const Winner = lazy(() => import('../../molecules/Winner'))
const Terms = lazy(() => import('../../molecules/Terms'))
const Profile = lazy(() => import('../../molecules/Profile'))
// const Login = lazy(() => import('../../molecules/Login'))

const layoutSelector = ({ navigationTab, snackbar }: RootState) => ({
  selectedTab: navigationTab.selectedTab,
  snackbar: snackbar
})

const Layout = () => {
  const dispatch = useDispatch()
  const layoutState = useSelector(layoutSelector, shallowEqual)
  // const isMobile = isAndroid || isIOS || isWinPhone

  const queryParams = new URLSearchParams(window.location.search)
  const trxId = queryParams.get('trx_id')

  if (trxId) {
    localStorage.setItem('trx_id', trxId)
  }

  const { selectedTab, snackbar } = layoutState

  useEffect(() => {
    if (snackbar.isOpen) {
      setTimeout(() => {
        dispatch(snackbarClose())
      }, 3000)
    }
  }, [snackbar.isOpen])

  return (
    <Suspense fallback={<div />}>
      <Header />
      {selectedTab === 0 && <Home />}
      {selectedTab === 1 && <TopScore />}
      {selectedTab === 2 && <Winner />}
      {selectedTab === 3 && <Terms />}
      {selectedTab === 4 && <Profile />}
      <Footer />
      <Snackbar open={snackbar.isOpen} message={snackbar.message} />
    </Suspense>
  )
}

export default memo(Layout)
