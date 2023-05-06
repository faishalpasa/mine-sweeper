import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons'

import { appPayOvo, appPayGopay } from 'redux/reducers/app'
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

const coinPurchaseSelector = ({ app, auth }: RootState) => ({
  coins: app.data.coins,
  isLoadinPay: app.isLoadingPay,
  authData: auth.data
})

interface CoinPurchaseProps {
  open: boolean
  onClose?: () => void
  isClosable?: boolean
}

const CoinPurchase = ({ open, onClose, isClosable = true }: CoinPurchaseProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const coinPurchaseState = useSelector(coinPurchaseSelector, shallowEqual)
  const [selectedCoinItem, setSelectedCoinItem] = useState(0)
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(0)
  const [isDialogCoinOpen, setIsDialogCoinOpen] = useState(false)
  const [isDialogPaymentOpen, setIsDialogPaymentOpen] = useState(false)
  const [isDialogPhoneOpen, setIsDialogPhoneOpen] = useState(false)
  const [isDialogSuccessOpen, setIsDialogSuccessOpen] = useState(false)
  const [msisdn, setMsisdn] = useState('')

  const selectedCoin = coinItems.find((item) => item.id === selectedCoinItem)
  const selectedPayment = paymentMethods.find((item) => item.id === selectedPaymentItem)
  const { authData } = coinPurchaseState

  const handleSelectCoin = (id: number) => {
    setSelectedCoinItem(id)
  }

  const handleChangeMsisdn = (value: string) => {
    const accept = /^[0-9\b]+$/
    if (value === '' || accept.test(value)) {
      const newValue = value.replace(/^0+/, '')
      setMsisdn(newValue)
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
        const gopayNumber = authData.msisdn.replace(/^0+/, '')
        dispatch(appPayGopay({ amount: selectedCoin?.amount, msisdn: gopayNumber }))
      }
    }
  }

  const handleSubmitPayment = () => {
    setIsDialogPhoneOpen(false)
    setIsDialogSuccessOpen(true)

    if (selectedCoin && selectedPayment?.label === 'OVO') {
      const ovoNumber = authData.msisdn.replace(/^0+/, '')
      dispatch(appPayOvo({ amount: selectedCoin?.amount, msisdn: ovoNumber }))
    }
  }

  const handleSuccessPurchase = () => {
    setIsDialogSuccessOpen(false)
    setSelectedCoinItem(0)
    setSelectedPaymentItem(0)
    if (onClose) {
      onClose()
    }
  }

  const handleCloseDialog = () => {
    if (isClosable && onClose) {
      onClose()
    }
  }

  const handleCloseDialogCoinPurchase = () => {
    setIsDialogPaymentOpen(false)
    setIsDialogPhoneOpen(false)
    setSelectedCoinItem(0)
    setSelectedPaymentItem(0)
    if (isClosable && onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setIsDialogCoinOpen(open)
  }, [open])

  useEffect(() => {
    if (authData.msisdn) {
      const phoneNumber = authData.msisdn.replace(/^0+/, '')
      setMsisdn(phoneNumber)
    }
  }, [authData.msisdn])

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
          <Typography>Pilih metode pembayaran</Typography>
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
          {coinPurchaseState.isLoadinPay ? (
            <Typography>
              Cek aplikasi {selectedPayment?.label} anda untuk melanjutkan pembayaran...
            </Typography>
          ) : (
            <Typography>
              Pembayaran berhasil, {selectedCoin?.label} koin telah ditambahkan ke akun anda.
            </Typography>
          )}
        </DialogContent>
        {!coinPurchaseState.isLoadinPay && (
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
