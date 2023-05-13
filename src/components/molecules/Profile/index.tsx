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
  Paper,
  Box
} from '@material-ui/core'
import { WhatsApp as WhatsAppIcon, Chat as ChatIcon, Close as CloseIcon } from '@material-ui/icons'
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
import { profileSendMessage, profileSendMessageSet } from 'redux/reducers/profile'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesProfile'
import { pageTracking } from 'utils/analytics'

import config from 'config'

const MAX_MESSAGE = 500

const profileSelector = ({ auth, profile }: RootState) => ({
  data: auth.data,
  isLoading: auth.isLoading,
  isPinChecked: auth.isPinChecked,
  isPinChanged: auth.isPinChanged,
  isMessageSend: profile.isMessageSend,
  isLoadingSendMessage: profile.isLoadingSendMessage,
  profileError: profile.error,
  error: auth.error
})

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const profileState = useSelector(profileSelector, shallowEqual)
  const { isLoadingSendMessage, isMessageSend, profileError } = profileState

  const [isDialogPINOpen, setIsDialogPINOpen] = useState(false)
  const [isDialogMessageOpen, setIsDialogMessageOpen] = useState(false)
  const [profile, setProfile] = useState({
    msisdn: '',
    name: '',
    email: ''
  })
  const [message, setMessage] = useState('')
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

  const handleChangeMessage = (value: string) => {
    if (value.length < MAX_MESSAGE) {
      setMessage(value)
    }
  }

  const handleSendMessage = () => {
    dispatch(profileSendMessage(message))
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

  const handleClickMessageButton = () => {
    setIsDialogMessageOpen(true)
  }

  const handleCloseMessageDialog = () => {
    dispatch(profileSendMessageSet(false))
    setMessage('')
    setIsDialogMessageOpen(false)
  }

  const handleWhatsAppButton = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${config.csWhatsApp}&text=Halo Admin RanjauDarat.com`
    )
  }

  const isButtonUpdateDisabled =
    profile.name === profileState.data.name && profile.email === profileState.data.email

  useEffect(() => {
    if (profileState.data.msisdn) {
      setProfile(profileState.data)
    }
  }, [profileState.data.msisdn])

  useEffect(() => {
    pageTracking('Data Diri')

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
        <Paper
          className={classes.paper}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickChangePINButton}
            fullWidth
          >
            Ubah PIN
          </Button>

          <Button onClick={handleClickLogout} variant="contained" color="primary" fullWidth>
            Keluar
          </Button>
        </Paper>

        <Typography className={classes.contentTitle}>Hubungi Kami</Typography>
        <Paper
          className={classes.paper}
          style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickMessageButton}
            fullWidth
            endIcon={<ChatIcon />}
          >
            Tulis Pesan
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWhatsAppButton}
            fullWidth
            endIcon={<WhatsAppIcon />}
          >
            Via WhatsApp
          </Button>
        </Paper>
      </div>

      <Dialog open={isDialogMessageOpen} fullWidth maxWidth="xs">
        <DialogContent className={classes.dialogContent}>
          <div className={classes.dialogTitle}>
            <Typography variant="h6">Tulis Pesan</Typography>
          </div>
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseMessageDialog} />
          {isMessageSend ? (
            <>
              <Box marginTop="16px">
                <Typography>Pesan anda berhasil dikirim.</Typography>
              </Box>
              <Box marginTop="16px">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCloseMessageDialog}
                >
                  Tutup
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <TextField
                  label="No. Handphone"
                  variant="outlined"
                  margin="dense"
                  placeholder="081234567890"
                  fullWidth
                  type="tel"
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  value={profile.msisdn}
                />
              </Box>
              <Box marginTop="16px">
                <TextField
                  multiline
                  minRows={5}
                  label={`Pesan (${MAX_MESSAGE - message.length})`}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={message}
                  onChange={(e) => handleChangeMessage(e.target.value)}
                />
              </Box>
              <Box marginTop="16px">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSendMessage}
                  disabled={isLoadingSendMessage}
                >
                  Kirim Pesan
                  {isLoadingSendMessage && (
                    <CircularProgress size={16} style={{ marginLeft: '4px' }} />
                  )}
                </Button>
                {profileError.message && (
                  <Box color="red" marginTop="8px">
                    <small>{profileError.message}</small>
                  </Box>
                )}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogPINOpen} onClose={handleClosePINDialog} fullWidth maxWidth="xs">
        <DialogContent>
          <>
            {!profileState.isPinChecked && (
              <div className={classes.formInput}>
                <Typography>Masukan PIN lama anda:</Typography>
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

      <Dialog fullWidth maxWidth="xs" open={isDialogLogoutOpen} onClose={handleCloseDialogLogout}>
        <DialogContent>
          <Typography>Apakah anda yakin ingin keluar?</Typography>
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
