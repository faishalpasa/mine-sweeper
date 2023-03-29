import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'

import useStyles from './useStylesHeader'
import { ExitToApp as LogoutIcon, PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'

const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles()()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClickLogout = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

  return (
    <>
      <div className={classes.header}>
        <div className={classes.user}>
          <Button onClick={handleToProfile}>
            <PhoneIcon />
            0811234567890
          </Button>
        </div>
        <div className={classes.logout}>
          <Button endIcon={<LogoutIcon />} onClick={handleClickLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography>Apa kamu yakin ingin logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary">
            Ya
          </Button>
          <Button variant="contained" color="primary" onClick={handleCloseDialog} size="small">
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
