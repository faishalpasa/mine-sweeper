import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  CircularProgress
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
  authErrorReset,
  authMsisdnCheck,
  authChangePin
} from 'redux/reducers/auth'
import { appDialogLoginSet } from 'redux/reducers/app'
import type { RootState } from 'redux/rootReducer'
import { getQueryString } from 'utils/url'

const headerSelector = ({ auth, navigationTab, app }: RootState) => ({
  data: auth.data,
  appData: app.data,
  isLoading: auth.isLoading,
  isLoadingLogin: auth.isLoadingLogin,
  isLoadingCheckMsisdn: auth.isLoadingCheckMsisdn,
  isLoadingPreRegister: auth.isLoadingPreRegister,
  isLoadingResetPin: auth.isLoadingResetPin,
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
  isEligibleToRegister: auth.isEligibleToRegister,
  isLoginWithRandomPin: auth.isLoginWithRandomPin,
  isTokenValid: auth.isTokenValid
})

const token = localStorage.getItem('token')

const Header = () => {
  const dispatch = useDispatch()
  const headerState = useSelector(headerSelector, shallowEqual)
  const classes = useStyles()
  const [isDialogLoginOpen, setIsDialogLoginOpen] = useState(false)
  const [isDialogFirstTimePinOpen, setIsDialogFirstTimePinOpen] = useState(false)
  const [isDialogPinOpen, setIsDialogPinOpen] = useState(false)
  const [isDialogChangePinOpen, setIsDialogChangePinOpen] = useState(false)
  const [isDialogRegisterSuccessOpen, setIsDialogRegisterSuccessOpen] = useState(false)
  const [isMsisdnCheck, setIsMsisdnCheck] = useState(false)
  const [isMsisdnSubmitted, setIsMsisdnSubmitted] = useState(false)
  const [localErrorMessage, setLocalErrorMessage] = useState('')
  const [msisdn, setMsisdn] = useState('')
  const [pin, setPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [timer, setTimer] = useState(0)

  const [isExternalRegistered, setIsExternalRegistered] = useState(false)

  const paramToken = getQueryString('token')
  const paramReg = getQueryString('reg')

  let pinInputRef: PinInput | null

  const {
    error,
    data,
    isAuthenticated,
    appData,
    isLoginOpen,
    isGameOver,
    isGameWin,
    isPeriodActive,
    isRegisterSuccess,
    isEligibleToRegister,
    isLoadingLogin,
    isLoadingCheckMsisdn,
    isLoginWithRandomPin,
    isTokenValid
  } = headerState

  const errorMessage = error.message || localErrorMessage

  const handleCloseAllDialog = () => {
    dispatch(authErrorReset())
    dispatch(appDialogLoginSet(false))
    setLocalErrorMessage('')
    setIsDialogLoginOpen(false)
    setIsDialogFirstTimePinOpen(false)
    setIsDialogLoginOpen(false)
    setIsDialogPinOpen(false)
    setIsDialogChangePinOpen(false)
    setIsMsisdnCheck(false)
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
    window.location.href = `${process.env.REACT_APP_EXTERNAL_REGISTER_URL}`
  }

  const handleCheckMsisdn = () => {
    dispatch(authMsisdnCheck(msisdn, paramToken))
    setIsMsisdnCheck(true)
  }

  const handleSubmitRegister = () => {
    setIsMsisdnSubmitted(false)
    dispatch(authRegister({ msisdn, msisdn_enc: data.msisdn_enc, pin }))
  }

  const handleSubmitChangePin = () => {
    dispatch(authChangePin(pin, newPin))
  }

  const handleBackFromDialogPin = () => {
    setIsDialogLoginOpen(true)
    setIsDialogPinOpen(false)
    dispatch(authErrorReset())
  }

  const handleSubmitPin = () => {
    dispatch(authLoginPin(msisdn, pin))
  }

  const handleToProfile = () => {
    dispatch(navigationTabSelectedSet(4))
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
    if (isRegisterSuccess && headerState.data.token) {
      setIsMsisdnSubmitted(false)
      setIsDialogPinOpen(false)
      setIsDialogChangePinOpen(false)
      setIsDialogRegisterSuccessOpen(true)
      setIsDialogFirstTimePinOpen(false)
    }
  }, [isRegisterSuccess, headerState.data.token])

  useEffect(() => {
    if (
      isTokenValid &&
      data.msisdn &&
      data.msisdn_enc &&
      data.pin &&
      isMsisdnCheck &&
      !isAuthenticated
    ) {
      dispatch(authRegister({ msisdn: data.msisdn, pin: data.pin, msisdn_enc: data.msisdn_enc }))
      setIsDialogLoginOpen(false)
    } else if (
      isTokenValid &&
      data.msisdn &&
      data.msisdn_enc &&
      !data.pin &&
      isMsisdnCheck &&
      !isAuthenticated
    ) {
      setMsisdn(data.msisdn)
      setIsDialogLoginOpen(false)
      setIsDialogFirstTimePinOpen(true)
    }
  }, [isTokenValid, data.msisdn_enc, data.msisdn, data.pin, isMsisdnCheck, isAuthenticated])

  useEffect(() => {
    if (headerState.data.id && isMsisdnSubmitted) {
      setIsDialogLoginOpen(false)
      setIsDialogPinOpen(true)
    }
  }, [headerState.data, isMsisdnSubmitted])

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
    if (paramReg && paramToken && !isAuthenticated) {
      setIsExternalRegistered(true)
      setIsDialogLoginOpen(true)
    } else {
      setIsExternalRegistered(false)
      setIsDialogLoginOpen(false)
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
          {!isExternalRegistered && (
            <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          )}
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Silahkan masukan nomer HP anda:</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="081234567890"
            onChange={(e) => {
              setMsisdn(e.target.value)
              setIsMsisdnCheck(false)
              dispatch(authErrorReset())
            }}
            value={msisdn}
            error={!!errorMessage}
            helperText={errorMessage}
            fullWidth
            type="tel"
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          {isExternalRegistered ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckMsisdn}
                fullWidth
                disabled={!msisdn}
              >
                Lanjutkan
                {isLoadingCheckMsisdn && (
                  <CircularProgress size={16} style={{ marginLeft: '4px' }} />
                )}
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitLogin}
                fullWidth
                disabled={isEligibleToRegister || !isMsisdnCheck}
              >
                Masuk
                {isLoadingLogin && <CircularProgress size={16} style={{ marginLeft: '4px' }} />}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitLogin}
                fullWidth
                disabled={isLoadingLogin}
              >
                Masuk
                {isLoadingLogin && <CircularProgress size={16} style={{ marginLeft: '4px' }} />}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickRegister}
                fullWidth
                disabled={isLoadingCheckMsisdn}
              >
                Daftar
                {isLoadingCheckMsisdn && (
                  <CircularProgress size={16} style={{ marginLeft: '4px' }} />
                )}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogFirstTimePinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <CloseIcon
            className={classes.dialogCloseIcon}
            onClick={() => {
              setIsDialogFirstTimePinOpen(false)
              setIsDialogLoginOpen(true)
              setIsMsisdnCheck(false)
              pinInputRef?.clear()
            }}
          />
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Masukan nomor PIN anda. Cek inbox SMS:</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value) => setPin(value)}
              type="custom"
              inputMode="string"
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
            onClick={handleSubmitRegister}
            disabled={headerState.isLoading || pin.length < 6}
            fullWidth
          >
            Konfirmasi
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
          <Typography>Masukan nomor PIN anda:</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value) => setPin(value)}
              type="custom"
              inputMode="string"
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
          {!isLoginWithRandomPin && (
            <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseAllDialog} />
          )}
          <img src="/images/bomb.png" alt="bomb" className={classes.imageBomb} />
          <Typography>Masukan nomor PIN baru anda:</Typography>
          <div className={classes.inputPin}>
            <PinInput
              length={6}
              onChange={(value) => setNewPin(value)}
              type="custom"
              inputMode="string"
              focus
              inputFocusStyle={{ borderColor: '#30cfa2' }}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-end', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={isLoginWithRandomPin ? handleSubmitChangePin : handleSubmitRegister}
            disabled={headerState.isLoading || newPin.length < 4}
            fullWidth
          >
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Header
