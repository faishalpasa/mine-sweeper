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
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import PinInput from 'react-pin-input'

import {
  authFetch,
  authDataUpdate,
  authCheckPin,
  authChangePin,
  authCheckPinReset,
  authIsPinChangedSet
} from 'redux/reducers/auth'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesProfile'

const profileSelector = ({ auth }: RootState) => ({
  data: auth.data,
  isLoading: auth.isLoading,
  isPinChecked: auth.isPinChecked,
  isPinChanged: auth.isPinChanged,
  error: auth.error
})

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const profileState = useSelector(profileSelector, shallowEqual)

  const [isDialogPINOpen, setIsDialogPINOpen] = useState(false)
  const [profile, setProfile] = useState({
    msisdn: '',
    name: '',
    email: ''
  })
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [isDialogLogoutOpen, setIsDialogLogoutOpen] = useState(false)

  const handleClickLogout = () => {
    setIsDialogLogoutOpen(true)
  }

  const handleSubmitLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('token')
    location.href = '/'
  }

  const handleChangeField = (field: string, value: string) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleClickChangePINButton = () => {
    setIsDialogPINOpen(true)
  }

  const handleClosePINDialog = () => {
    setIsDialogPINOpen(false)
    dispatch(authCheckPinReset())
  }

  const handleCloseDialogLogout = () => {
    setIsDialogLogoutOpen(false)
  }

  const handleUpdateSubmit = () => {
    dispatch(authDataUpdate(profile.name, profile.email))
  }

  const handleCheckPin = (value: string) => {
    setPin(value)
    dispatch(authCheckPin(value))
  }

  const handleChangePin = () => {
    dispatch(authChangePin(pin, newPin))
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
      dispatch(authFetch())
    }
  }, [])

  useEffect(() => {
    if (profileState.isPinChanged) {
      setIsDialogPINOpen(false)
      dispatch(authIsPinChangedSet(false))
    }
  }, [profileState.isPinChanged])

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
              disabled={isButtonUpdateDisabled}
              onClick={handleUpdateSubmit}
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
              fullWidth
            >
              Ubah PIN
            </Button>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button onClick={handleClickLogout} variant="contained" color="primary" fullWidth>
              Keluar
            </Button>
          </div>
        </Paper>
      </div>

      <Dialog open={isDialogPINOpen} onClose={handleClosePINDialog} fullWidth maxWidth="xs">
        <DialogContent>
          <>
            {!profileState.isPinChecked && (
              <div className={classes.formInput}>
                <Typography>Masukan PIN lama kamu</Typography>
                <div className={classes.inputPin}>
                  <PinInput
                    length={4}
                    type="numeric"
                    inputMode="number"
                    focus
                    inputFocusStyle={{ borderColor: '#30cfa2' }}
                    onComplete={(value, index) => handleCheckPin(value)}
                  />
                  {profileState.error.message && (
                    <small style={{ color: 'red', marginTop: '8px' }}>
                      {profileState.error.message}
                    </small>
                  )}
                </div>
              </div>
            )}

            {profileState.isPinChecked && (
              <div className={classes.formInput}>
                <Typography>Masukan PIN baru kamu</Typography>
                <div className={classes.inputPin}>
                  <PinInput
                    length={4}
                    onChange={(value, index) => setNewPin(value)}
                    type="numeric"
                    inputMode="number"
                    focus
                    inputFocusStyle={{ borderColor: '#30cfa2' }}
                  />
                </div>
              </div>
            )}
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button onClick={handleClosePINDialog} color="primary" fullWidth>
            Batal
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!profileState.isPinChecked}
            onClick={handleChangePin}
            fullWidth
          >
            Ubah
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogLogoutOpen} onClose={handleCloseDialogLogout}>
        <DialogContent>
          <Typography>Apa kamu yakin ingin keluar?</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button color="primary" onClick={handleSubmitLogout} fullWidth>
            Ya
          </Button>
          <Button variant="contained" color="primary" onClick={handleCloseDialogLogout} fullWidth>
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
