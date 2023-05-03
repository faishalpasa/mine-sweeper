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

import { appDataCoinSet, appGameOverSet, appPayOvo, appPayGopay } from 'redux/reducers/app'
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
      dispatch(appPayOvo({ amount: selectedCoin?.amount, msisdn }))
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
      <Dialog open={isDialogCoinOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography>Pilih jumlah koin</Typography>
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
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={!selectedCoinItem}
            onClick={handleContinueToPayment}
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogPaymentOpen} onClose={handleCancelPayement} fullWidth maxWidth="xs">
        <DialogContent>
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
        <DialogActions>
          <Button color="primary" size="small" onClick={handleCancelPayement}>
            Kembali
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={!selectedPaymentItem}
            onClick={handleContinueToPhone}
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogPhoneOpen} onClose={handleCancelPhoneNo} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography>
            Silakan masukan nomor handphone kamu. Pastikan nomor kamu terdaftar di aplikasi&nbsp;
            {selectedPayment?.label}
          </Typography>
          <div className={classes.coinItems}>
            <TextField
              value={msisdn}
              variant="outlined"
              onChange={(e) => handleChangeMsisdn(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start">+62</InputAdornment> }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" size="small" onClick={handleCancelPhoneNo}>
            Kembali
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={!selectedPaymentItem || !msisdn}
            onClick={handleSubmitPayment}
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogSuccessOpen}>
        <DialogContent>
          {coinPurchaseState.isLoadinPay ? (
            <Typography>
              Sedang memproses pembayaran, check aplikasi {selectedPayment?.label} mu.
            </Typography>
          ) : (
            <Typography>
              Pembayaran berhasil, {selectedCoin?.label} telah ditambahkan ke akun kamu.
            </Typography>
          )}
        </DialogContent>
        {!coinPurchaseState.isLoadinPay && (
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSuccessPurchase}
            >
              Ok
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}

export default CoinPurchase
