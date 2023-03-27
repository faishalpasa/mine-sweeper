import React, { lazy, Suspense, memo } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { isAndroid, isIOS, isWinPhone, deviceType, getUA } from 'react-device-detect'

import { store } from 'redux/store'

const Layout = lazy(() => import('./components/Layout'))

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bfff'
    }
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      containedPrimary: {
        color: '#fff'
      }
    }
  }
})

const App = () => {
  const isMobile = isAndroid || isIOS || isWinPhone
  console.log({ isMobile, isAndroid, isIOS, deviceType, getUA })
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Suspense fallback={<div />}>
          <Layout />
        </Suspense>
      </Provider>
    </ThemeProvider>
  )
}

export default memo(App)
