import React, { useState } from 'react'
import {
  makeStyles,
  createTheme,
  ThemeProvider,
  Dialog,
  IconButton,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Slide
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { isMobile, isIOS } from 'react-device-detect'
import Confetti from 'react-confetti'

import Wheel from 'components/Wheel'
import PlayButton from 'components/PlayButton'
import useWindowSize from 'hooks/useWindowSize'
import { getMsisdnProvider } from 'utils/msisdn'

// 081200000002

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bfff'
    }
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      containedPrimary: {
        color: '#fff'
      }
    }
  }
})

import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const trxId = new URLSearchParams(window.location.search).get('trx_id') || ''

const composeSMS = (phoneNo: string, body: string, trxId: string) => {
  let sms = body
  if (body.includes('{trx_id}')) {
    sms = body.replace('{trx_id}', trxId)
  }
  let url = `sms:${phoneNo}?body=${encodeURIComponent(sms)}`
  if (isIOS) {
    url = `sms:${phoneNo};body=${encodeURIComponent(sms)}`
  }
  // console.log(url)
  location.href = url
}

const useStyles = makeStyles(() => ({
  app: {
    background: '#fff',
    maxWidth: '500px',
    margin: 'auto',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '64px'
  },
  dialogBlockContent: {
    padding: '16px',
    textAlign: 'left'
  },
  dialogHeader: {
    padding: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dialogRegister: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      overflow: 'unset'
    }
  },
  dialogRegisterContent: {
    padding: '16px 16px',
    position: 'relative',
    height: '180px',
    display: 'flex',
    flexDirection: 'column'
  },
  buttonActions: {
    display: 'flex',
    gap: '8px',
    flexDirection: 'column'
  },
  formField: {
    margin: '8px auto',
    display: 'flex',
    justifyContent: 'center',
    '& input': {
      textAlign: 'center'
    }
  },
  dialogImage: {
    left: 0,
    right: 0,
    top: 0,
    transform: 'translate(0, -50%)',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute'
  },
  imageFortuneWheel: {
    width: 'auto',
    height: '128px'
  },
  imagePrize: {
    width: 'auto',
    height: '180px'
  }
}))

