import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { Provider } from 'react-redux'

import Board from 'components/Board'
import { store } from 'redux/store'

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
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Board />
      </Provider>
    </ThemeProvider>
  )
}

export default App
