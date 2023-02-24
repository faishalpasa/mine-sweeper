import React, { useState } from 'react'
import {
  makeStyles,
  createTheme,
  ThemeProvider,
  Dialog,
  Drawer,
  Typography,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core'
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

const useStyles = makeStyles(() => ({
  app: {
    background: '#fff',
    minHeight: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: 'auto',
    position: 'relative'
  },
  dialogBlockContent: {
    padding: '16px',
    textAlign: 'left'
  },
  dialogRegister: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      overflow: 'unset'
    }
  },
  dialogRegisterContent: {
    padding: '80px 16px 16px',
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
  const [prize, setPrize] = useState('')
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

  const handleSpinningEnd = (value: string) => {
    setPrize(value)
    handleSpinningToggle(false)
    handlePrizeDialogToggle(true)
    handleConfettiToggle(true)
  }

  const isPrizeNotZonk = !prize.includes('Zonk')
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
        <PlayButton
          disabled={!!prize || isSpinning}
          isSpinning={isSpinning}
          isActive={isServiceRegistered}
          onClick={handleClickPlayButton}
        />

        <Dialog open={!isMobile} maxWidth="xs">
          <div className={classes.dialogBlockContent}>
            <Typography>
              Maaf, device yang kamu pakai belum bisa memainkan permainan ini. Silakan buka kembali
              link permainan melalui handphone mu.
            </Typography>
          </div>
        </Dialog>

        <Drawer open={isRegisterPhoneDialogOpen} anchor="bottom" className={classes.dialogRegister}>
          <div className={classes.dialogRegisterContent}>
            <div className={classes.dialogImage}>
              <img
                src="/images/fortune-wheel.png"
                alt="fortune-wheel"
                className={classes.imageFortuneWheel}
              />
            </div>
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
        </Drawer>

        <Drawer
          open={isRegisterServiceDialogOpen}
          anchor="bottom"
          className={classes.dialogRegister}
        >
          <div className={classes.dialogRegisterContent}>
            <div className={classes.dialogImage}>
              <img
                src="/images/fortune-wheel.png"
                alt="fortune-wheel"
                className={classes.imageFortuneWheel}
              />
            </div>
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
        </Drawer>

        <Drawer open={isPrizeDialogOpen} anchor="bottom" className={classes.dialogRegister}>
          <div className={classes.dialogRegisterContent}>
            <div className={classes.dialogImage}>
              <img
                src={`/images/${isPrizeNotZonk ? 'prize' : 'zonk'}.png`}
                alt="fortune-wheel"
                className={classes.imageFortuneWheel}
              />
            </div>
            {isPrizeNotZonk ? (
              <>
                <Typography>
                  Selamat kamu mendapatkan hadiah <b>{prize}</b>.
                </Typography>
                <Typography>
                  Kuota akan dikirim ke nomor handphone kamu maksimal 2x24 jam.
                </Typography>
              </>
            ) : (
              <Typography>
                Kamu mendapatkan kotak kosong, semoga kamu beruntung di kesempatan berikutnya.
              </Typography>
            )}
          </div>
          <div className={classes.dialogRegisterActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePrizeDialogToggle(false)}
              endIcon={isLoading && <CircularProgress size={16} thickness={4} />}
            >
              Tutup
            </Button>
          </div>
        </Drawer>

        {isPrizeNotZonk && isConfettiOpen && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
