import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress
} from '@material-ui/core'
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { isMobile, isDesktop } from 'react-device-detect'

import { appPayOvo, appPayGopay, appErrorReset, appCheckingPaymentSet } from 'redux/reducers/app'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesCoinPurchase'

const coinItems = [
  {
    id: 1,
    label: '10 Koin',
    value: 10,
    amount: 10000
  },
  {
    id: 2,
    label: '25 Koin',
    value: 25,
    amount: 15000
  }
]

const paymentMethods = [
  {
    id: 1,
    label: 'OVO',
    value: 1,
    imageSrc: '/images/ovo.png'
  },
  {
    id: 2,
    label: 'GoPay',
    value: 2,
    imageSrc: '/images/gopay.png'
  }
]

const TIMER_PAYMENT_GOPAY = 90000
const TIMER_PAYMENT_OVO = 60000

const coinPurchaseSelector = ({ app, auth }: RootState) => ({
  coins: app.data.coins,
  isLoadingPay: app.isLoadingPay,
  isGameOver: app.isGameOver,
  authData: auth.data,
  error: app.error,
  gopayActions: app.gopayActions,
  isCheckingPayment: app.isCheckingPayment
})

interface CoinPurchaseProps {
  open: boolean
  onClose?: () => void
  onSuccess?: () => void
  onBack?: () => void
  isClosable?: boolean
}

