import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'

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
      <div>Mine Sweeper</div>
    </ThemeProvider>
  )
}

export default App
