import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Checkbox
} from '@material-ui/core'
import { Timer as TimerIcon } from '@material-ui/icons'
import PinInput from 'react-pin-input'

import useStyles from './useStylesHeader'
import { PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import { millisToMinutesAndSeconds } from 'utils/number'
import {
  authLogin,
  authLoginPin,
  authChangePin,
  authFetch,
  authRegister,
  authResetPin
} from 'redux/reducers/auth'
import { appDialogLoginSet } from 'redux/reducers/app'
import type { RootState } from 'redux/rootReducer'

const headerSelector = ({ auth, navigationTab, app }: RootState) => ({
  data: auth.data,
  appData: app.data,
  isLoading: auth.isLoading,
  isAuthenticated: auth.isAuthenticated,
  isPinChanged: auth.isPinChanged,
  isPinReset: auth.isPinReset,
  error: auth.error,
  selectedTab: navigationTab.selectedTab,
  isLoginOpen: app.isDialogLoginOpen
})

const token = localStorage.getItem('token')
const TIMER_SMS_RESEND = 300000

const Header = () => {
  const dispatch = useDispatch()
  const headerState = useSelector(headerSelector, shallowEqual)
  const classes = useStyles()
  const [isDialogLoginOpen, setIsDialogLoginOpen] = useState(false)
  const [isDialogPinOpen, setIsDialogPinOpen] = useState(false)
  const [isDialogChangePinOpen, setIsDialogChangePinOpen] = useState(false)
  const [isMsisdnSubmitted, setIsMsisdnSubmitted] = useState(false)
  const [isPinSubmitted, setIsPinSubmitted] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isTermChecked, setIsTermChecked] = useState(false)
  const [msisdn, setMsisdn] = useState('')
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [timer, setTimer] = useState(0)
  const [countdownSMS, setCountdownSMS] = useState(TIMER_SMS_RESEND)

  let pinInputRef: PinInput | null

  const { error, data, isPinReset, isAuthenticated, appData, isLoginOpen } = headerState
  const isFirstTimePin = data.is_first_time_pin && +data.is_first_time_pin === 1
  const isButtonResendSMSDisabled = countdownSMS > 0

  const handleClickLogin = () => {
    dispatch(appDialogLoginSet(true))
  }

  const handleCloseDialogLogin = () => {
    dispatch(appDialogLoginSet(false))
  }

  const handleSubmitLogin = () => {
    dispatch(authLogin(msisdn))
    setIsMsisdnSubmitted(true)
  }

  const handleSubmitRegister = () => {
    dispatch(authRegister(msisdn))
    setIsMsisdnSubmitted(true)
    setIsRegister(true)
  }

  const handleCloseDialogPin = () => {
    setIsDialogPinOpen(false)
  }

  const handleSubmitPin = () => {
    dispatch(authLoginPin(msisdn, pin))
    setIsPinSubmitted(true)
  }

  const handleResetPin = () => {
    dispatch(authResetPin())
    pinInputRef?.clear()
  }

  const handleResendSMS = () => {
    dispatch(authResetPin())
    setCountdownSMS(TIMER_SMS_RESEND)
    pinInputRef?.clear()
  }

  const handleSubmitChangePin = () => {
    dispatch(authChangePin(pin, newPin))
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

  const handleCheckTerm = () => {
    setIsTermChecked((prevState) => !prevState)
  }

  const handleToTerms = () => {
    dispatch(appDialogLoginSet(false))
    dispatch(navigationTabSelectedSet(3))
  }

  useEffect(() => {
    setIsDialogLoginOpen(isLoginOpen)
  }, [isLoginOpen])

  useEffect(() => {
    if (token) {
      dispatch(authFetch())
    }
  }, [token])

  useEffect(() => {
    if (isAuthenticated && headerState.appData.time) {
      setTimer(headerState.appData.time)
    }
  }, [headerState.appData.time, isAuthenticated])

  useEffect(() => {
    if (headerState.data.id && isMsisdnSubmitted) {
      setIsDialogLoginOpen(false)
      setIsDialogPinOpen(true)
    }
  }, [headerState.data, isMsisdnSubmitted])

  useEffect(() => {
    if (headerState.data.token && isPinSubmitted && isFirstTimePin && !isPinReset) {
      setIsDialogPinOpen(false)
      setIsDialogChangePinOpen(true)
      localStorage.setItem('token', headerState.data.token)
    }
    if (headerState.data.token && isPinSubmitted && !isFirstTimePin) {
      setIsDialogPinOpen(false)
      localStorage.setItem('auth', '1')
      localStorage.setItem('token', headerState.data.token)
      location.href = '/'
    }
  }, [headerState.data, isPinSubmitted, isFirstTimePin, isPinReset])

  useEffect(() => {
    if (headerState.data.token && headerState.isPinChanged && headerState.selectedTab === 0) {
      setIsDialogChangePinOpen(false)
      localStorage.setItem('auth', '1')
      localStorage.setItem('token', headerState.data.token)
      location.href = '/'
    }
  }, [headerState.isPinChanged, headerState.data, headerState.selectedTab])

  useEffect(() => {
    setTimer(appData.time)
  }, [appData.time])

  useEffect(() => {
    let intervalTimer: any = null
    if (isAuthenticated && headerState.selectedTab === 0) {
      intervalTimer = setInterval(() => {
        setTimer((prevState) => prevState + 1000)
      }, 1000)

      return () => clearInterval(intervalTimer)
    } else {
      clearInterval(intervalTimer)
      setTimer(appData.time)
    }
  }, [headerState.selectedTab, isAuthenticated, appData.time])

  useEffect(() => {
    let intervalSMS: any = null
    if (isDialogPinOpen && countdownSMS > 0) {
      intervalSMS = setInterval(() => {
        setCountdownSMS((prevState) => prevState - 1000)
      }, 1000)

      return () => clearInterval(intervalSMS)
    } else {
      clearInterval(intervalSMS)
    }
  }, [isDialogPinOpen, countdownSMS])

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          {isAuthenticated && (
            <div className={classes.user}>
              <div onClick={handleToProfile} className={classes.buttonProfile}>
                <PhoneIcon />
                <div className={classes.buttonProfileLabel}>
                  <Typography className={classes.profileName}>{data.name || '-'}</Typography>
                  <Typography className={classes.profileMsisdn}>{data.msisdn}</Typography>
                </div>
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className={classes.timer}>
              {headerState.selectedTab === 0 ? (
                <>
                  <TimerIcon />
                  <Typography variant="body1">
                    <b>{millisToMinutesAndSeconds(timer)}</b>
                  </Typography>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <Button
              onClick={handleClickLogin}
              variant="contained"
              color="primary"
              className={classes.loginButton}
            >
              Masuk
            </Button>
          )}
        </div>
      </div>

      <Dialog
        open={isDialogLoginOpen}
        onClose={handleCloseDialogLogin}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Silahkan masukan nomer HP anda:</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="081234567890"
            onChange={(e) => setMsisdn(e.target.value)}
            value={msisdn}
            error={!!error.message}
            helperText={error.message}
            fullWidth
            type="tel"
          />
          <div className={classes.checkboxWrapper}>
            <Checkbox
              color="primary"
              checked={isTermChecked}
              onClick={handleCheckTerm}
              className={classes.checkbox}
            />
            <Typography variant="caption">
              Saya menyetujui&nbsp;
              <a style={{ color: '#30cfa2', fontWeight: 600 }} onClick={handleToTerms}>
                syarat dan ketentuan
              </a>
              &nbsp;yang berlaku.
            </Typography>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitLogin}
            disabled={headerState.isLoading || msisdn.length < 8 || !isTermChecked}
            fullWidth
          >
            Masuk
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitRegister}
            disabled={headerState.isLoading || msisdn.length < 8 || !isTermChecked}
            fullWidth
          >
            Daftar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogPinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          {isPinReset ? (
            <Typography>PIN baru telah terkirim ke nomor handphone mu. Cek inbox SMS.</Typography>
          ) : (
            <Typography>Masukan nomor PIN anda. {isFirstTimePin && 'Cek inbox SMS'}</Typography>
          )}
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value, index) => setPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
              ref={(n) => (pinInputRef = n)}
            />
            {error.message && (
              <small style={{ color: 'red', marginTop: '8px' }}>{error.message}</small>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitPin}
            disabled={headerState.isLoading || pin.length < 6}
            fullWidth
          >
            Konfirmasi
          </Button>
          {!isPinReset && !isRegister ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPin}
              disabled={headerState.isLoading}
              fullWidth
            >
              Reset PIN
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendSMS}
              disabled={headerState.isLoading || isButtonResendSMSDisabled}
              fullWidth
            >
              {isButtonResendSMSDisabled
                ? millisToMinutesAndSeconds(countdownSMS)
                : 'Kirim Ulang SMS'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogChangePinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Masukan nomor pin baru kamu.</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value, index) => setNewPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-end', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitChangePin}
            disabled={headerState.isLoading || newPin.length < 6}
            fullWidth
            style={{ maxWidth: '50%' }}
          >
            Ubah PIN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