const CoinPurchase = ({
  open,
  onClose,
  isClosable = true,
  onBack,
  onSuccess
}: CoinPurchaseProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const coinPurchaseState = useSelector(coinPurchaseSelector, shallowEqual)
  const [selectedCoinItem, setSelectedCoinItem] = useState(0)
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(0)
  const [isDialogCoinOpen, setIsDialogCoinOpen] = useState(false)
  const [isDialogPaymentOpen, setIsDialogPaymentOpen] = useState(false)
  const [isDialogPhoneOpen, setIsDialogPhoneOpen] = useState(false)
  const [isDialogSuccessOpen, setIsDialogSuccessOpen] = useState(false)
  const [isCountdownPaymentStart, setIsCountdownPaymentStart] = useState(false)
  const [msisdn, setMsisdn] = useState('')
  const [countdownPayment, setCountdownPayment] = useState(TIMER_PAYMENT_GOPAY)

  const selectedCoin = coinItems.find((item) => item.id === selectedCoinItem)
  const selectedPayment = paymentMethods.find((item) => item.id === selectedPaymentItem)
  const { authData, error, isLoadingPay, gopayActions, isGameOver } = coinPurchaseState
  const [actionQRCode] = gopayActions

  const timerPayment = selectedPayment?.label === 'OVO' ? TIMER_PAYMENT_OVO : TIMER_PAYMENT_GOPAY

  const handleWordingPayment = (payment: typeof selectedPayment) => {
    if (payment?.label === 'GoPay') {
      if (isDesktop) {
        return `Scan kode QR menggunakan aplikasi Gojek di HP anda untuk melanjutkan pembayaran dan pastikan saldo anda cukup...`
      } else if (isMobile) {
        return `Menunggu pembayaran anda, pastikan saldo anda cukup...`
      } else {
        return `Menunggu pembayaran anda, pastikan saldo anda cukup...`
      }
    } else if (payment?.label === 'OVO') {
      return `Cek notifikasi dari aplikasi OVO di HP anda untuk melanjutkan pembayaran dan pastikan saldo anda cukup...`
    }
  }

  const handleSelectCoin = (id: number) => {
    setSelectedCoinItem(id)
  }

  const handleChangeMsisdn = (value: string) => {
    const accept = /^[0-9\b]+$/
    if (value === '' || accept.test(value)) {
      setMsisdn(value)
    }
  }

  const handleContinueToPayment = () => {
    setIsDialogCoinOpen(false)
    setIsDialogPaymentOpen(true)
  }

  const handleSelectPayment = (id: number) => {
    setSelectedPaymentItem(id)
  }

  const handleCancelPayement = () => {
    setIsDialogCoinOpen(true)
    setIsDialogPaymentOpen(false)
  }

  const handleCancelPhoneNo = () => {
    setIsDialogPhoneOpen(false)
    setIsDialogPaymentOpen(true)
  }

  const handleContinueToPhone = () => {
    if (selectedCoin) {
      if (selectedPayment?.label === 'OVO') {
        setIsDialogPaymentOpen(false)
        setIsDialogPhoneOpen(true)
      } else {
        setIsDialogPaymentOpen(false)
        setIsDialogSuccessOpen(true)
        setCountdownPayment(TIMER_PAYMENT_GOPAY)
        setIsCountdownPaymentStart(true)
        dispatch(appCheckingPaymentSet(true))
        const gopayNumber = authData.msisdn.replace(/^0+/, '')
        dispatch(appPayGopay({ amount: selectedCoin?.amount, msisdn: gopayNumber }))
      }
    }
  }

  const handleSubmitPayment = () => {
    setIsDialogPhoneOpen(false)
    setIsDialogSuccessOpen(true)
    if (selectedCoin && selectedPayment?.label === 'OVO') {
      setCountdownPayment(TIMER_PAYMENT_OVO)
      setIsCountdownPaymentStart(true)
      dispatch(appCheckingPaymentSet(true))
      const ovoNumber = authData.msisdn.replace(/^0+/, '')
      dispatch(appPayOvo({ amount: selectedCoin?.amount, msisdn: ovoNumber }))
    }
  }

  const handleResendPayment = () => {
    if (selectedCoin && selectedPayment?.label === 'OVO') {
      setCountdownPayment(TIMER_PAYMENT_OVO)
      setIsCountdownPaymentStart(true)
      dispatch(appCheckingPaymentSet(true))
      const ovoNumber = authData.msisdn.replace(/^0+/, '')
      dispatch(appErrorReset())
      dispatch(appPayOvo({ amount: selectedCoin?.amount, msisdn: ovoNumber }))
    } else if (selectedCoin && selectedPayment?.label === 'GoPay') {
      setCountdownPayment(TIMER_PAYMENT_GOPAY)
      setIsCountdownPaymentStart(true)
      dispatch(appCheckingPaymentSet(true))
      const gopayNumber = authData.msisdn.replace(/^0+/, '')
      dispatch(appErrorReset())
      dispatch(appPayGopay({ amount: selectedCoin?.amount, msisdn: gopayNumber }))
    }
  }

  const handleBackToPaymentMethod = () => {
    dispatch(appErrorReset())
    setIsCountdownPaymentStart(false)
    setCountdownPayment(TIMER_PAYMENT_GOPAY)
    setIsDialogSuccessOpen(false)
    setIsDialogPaymentOpen(true)
    setSelectedPaymentItem(0)
  }

  const handleSuccessPurchase = () => {
    setIsDialogSuccessOpen(false)
    setSelectedCoinItem(0)
    setSelectedPaymentItem(0)
    setIsCountdownPaymentStart(false)
    setCountdownPayment(TIMER_PAYMENT_GOPAY)
    if (onSuccess) {
      onSuccess()
    }
  }

  const handleCloseDialog = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleBackFromDialog = () => {
    if (onBack) {
      onBack()
    }
  }

  const handleCloseDialogCoinPurchase = () => {
    dispatch(appErrorReset())
    setIsDialogPaymentOpen(false)
    setIsDialogPhoneOpen(false)
    setIsDialogSuccessOpen(false)
    setIsCountdownPaymentStart(false)
    setCountdownPayment(TIMER_PAYMENT_GOPAY)
    setSelectedCoinItem(0)
    setSelectedPaymentItem(0)
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setIsDialogCoinOpen(open)
  }, [open])

  useEffect(() => {
    if (authData.msisdn) {
      const phoneNumber = authData.msisdn
      setMsisdn(phoneNumber)
    }
  }, [authData.msisdn])

  useEffect(() => {
    let intervalPayment: any = null
    if (isLoadingPay && isCountdownPaymentStart && countdownPayment > 0) {
      intervalPayment = setInterval(() => {
        setCountdownPayment((prevState) => prevState - 1000)
      }, 1000)

      return () => clearInterval(intervalPayment)
    } else {
      dispatch(appCheckingPaymentSet(false))
      setIsCountdownPaymentStart(false)
      clearInterval(intervalPayment)
    }
  }, [countdownPayment, isCountdownPaymentStart, isLoadingPay])

  return (
    <>
      <Dialog
        open={isDialogCoinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/coins.png" alt="coins" className={classes.imageCoins} />
          <ArrowBackIcon className={classes.dialogBackIcon} onClick={handleBackFromDialog} />
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseDialog} />
          <Typography>Pilih jumlah koin:</Typography>
          <div className={classes.coinItems}>
            {coinItems.map((item) => (
              <div
                className={`${classes.coinItem} ${selectedCoinItem === item.id ? 'selected' : ''}`}
                key={item.id}
                onClick={() => handleSelectCoin(item.id)}
              >
                <div className={classes.coinValue}>
                  <img src="/images/koin.png" alt="coin" className={classes.coinIcon} />
                  <Typography>{item.value}</Typography>
                </div>
                <Typography variant="caption">Rp{item.amount.toLocaleString()}</Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedCoinItem}
            onClick={handleContinueToPayment}
            fullWidth
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogPaymentOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/coins.png" alt="coins" className={classes.imageCoins} />
          <ArrowBackIcon className={classes.dialogBackIcon} onClick={handleCancelPayement} />
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseDialogCoinPurchase} />
          <Typography>Pilih metode pembayaran:</Typography>
          <div className={classes.coinItems}>
            {paymentMethods.map((item) => (
              <div
                className={`${classes.paymentItem} ${
                  selectedPaymentItem === item.id ? 'selected' : ''
                }`}
                key={item.id}
                onClick={() => handleSelectPayment(item.id)}
              >
                <img src={item.imageSrc} alt={item.label} className={classes.paymentLogo} />
                <Typography>{item.label}</Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedPaymentItem}
            onClick={handleContinueToPhone}
            fullWidth
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogPhoneOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/coins.png" alt="coins" className={classes.imageCoins} />
          <ArrowBackIcon className={classes.dialogBackIcon} onClick={handleCancelPhoneNo} />
          <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseDialogCoinPurchase} />
          <Typography>
            Silahkan masukan nomer HP anda. Pastikan nomer anda terdaftar di aplikasi&nbsp;
            {selectedPayment?.label}:
          </Typography>
          <div className={classes.coinItems}>
            <TextField
              value={msisdn}
              variant="outlined"
              onChange={(e) => handleChangeMsisdn(e.target.value)}
              placeholder="081234567890"
            />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!selectedPaymentItem || !msisdn}
            onClick={handleSubmitPayment}
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogSuccessOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/coins.png" alt="coins" className={classes.imageCoins} />
          {!countdownPayment && (
            <>
              <ArrowBackIcon
                className={classes.dialogBackIcon}
                onClick={handleBackToPaymentMethod}
              />
              <CloseIcon
                className={classes.dialogCloseIcon}
                onClick={handleCloseDialogCoinPurchase}
              />
            </>
          )}

          {!coinPurchaseState.isLoadingPay && !error.message && !!countdownPayment ? (
            <Typography>
              Pembayaran berhasil, {selectedCoin?.label} telah ditambahkan ke akun anda.
            </Typography>
          ) : (
            <>
              <Typography>
                {countdownPayment
                  ? handleWordingPayment(selectedPayment)
                  : 'Pembayaran anda gagal.'}
              </Typography>

              {isDesktop && actionQRCode && !!countdownPayment && (
                <Box width="100%" marginTop="16px" display="flex" justifyContent="center">
                  <img
                    src={actionQRCode.url}
                    alt="qrcode"
                    width="300px"
                    style={{ borderRadius: '16px' }}
                  />
                </Box>
              )}

              {!!countdownPayment && (
                <Box marginTop="16px">
                  <Typography>Selesaikan pembayaran dalam waktu:</Typography>
                </Box>
              )}
              <Box marginTop="16px" marginBottom="16px" display="flex" justifyContent="center">
                {isCountdownPaymentStart ? (
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={(countdownPayment / timerPayment) * 100}
                      size={50}
                      thickness={5}
                    />
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography component="div" color="textSecondary">
                        {`${Math.round(countdownPayment / 1000)}`}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleResendPayment}
                  >
                    Coba Lagi
                  </Button>
                )}
              </Box>
            </>
          )}
        </DialogContent>
        {!coinPurchaseState.isLoadingPay && !error.message && (
          <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
            <Button variant="contained" color="primary" onClick={handleSuccessPurchase} fullWidth>
              Ok
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}

export default CoinPurchase
