import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core'

import useStyles from './useStylesHeader'
import { PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'

const isAuthenticated = localStorage.getItem('auth')

const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isDialogLogoutOpen, setIsDialogLogoutOpen] = useState(false)

  const handleClickLogout = () => {
    setIsDialogLogoutOpen(true)
  }

  const handleCloseDialogLogout = () => {
    setIsDialogLogoutOpen(false)
  }

  const handleSubmitLogout = () => {
    localStorage.removeItem('auth')
    location.href = '/'
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

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

          <div className={classes.logout}>
            <Button onClick={handleClickLogout} size="small" variant="outlined" color="primary">
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogLogoutOpen} onClose={handleCloseDialogLogout}>
        <DialogContent>
          <Typography>Apa kamu yakin ingin keluar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary" onClick={handleSubmitLogout}>
            Ya
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDialogLogout}
            size="small"
          >
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
