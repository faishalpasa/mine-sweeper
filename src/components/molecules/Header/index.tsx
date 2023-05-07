import React, { useState, useEffect } from 'react'
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
import {
  Timer as TimerIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from '@material-ui/icons'
import PinInput from 'react-pin-input'

import useStyles from './useStylesHeader'
import { PhoneIphone as PhoneIcon } from '@material-ui/icons'
import { navigationTabSelectedSet } from 'redux/reducers/navigationTab'
import { millisToMinutesAndSeconds } from 'utils/number'
import {
  authLogin,
  authLoginPin,
  authFetch,
  authRegister,
  authResetPin,
  authErrorReset,
  authPreRegister,
  authFirstPinCheck,
  authMsisdnCheck
} from 'redux/reducers/auth'
import { appDialogLoginSet } from 'redux/reducers/app'
import type { RootState } from 'redux/rootReducer'

const headerSelector = ({ auth, navigationTab, app }: RootState) => ({
  data: auth.data,
  appData: app.data,
  isLoading: auth.isLoading,
  isAuthenticated: auth.isAuthenticated,
  isGameOver: app.isGameOver,
  isGameWin: app.isGameWin,
  isPeriodActive: app.isPeriodActive,
  isPinChanged: auth.isPinChanged,
  isPinReset: auth.isPinReset,
  error: auth.error,
  selectedTab: navigationTab.selectedTab,
  isLoginOpen: app.isDialogLoginOpen,
  isPreRegisterRequested: auth.isPreRegisterRequested,
  isFirstPinChecked: auth.isFirstPinChecked,
  isRegisterSuccess: auth.isRegisterSuccess,
  isEligibleToRegister: auth.isEligibleToRegister
})

const token = localStorage.getItem('token')
const TIMER_SMS_RESEND = 60000

const Header = () => {
  const dispatch = useDispatch()
  const headerState = useSelector(headerSelector, shallowEqual)
  const classes = useStyles()
  const [isDialogLoginOpen, setIsDialogLoginOpen] = useState(false)
  const [isDialogRegisterOpen, setIsDialogRegisterOpen] = useState(false)
  const [isDialogFirstTimePinOpen, setIsDialogFirstTimePinOpen] = useState(false)
  const [isDialogPinOpen, setIsDialogPinOpen] = useState(false)
  const [isDialogChangePinOpen, setIsDialogChangePinOpen] = useState(false)
  const [isDialogRegisterSuccessOpen, setIsDialogRegisterSuccessOpen] = useState(false)
  const [isMsisdnCheck, setIsMsisdnCheck] = useState(false)
  const [isMsisdnSubmitted, setIsMsisdnSubmitted] = useState(false)
  const [isPinSubmitted, setIsPinSubmitted] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isTermChecked, setIsTermChecked] = useState(false)
  const [localErrorMessage, setLocalErrorMessage] = useState('')
  const [msisdn, setMsisdn] = useState('')
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [timer, setTimer] = useState(0)
  const [countdownSMS, setCountdownSMS] = useState(TIMER_SMS_RESEND)

  let pinInputRef: PinInput | null

  const {
    error,
    data,
    isPinReset,
    isAuthenticated,
    appData,
    isLoginOpen,
    isGameOver,
    isGameWin,
    isPeriodActive,
    isPreRegisterRequested,
    isFirstPinChecked,
    isRegisterSuccess,
    isEligibleToRegister
  } = headerState

  const isButtonResendSMSDisabled = countdownSMS > 0
  const errorMessage = error.message || localErrorMessage

  const handleCloseAllDialog = () => {
    dispatch(authErrorReset())
    dispatch(appDialogLoginSet(false))
    setLocalErrorMessage('')
    setIsDialogLoginOpen(false)
    setIsDialogRegisterOpen(false)
    setIsDialogFirstTimePinOpen(false)
    setIsDialogLoginOpen(false)
    setIsDialogPinOpen(false)
    setIsDialogChangePinOpen(false)
    setPin('')
    setNewPin('')
    setMsisdn('')
  }

  const handleClickLogin = () => {
    dispatch(appDialogLoginSet(true))
  }

  const handleSubmitLogin = () => {
    if (msisdn) {
      dispatch(authLogin(msisdn))
      setIsMsisdnSubmitted(true)
    } else {
      setLocalErrorMessage('Silahkan masukan nomer HP anda.')
    }
  }

  const handleClickRegister = () => {
    if (msisdn) {
      setIsMsisdnCheck(true)
      dispatch(authMsisdnCheck(msisdn))
    } else {
      setIsDialogRegisterOpen(true)
      setIsDialogLoginOpen(false)
      dispatch(authErrorReset())
      setLocalErrorMessage('')
    }
  }

  const handleCloseDialogRegister = () => {
    setIsDialogRegisterOpen(false)
    setIsDialogLoginOpen(true)
    setIsTermChecked(false)
    setIsMsisdnCheck(false)
    dispatch(authErrorReset())
    setLocalErrorMessage('')
  }

  const handleSubmitPreRegister = () => {
    if (msisdn) {
      dispatch(authPreRegister(msisdn))
      setIsMsisdnSubmitted(true)
      setIsRegister(true)
    } else {
      setLocalErrorMessage('Silahkan masukan nomer HP anda.')
    }
  }

  const handleSubmitFirstPin = () => {
    dispatch(authFirstPinCheck({ msisdn, pin }))
  }

  const handleResendSMSFirstPin = () => {
    dispatch(authPreRegister(msisdn))
    setCountdownSMS(TIMER_SMS_RESEND)
  }

  const handleSubmitRegister = () => {
    setIsMsisdnSubmitted(false)
    dispatch(authRegister({ msisdn, pin: newPin }))
  }

  const handleBackFromDialogPin = () => {
    setIsDialogLoginOpen(true)
    setIsDialogRegisterOpen(false)
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

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
  }

  const handleCheckTerm = () => {
    setIsTermChecked((prevState) => !prevState)
  }

  const handleToTerms = () => {
    setIsDialogRegisterOpen(false)
    dispatch(appDialogLoginSet(false))
    dispatch(navigationTabSelectedSet(3))
  }

  const handleRegisterSuccess = () => {
    localStorage.setItem('token', headerState.data.token)
    setIsDialogChangePinOpen(false)
    location.href = '/'
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
    if (isPreRegisterRequested) {
      setIsDialogLoginOpen(false)
      setIsDialogRegisterOpen(false)
      setIsDialogFirstTimePinOpen(true)
    }
  }, [isPreRegisterRequested])

  useEffect(() => {
    if (isFirstPinChecked) {
      setIsDialogFirstTimePinOpen(false)
      setIsDialogChangePinOpen(true)
    }
  }, [isFirstPinChecked])

  useEffect(() => {
    if (isRegisterSuccess && headerState.data.token) {
      setIsMsisdnSubmitted(false)
      setIsDialogPinOpen(false)
      setIsDialogChangePinOpen(false)
      setIsDialogRegisterSuccessOpen(true)
    }
  }, [isRegisterSuccess, headerState.data.token])

  useEffect(() => {
    if (isEligibleToRegister && isMsisdnCheck) {
      setIsDialogRegisterOpen(true)
      setIsDialogLoginOpen(false)
      dispatch(authErrorReset())
    }
  }, [isEligibleToRegister, isMsisdnCheck])

  useEffect(() => {
    if (headerState.data.id && isMsisdnSubmitted) {
      setIsDialogLoginOpen(false)
      setIsDialogRegisterOpen(false)
      setIsDialogPinOpen(true)
    }
  }, [headerState.data, isMsisdnSubmitted])

  useEffect(() => {
    if (headerState.data.token && isPinSubmitted && !isPinReset) {
      setIsDialogPinOpen(false)
      localStorage.setItem('auth', '1')
      localStorage.setItem('token', headerState.data.token)
      location.href = '/'
    }
  }, [headerState.data, isPinSubmitted, isPinReset])

  useEffect(() => {
    if (headerState.selectedTab === 0) {
      setTimer(appData.time)
    }
  }, [appData.time, headerState.selectedTab])

  useEffect(() => {
    let intervalTimer: any = null
    if (
      isAuthenticated &&
      isPeriodActive &&
      !isGameOver &&
      !isGameWin &&
      headerState.selectedTab === 0
    ) {
      intervalTimer = setInterval(() => {
        setTimer((prevState) => prevState + 1000)
      }, 1000)

      return () => clearInterval(intervalTimer)
    } else {
      clearInterval(intervalTimer)
    }
  }, [
    headerState.selectedTab,
    isAuthenticated,
    appData.time,
    isGameOver,
    isGameWin,
    isPeriodActive
  ])

  useEffect(() => {
    let intervalSMS: any = null
    if ((isDialogFirstTimePinOpen || isDialogPinOpen) && countdownSMS > 0) {
      intervalSMS = setInterval(() => {
        setCountdownSMS((prevState) => prevState - 1000)
      }, 1000)

      return () => clearInterval(intervalSMS)
    } else {
      clearInterval(intervalSMS)
    }
  }, [isDialogFirstTimePinOpen, isDialogPinOpen, countdownSMS])

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
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Silahkan masukan nomer HP anda:</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="081234567890"
            onChange={(e) => setMsisdn(e.target.value)}
            value={msisdn}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
            type="tel"
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmitLogin} fullWidth>
            Masuk
          </Button>
          <Button variant="contained" color="primary" onClick={handleClickRegister} fullWidth>
            Daftar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogRegisterOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <ArrowBackIcon className={classes.dialogBackIcon} onClick={handleCloseDialogRegister} />
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Silahkan masukan nomer HP anda:</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="081234567890"
            onChange={(e) => setMsisdn(e.target.value)}
            value={msisdn}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
            type="tel"
          />
          <div className={classes.checkboxWrapper}>
            <Checkbox
              color="primary"
              checked={isTermChecked}
              onClick={handleCheckTerm}
              className={classes.checkbox}
              size="small"
            />
            <Typography variant="caption">
              <a style={{ color: '#000', fontSize: '10px' }} onClick={handleToTerms}>
                Saya menyetujui syarat dan ketentuan yang berlaku
              </a>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitPreRegister}
            disabled={headerState.isLoading || !isTermChecked}
            fullWidth
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogFirstTimePinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Masukan nomor PIN anda. Cek inbox SMS:</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={4}
              onChange={(value) => setPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
              ref={(n) => (pinInputRef = n)}
            />
            {errorMessage && (
              <small style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</small>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitFirstPin}
            disabled={headerState.isLoading || pin.length < 4}
            fullWidth
          >
            Konfirmasi
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleResendSMSFirstPin}
            disabled={headerState.isLoading || isButtonResendSMSDisabled}
            fullWidth
          >
            {`Kirim Ulang ${
              isButtonResendSMSDisabled ? millisToMinutesAndSeconds(countdownSMS) : ''
            }`}
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
          <ArrowBackIcon className={classes.dialogBackIcon} onClick={handleBackFromDialogPin} />
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          {isPinReset ? (
            <Typography>PIN baru telah dikirimkan ke nomer HP anda. Cek inbox SMS:</Typography>
          ) : (
            <Typography>
              {isPreRegisterRequested
                ? 'Masukan nomor PIN anda. Cek inbox SMS:'
                : 'Masukan nomor PIN anda:'}
            </Typography>
          )}
          <div className={classes.inputPin}>
            <PinInput
              length={4}
              onChange={(value) => setPin(value)}
              type="numeric"
              inputMode="number"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
              ref={(n) => (pinInputRef = n)}
            />
            {errorMessage && (
              <small style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</small>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitPin}
            disabled={headerState.isLoading || pin.length < 4}
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
              {`Kirim Ulang ${
                isButtonResendSMSDisabled ? millisToMinutesAndSeconds(countdownSMS) : ''
              }`}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogRegisterSuccessOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Selamat anda mendapat gratis 5 koin!</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-end', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterSuccess}
            disabled={headerState.isLoading}
            fullWidth
          >
            Main
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogChangePinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Masukan nomor PIN baru anda:</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={4}
              onChange={(value) => setNewPin(value)}
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
            onClick={handleSubmitRegister}
            disabled={headerState.isLoading || newPin.length < 4}
            fullWidth
          >
            Ubah PIN
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
