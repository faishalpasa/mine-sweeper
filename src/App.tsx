import React, { lazy, Suspense, memo } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'

import { store } from 'redux/store'

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
    fontFamily: 'Roboto, sans-serif'
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

const App = () => {
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
