import React, { useState, useEffect } from 'react'
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Paper
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { profileDataFetch } from 'redux/reducers/profile'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesProfile'

const profileSelector = ({ profile }: RootState) => ({
  data: profile.data,
  isLoading: profile.isLoading
})

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const profileState = useSelector(profileSelector, shallowEqual)

  const [isPINVisible, setIsPINVisible] = useState(false)
  const [isDialogPINOpen, setIsDialogPINOpen] = useState(false)
  const [profile, setProfile] = useState({
    msisdn: '',
    name: '',
    email: ''
  })
  const [isDialogLogoutOpen, setIsDialogLogoutOpen] = useState(false)

  const handleClickLogout = () => {
    setIsDialogLogoutOpen(true)
  }

  const handleSubmitLogout = () => {
    localStorage.removeItem('auth')
    location.href = '/'
  }

  const handleChangeField = (field: string, value: string) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleClickPinButton = () => {
    setIsPINVisible((prevState) => !prevState)
  }

  const handleClickChangePINButton = () => {
    setIsDialogPINOpen(true)
  }

  const handleClosePINDialog = () => {
    setIsDialogPINOpen(false)
  }

  const handleCloseDialogLogout = () => {
    setIsDialogLogoutOpen(false)
  }

  const isButtonUpdateDisabled =
    profile.name === profileState.data.name && profile.email === profileState.data.email

  useEffect(() => {
    if (profileState.data.msisdn) {
      setProfile(profileState.data)
    }
  }, [profileState.data.msisdn])

  useEffect(() => {
    if (!profileState.data.msisdn) {
      dispatch(profileDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle}>Data Diri</Typography>
        <Paper className={classes.paper}>
          <div className={classes.formInput}>
            <TextField
              label="No. Handphone"
              value={profile.msisdn}
              InputProps={{ readOnly: true }}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              label="Nama"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="name"
              type="text"
              value={profile.name}
              onChange={(e) => handleChangeField(e.target.name, e.target.value)}
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              label="Email"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="email"
              type="text"
              value={profile.email}
              onChange={(e) => handleChangeField(e.target.name, e.target.value)}
            />
          </div>
          <div className={classes.actionButtons}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              disabled={isButtonUpdateDisabled}
            >
              Simpan
            </Button>
          </div>
        </Paper>

        <Typography className={classes.contentTitle}>Keamanan</Typography>
        <Paper className={classes.paper}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickChangePINButton}
              size="small"
              fullWidth
            >
              Ubah PIN
            </Button>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button
              onClick={handleClickLogout}
              size="small"
              variant="contained"
              color="primary"
              fullWidth
            >
              Keluar
            </Button>
          </div>
        </Paper>
      </div>

      <Dialog open={isDialogPINOpen} onClose={handleClosePINDialog}>
        <DialogContent>
          <div className={classes.formInput}>
            <TextField
              label="PIN Lama"
              type="password"
              name="old_pin"
              InputLabelProps={{ shrink: true }}
              InputProps={{ autoComplete: 'off' }}
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              label="PIN Baru"
              type="password"
              name="new_pin"
              InputLabelProps={{ shrink: true }}
              InputProps={{ autoComplete: 'off' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePINDialog} color="primary" size="small">
            Batal
          </Button>
          <Button color="primary" variant="contained" size="small">
            Ubah
          </Button>
        </DialogActions>
      </Dialog>

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

      <Backdrop open={profileState.isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Profile
