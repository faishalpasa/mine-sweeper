import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Dialog, DialogActions, DialogContent, Typography, Button } from '@material-ui/core'

import { appDataCoinSet, appGameOverSet } from 'redux/reducers/app'
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

const coinPurchaseSelector = ({ app }: RootState) => ({
  coins: app.data.coins
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
  const [isDialogSuccessOpen, setIsDialogSuccessOpen] = useState(false)

  const selectedCoin = coinItems.find((item) => item.id === selectedCoinItem)
  const selectedPayment = paymentMethods.find((item) => item.id === selectedPaymentItem)

  const handleSelectCoin = (id: number) => {
    setSelectedCoinItem(id)
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

  const handleSubmitPayment = () => {
    setIsDialogPaymentOpen(false)
    setIsDialogSuccessOpen(true)

    // TODO: Fetch to API
    dispatch(appDataCoinSet(coinPurchaseState.coins + (selectedCoin?.value || 0)))
    dispatch(appGameOverSet(false))
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

  return (
    <>
      <Dialog open={isDialogCoinOpen} onClose={handleCloseDialog}>
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

      <Dialog open={isDialogPaymentOpen} onClose={handleCancelPayement}>
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
            onClick={handleSubmitPayment}
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogSuccessOpen}>
        <DialogContent>
          <Typography>
            Pembayaran berhasil, {selectedCoin?.label} telah ditambahkan ke akun kamu.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" size="small" onClick={handleSuccessPurchase}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CoinPurchase
