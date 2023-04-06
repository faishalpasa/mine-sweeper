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
          <div className={classes.formInputPin}>
            <TextField
              style={{ flex: 1 }}
              label="PIN"
              value="123456"
              type={isPINVisible ? 'text' : 'password'}
              InputProps={{
                readOnly: true
              }}
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" onClick={handleClickPinButton} size="small">
              {isPINVisible ? <Visibility /> : <VisibilityOff />}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickChangePINButton}
              size="small"
            >
              Ubah PIN
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

      <Backdrop open={profileState.isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Profile
