import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField
} from '@material-ui/core'
import { Timer as TimerIcon } from '@material-ui/icons'

import useStyles from './useStylesHeader'
import { PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import { millisToMinutesAndSeconds } from 'utils/number'

const isAuthenticated = localStorage.getItem('auth')

const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isDialogLoginOpen, setIsDialogLoginOpen] = useState(false)
  const [isDialogPinOpen, setIsDialogPinOpen] = useState(false)
  const [time, setTime] = useState(0)

  const handleClickLogin = () => {
    setIsDialogLoginOpen(true)
  }

  const handleCloseDialogLogin = () => {
    setIsDialogLoginOpen(false)
  }

  const handleSubmitLogin = () => {
    setIsDialogLoginOpen(false)
    setIsDialogPinOpen(true)
  }

  const handleCloseDialogPin = () => {
    setIsDialogPinOpen(false)
  }

  const handleSubmitPin = () => {
    localStorage.setItem('auth', '1')
    location.href = '/'
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setTime((prevState) => prevState + 1000)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          {isAuthenticated && (
            <div className={classes.user}>
              <div onClick={handleToProfile} className={classes.buttonProfile}>
                <PhoneIcon />
                <div className={classes.buttonProfileLabel}>
                  <Typography className={classes.profileName}>John Doe</Typography>
                  <Typography className={classes.profileMsisdn}>0811234567890</Typography>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className={classes.timer}>
              <TimerIcon />
              <Typography variant="body1">
                <b>{millisToMinutesAndSeconds(time)}</b>
              </Typography>
            </div>
          ) : (
            <div className={classes.logout}>
              <Button onClick={handleClickLogin} size="small" variant="outlined" color="primary">
                Masuk
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogLoginOpen} onClose={handleCloseDialogLogin}>
        <DialogContent>
          <Typography>Silakan masukan nomor handphone kamu</Typography>
          <TextField variant="outlined" margin="dense" placeholder="081234567890" />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" color="primary" onClick={handleSubmitLogin}>
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogPinOpen} onClose={handleCloseDialogPin}>
        <DialogContent>
          <Typography>Masukan nomor pin kamu. Cek inbox SMS</Typography>
          <TextField variant="outlined" margin="dense" placeholder="******" />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" color="primary" onClick={handleSubmitPin}>
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
