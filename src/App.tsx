import React, { lazy, Suspense, memo, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import TagManager from 'react-gtm-module'

import { store } from 'redux/store'
import config from 'config'

const Layout = lazy(() => import('./components/organisms/Layout'))

const theme = createTheme({
  palette: {
    primary: {
      main: '#30cfa2'
    },
    secondary: {
      main: '#30ACCF'
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
    },
    MuiDialog: {
      root: {
        '& .MuiBackdrop-root': {
          zIndex: 0
        }
      }
    },
    MuiDialogContent: {
      root: {
        padding: '16px',
        '&:first-child': {
          paddingTop: '16px'
        }
      }
    },
    MuiBackdrop: {
      root: {
        zIndex: 2
      }
    }
  }
})

const tagManagerArgs = {
  gtmId: config.googleAnalyticId as string
  // gtmId: 'G-13PXCSFENW'
}

const App = () => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

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
