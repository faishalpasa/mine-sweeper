import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { ArrowForward, ArrowBack } from '@material-ui/icons'

import Wheel from './components/Wheel'
import WheelV2 from './components/WheelV2'
import WheelV3 from 'components/WheelV3'
import WheelV4 from 'components/Wheelv4'

const TOTAL_PAGE = 4

const getUrlParams = (params: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const param = urlParams.get(params)
  return param
}

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
    background: 'linear-gradient(0deg, rgba(58,180,154,1) 0%, rgba(0,71,102,1) 50%)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    gap: '64px',
    '@media (max-width:500px)': {
      gap: '40px'
    }
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  }
}))

const App = () => {
  const type = getUrlParams('type')
  const classes = useStyles()

  const handleNextPage = () => {
    const page = +(type || 1) >= TOTAL_PAGE ? 1 : +(type || 1) + 1
    window.location.href = `/?type=${page}`
  }

  const handlePrevPage = () => {
    const page = +(type || 1) <= 1 ? TOTAL_PAGE : +(type || 1) - 1
    window.location.href = `/?type=${page}`
  }

  return (
    <div className={classes.app}>
      {(!type || type === '1') && <Wheel />}
      {type === '2' && <WheelV2 />}
      {type === '3' && <WheelV3 />}
      {type === '4' && <WheelV4 />}
      <div className={classes.buttonActions}>
        <Button variant="contained" onClick={handlePrevPage} startIcon={<ArrowBack></ArrowBack>}>
          Prev
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          endIcon={<ArrowForward></ArrowForward>}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default App
