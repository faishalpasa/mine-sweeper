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
import { isMobile } from 'react-device-detect'
import Confetti from 'react-confetti'

import Wheel from 'components/Wheel'
import PlayButton from 'components/PlayButton'
import useWindowSize from 'hooks/useWindowSize'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffa300'
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
import { Close } from '@material-ui/icons'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

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
    justifyContent: 'flex-end'
  },
  dialogRegister: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      overflow: 'unset'
    }
  },
  dialogRegisterContent: {
    padding: '24px 16px 16px',
    position: 'relative',
    minHeight: '80px'
  },
  dialogRegisterActions: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formField: {
    margin: '8px 0px'
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
  const [isPrizeDialogOpen, setIsPrizeDialogOpen] = useState(false)
  const [isServiceRegistered, setIsServiceRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(false)
  const [isConfettiOpen, setIsConfettiOpen] = useState(false)
  const [prize, setPrize] = useState<Record<string, any>>({ id: 0, name: '', value: 0 })
  const [phoneNo, setPhoneNo] = useState('')

  const postRegisterPhoneNo = () => {
    setTimeout(() => {
      setIsLoading(false)
      handleRegisterPhoneDialogToggle(false)
      handleRegisterServiceDialogToggle(true)
    }, 1000)
  }

  const postRegisterService = () => {
    setTimeout(() => {
      setIsLoading(false)
      setIsServiceRegistered(true)
    }, 1000)
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
  }

  const handleRegisterServiceDialogToggle = (value: boolean) => {
    setIsRegisterServiceDialogOpen(value)
  }

  const handlePrizeDialogToggle = (value: boolean) => {
    setIsPrizeDialogOpen(value)
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

  const handleSpinningEnd = (value: Record<string, any>) => {
    setPrize(value)
    handleSpinningToggle(false)
    handlePrizeDialogToggle(true)
    handleConfettiToggle(true)
  }

  const isPrizeNotZonk = !!prize.value
  console.log(prize, isPrizeNotZonk)
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
        <Wheel isIdle={isWheelIdle} isSpinning={isSpinning} onSpinningEnd={handleSpinningEnd} />
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
        >
          <div className={classes.dialogImage}>
            <img
              src="/images/fortune-wheel.png"
              alt="fortune-wheel"
              className={classes.imageFortuneWheel}
            />
          </div>
          <div className={classes.dialogHeader}>
            <IconButton onClick={() => handleRegisterPhoneDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
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
          <div className={classes.dialogRegisterActions}>
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
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={isRegisterServiceDialogOpen}
          className={classes.dialogRegister}
          onClose={() => handleRegisterPhoneDialogToggle(false)}
        >
          <div className={classes.dialogImage}>
            <img
              src="/images/fortune-wheel.png"
              alt="fortune-wheel"
              className={classes.imageFortuneWheel}
            />
          </div>
          <div className={classes.dialogHeader}>
            <IconButton onClick={() => handleRegisterServiceDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
            {isServiceRegistered ? (
              <Typography>Verifikasi selesai. Silakan putar roda keberuntunganmu.</Typography>
            ) : (
              <Typography>
                Untuk melanjutkan, silakan daftar konten premium gratis terlebih dahulu melalui SMS.
                Stop kapan saja.
              </Typography>
            )}
          </div>
          <div className={classes.dialogRegisterActions}>
            {isServiceRegistered ? (
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={() => handleRegisterServiceDialogToggle(false)}
              >
                Tutup
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={handleContinueRegisterService}
                endIcon={isLoading && <CircularProgress size={16} thickness={4} />}
              >
                {isLoading ? 'Mengirim data' : 'Lanjutkan'}
              </Button>
            )}
          </div>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={isPrizeDialogOpen}
          className={classes.dialogRegister}
          onClose={() => handleRegisterPhoneDialogToggle(false)}
        >
          <div className={classes.dialogImage}>
            <img
              src={`/images/${isPrizeNotZonk ? `prize-${prize.value}-large` : 'zonk'}.png`}
              alt="fortune-wheel"
              className={classes.imagePrize}
            />
          </div>
          <div className={classes.dialogHeader}>
            <IconButton onClick={() => handlePrizeDialogToggle(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className={classes.dialogRegisterContent}>
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
                Maaf kamu belum mendapatkan hadiah, semoga kamu beruntung di kesempatan berikutnya.
              </Typography>
            )}
          </div>
        </Dialog>

        {isPrizeNotZonk && isConfettiOpen && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
        {!isPrizeNotZonk && isConfettiOpen && (
          <Confetti
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
