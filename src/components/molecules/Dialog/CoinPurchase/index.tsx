import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogActions, DialogContent, Typography, Button } from '@material-ui/core'

import { appDataCoinSet, appGameOverSet } from 'redux/reducers/app'
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

interface CoinPurchaseProps {
  open: boolean
}

const CoinPurchase = ({ open }: CoinPurchaseProps) => {
  const classes = useStyles()
  const dispatch = useDispatch()
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

  const handleSubmitPayment = () => {
    setIsDialogPaymentOpen(false)
    setIsDialogSuccessOpen(true)

    // TODO: Fetch to API
    dispatch(appDataCoinSet(selectedCoin?.value || 0))
    dispatch(appGameOverSet(false))
  }

  const handleDialogSuccessToggle = (value: boolean) => {
    setIsDialogSuccessOpen(value)
  }

  useEffect(() => {
    setIsDialogCoinOpen(open)
  }, [open])

  return (
    <>
      <Dialog open={isDialogCoinOpen}>
        <DialogContent>
          <Typography>Pilih jumlah koin</Typography>
          <div className={classes.coinItems}>
            {coinItems.map((item) => (
              <div
                className={`${classes.coinItem} ${selectedCoinItem === item.id ? 'selected' : ''}`}
                key={item.id}
                onClick={() => handleSelectCoin(item.id)}
              >
                <Typography>{item.label}</Typography>
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

      <Dialog open={isDialogPaymentOpen}>
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
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleDialogSuccessToggle(false)}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CoinPurchase