const App = () => {
  const windowSize = useWindowSize()
  const classes = useStyles()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isRegisterPhoneDialogOpen, setIsRegisterPhoneDialogOpen] = useState(false)
  const [isRegisterServiceDialogOpen, setIsRegisterServiceDialogOpen] = useState(false)
  const [isWaitingResponseDialogOpen, setIsWaitingResponseOpen] = useState(false)
  const [isPrizeDialogOpen, setIsPrizeDialogOpen] = useState(false)
  const [isServiceRegistered, setIsServiceRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(false)
  const [isConfettiOpen, setIsConfettiOpen] = useState(false)
  const [prize, setPrize] = useState<Record<string, any>>({ id: 0, name: '', value: 0 })
  const [phoneNo, setPhoneNo] = useState('')
  const [responseRegister, setResponseRegister] = useState({
    status: '',
    sms: '',
    to: ''
  })
  const [responsePrize, setResponsePrize] = useState({
    status: '',
    prize: 0
  })
  const [error, setError] = useState({
    isOpen: false,
    message: ''
  })

  const postRegisterPhoneNo = () => {
    const msisdn = phoneNo.replace(/0(\d+)/, '62$1')
    const telco = getMsisdnProvider(phoneNo)
    fetch(`${process.env.REACT_APP_API_URL}/api/reg`, {
      method: 'post',
      body: JSON.stringify({
        trx_id: trxId,
        msisdn,
        telco
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.status === 'ok' && response.reason === 'user active') {
          setResponseRegister(response)
          setIsLoading(false)
          setIsServiceRegistered(true)
          handleRegisterPhoneDialogToggle(false)
          handleWaitingResponseDialogToggle(true)
        } else if (response.status === 'ok') {
          setResponseRegister(response)
          setIsLoading(false)
          handleRegisterPhoneDialogToggle(false)
          handleRegisterServiceDialogToggle(true)
        } else {
          setIsLoading(false)
          handleRegisterPhoneDialogToggle(false)
          setError({
            isOpen: true,
            message: 'Kesempatan memutar roda keberuntungan anda telah habis, coba lagi besok'
          })
        }
      })
  }

  const postSendingSms = () => {
    const msisdn = phoneNo.replace(/0(\d+)/, '62$1')
    fetch(`${process.env.REACT_APP_API_URL}/api/get_status`, {
      method: 'post',
      body: JSON.stringify({
        trx_id: trxId,
        msisdn
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.status === 'ok') {
          setIsLoading(false)
          handleRegisterPhoneDialogToggle(false)
          setIsServiceRegistered(true)
        } else if (response.status === 'nok' && response.reason === 'timeout') {
          setIsLoading(false)
          handleWaitingResponseDialogToggle(false)
          setIsServiceRegistered(false)
          setError({
            isOpen: true,
            message: 'Verifikasi gagal, silahkan coba kembali.'
          })
        } else {
          setTimeout(postSendingSms, 2000)
        }
      })
  }

  const postRegisterService = () => {
    setTimeout(() => {
      setIsLoading(false)
      handleWaitingResponseDialogToggle(true)
      handleRegisterServiceDialogToggle(false)
      composeSMS(responseRegister.to, responseRegister.sms, trxId)
      postSendingSms()
    }, 1000)
  }

  const postGetPrize = () => {
    const msisdn = phoneNo.replace(/0(\d+)/, '62$1')
    fetch(`${process.env.REACT_APP_API_URL}/api/get_prize`, {
      method: 'post',
      body: JSON.stringify({
        trx_id: trxId,
        msisdn
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        setResponsePrize(response)
        setIsLoading(false)
        handleWaitingResponseDialogToggle(false)
      })
  }

  const handleSpinningToggle = (value: boolean) => {
    setIsSpinning(value)
  }

  const handleConfettiToggle = (value: boolean) => {
    setIsConfettiOpen(value)
  }

  const handleClickPlayButton = () => {
    isServiceRegistered ? handleSpinningToggle(true) : handleRegisterPhoneDialogToggle(true)
  }

  const handleRegisterPhoneDialogToggle = (value: boolean) => {
    setIsRegisterPhoneDialogOpen(value)
    setIsLoading(false)
  }

  const handleRegisterServiceDialogToggle = (value: boolean) => {
    setIsRegisterServiceDialogOpen(value)
    setIsLoading(false)
  }

  const handleWaitingResponseDialogToggle = (value: boolean) => {
    setIsWaitingResponseOpen(value)
    setIsLoading(false)
  }

  const handlePrizeDialogToggle = (value: boolean) => {
    setIsPrizeDialogOpen(value)
    setIsLoading(false)
  }

  const handleCloseErrorDialog = () => {
    setError((prev) => ({
      ...prev,
      isOpen: false
    }))
  }

  const handleChangeInput = (value: string) => {
    if (/^\d*$/.test(value) || value === '') {
      setPhoneNo(value)
      setIsPhoneNoValid(value.length >= 8)
    }
  }

  const handleContinueRegisterPhone = () => {
    setIsLoading(true)
    postRegisterPhoneNo()
  }

  const handleContinueRegisterService = () => {
    setIsLoading(true)
    postRegisterService()
  }
  const handleGetPrize = () => {
    setIsLoading(true)
    postGetPrize()
  }

  const handleSpinningEnd = (value: Record<string, any>) => {
    setPrize(value)
    handleSpinningToggle(false)
    handlePrizeDialogToggle(true)
    handleConfettiToggle(true)
  }

  const isPrizeNotZonk = !!prize.value
  const isWheelIdle =
    (isServiceRegistered && !isRegisterServiceDialogOpen) ||
    (!isSpinning &&
      !isRegisterPhoneDialogOpen &&
      !isRegisterServiceDialogOpen &&
      !isPrizeDialogOpen &&
      !isServiceRegistered)

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Wheel
          prize={responsePrize.prize}
          isIdle={isWheelIdle}
          isSpinning={isSpinning}
          onSpinningEnd={handleSpinningEnd}
        />
        {isMobile && (
          <PlayButton
            disabled={!!prize.name || isSpinning}
            isSpinning={isSpinning}
            onClick={handleClickPlayButton}
          />
        )}

        <Dialog open={!isMobile} maxWidth="xs">
          <div className={classes.dialogBlockContent}>
            <Typography>
              Maaf, device yang kamu pakai belum bisa memainkan permainan ini. Silakan buka kembali
              link permainan melalui handphone mu.
            </Typography>
          </div>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          className={classes.dialogRegister}
          open={isRegisterPhoneDialogOpen}
          onClose={() => handleRegisterPhoneDialogToggle(false)}
          maxWidth="xs"
          fullWidth
        >
          <div className={classes.dialogHeader}>
            <div style={{ width: '48px' }}></div>
            <IconButton onClick={() => handleRegisterPhoneDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
            <div style={{ flex: 1 }}>
              <Typography>Silakan masukan nomor handphone Anda untuk memulai permainan.</Typography>
              <div className={classes.formField}>
                <TextField
                  onChange={(e) => handleChangeInput(e.target.value)}
                  value={phoneNo}
                  placeholder="08123456789"
                  type="tel"
                />
              </div>
            </div>
            <div className={classes.buttonActions}>
              <Button
                variant="contained"
                color="primary"
                disabled={!isPhoneNoValid || isLoading}
                onClick={handleContinueRegisterPhone}
                endIcon={isLoading && <CircularProgress size={16} thickness={4} />}
              >
                {isLoading ? 'Mengirim data' : 'Lanjutkan'}
              </Button>
            </div>
          </div>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={isRegisterServiceDialogOpen}
          className={classes.dialogRegister}
          onClose={() => handleRegisterServiceDialogToggle(false)}
          maxWidth="xs"
          fullWidth
        >
          <div className={classes.dialogHeader}>
            <div style={{ width: '48px' }}></div>
            <IconButton onClick={() => handleRegisterServiceDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
            <Typography>
              Untuk melanjutkan, silakan daftar konten premium gratis terlebih dahulu melalui{' '}
              <b>SMS</b>. Stop kapan saja:
            </Typography>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                disabled={!isPhoneNoValid || isLoading}
                onClick={handleContinueRegisterService}
                endIcon={isLoading && <CircularProgress size={16} thickness={4} />}
                fullWidth
              >
                Klik disini
              </Button>
            </div>
            <Typography style={{ textAlign: 'center' }}>
              Lalu tekan <b>Kirim</b>.
            </Typography>
          </div>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={isWaitingResponseDialogOpen}
          className={classes.dialogRegister}
          onClose={() => handleWaitingResponseDialogToggle(false)}
          maxWidth="xs"
          fullWidth
        >
          <div className={classes.dialogHeader}>
            <div style={{ width: '48px' }}></div>
            <IconButton onClick={() => handleWaitingResponseDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          {isServiceRegistered ? (
            <>
              <div className={classes.dialogRegisterContent}>
                <div style={{ flex: 1 }}>
                  <Typography>Verifikasi selesai. Silakan putar roda keberuntunganmu.</Typography>
                </div>
                <div className={classes.buttonActions}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={handleGetPrize}
                    endIcon={isLoading && <CircularProgress size={16} thickness={4} />}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.dialogRegisterContent}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  alignItems: 'center',
                  minHeight: '180px'
                }}
              >
                <Typography>Permintaan sedang di proses</Typography>
                <CircularProgress />
              </div>
            </div>
          )}
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={isPrizeDialogOpen}
          className={classes.dialogRegister}
          onClose={() => handleRegisterPhoneDialogToggle(false)}
          maxWidth="xs"
          fullWidth
        >
          <div className={classes.dialogHeader}>
            <div style={{ width: '48px' }}></div>
            <Typography variant="h6">{isPrizeNotZonk ? 'Selamat!' : 'Zonk!'}</Typography>
            <IconButton onClick={() => handlePrizeDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
            <div style={{ flex: 1 }}>
              {isPrizeNotZonk ? (
                <>
                  <Typography>
                    Selamat kamu mendapatkan hadiah <b>{prize.name}</b>.
                  </Typography>
                  <Typography>
                    Kuota akan dikirim ke nomor handphone kamu maksimal 2x24 jam.
                  </Typography>
                </>
              ) : (
                <Typography>
                  Maaf kamu belum mendapatkan hadiah, semoga kamu beruntung di kesempatan
                  berikutnya.
                </Typography>
              )}
            </div>
            <div className={classes.buttonActions}>
              <Button
                color="primary"
                variant="contained"
                disabled={isLoading}
                onClick={() => handlePrizeDialogToggle(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={error.isOpen}
          className={classes.dialogRegister}
          onClose={handleCloseErrorDialog}
          maxWidth="xs"
          fullWidth
        >
          <div className={classes.dialogHeader}>
            <div style={{ width: '48px' }}></div>
            <Typography variant="h6">Maaf</Typography>
            <IconButton onClick={handleCloseErrorDialog}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
            <div style={{ flex: 1 }}>
              <Typography>{error.message}</Typography>
            </div>
            <div className={classes.buttonActions}>
              <Button color="primary" variant="contained" onClick={handleCloseErrorDialog}>
                Tutup
              </Button>
            </div>
          </div>
        </Dialog>

        {isPrizeNotZonk && isConfettiOpen && <Confetti width={windowSize.width} height={1000} />}
        {!isPrizeNotZonk && isConfettiOpen && (
          <Confetti
            width={windowSize.width}
            height={1000}
            drawShape={(ctx) => {
              ctx.beginPath()
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i
                const x = (0.2 + 1.5 * angle) * Math.cos(angle)
                const y = (0.2 + 1.5 * angle) * Math.sin(angle)
                ctx.lineTo(x, y)
              }
              ctx.stroke()
              ctx.closePath()
            }}
            colors={['#696969', '#696969', '#383838', '#000000']}
            numberOfPieces={100}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
