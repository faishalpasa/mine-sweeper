import React, { useEffect, useState } from 'react'
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
import Confetti from 'react-confetti'

import Wheel from 'components/Wheelv4'
import PlayButton from 'components/PlayButton'
import useWindowSize from 'hooks/useWindowSize'

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  }
})

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
    background: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    gap: '64px',
    '@media (max-width:500px)': {
      gap: '40px'
    }
  },
  dialogBlockContent: {
    padding: '16px',
    textAlign: 'left'
  },
  dialogRegister: {
    '& .MuiPaper-root': {
      borderRadius: '8px'
    }
  },
  dialogRegisterContent: {
    padding: '16px',
    minHeight: '100px'
  },
  dialogRegisterActions: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formField: {
    margin: '8px 0px'
  }
}))

const App = () => {
  const windowSize = useWindowSize()
  const classes = useStyles()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isRegisterPhoneDialogOpen, setIsRegisterPhoneDialogOpen] = useState(false)
  const [isRegisterServiceDialogOpen, setIsRegisterServiceDialogOpen] = useState(false)
  const [isServiceRegistered, setIsServiceRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(false)
  const [isConfettiOpen, setIsConfettiOpen] = useState(false)
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

  const handleClickPlayButton = () => {
    isServiceRegistered ? handleSpinningToggle(true) : handleRegisterPhoneDialogToggle(true)
  }

  const handleRegisterPhoneDialogToggle = (value: boolean) => {
    setIsRegisterPhoneDialogOpen(value)
  }

  const handleRegisterServiceDialogToggle = (value: boolean) => {
    setIsRegisterServiceDialogOpen(value)
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

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        setIsConfettiOpen(true)
      }, 8 * 1000)
    }
  }, [isSpinning])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Wheel isSpinning={isSpinning} />
        <PlayButton
          isSpinning={isSpinning}
          isActive={isServiceRegistered}
          onClick={handleClickPlayButton}
        />

        {/* <Dialog open={!isMobile} maxWidth="xs">
          <div className={classes.dialogBlockContent}>
            <Typography>
              Maaf, device yang kamu pakai belum bisa memainkan permainan ini. Silakan buka kembali
              link permainan melalui handphone mu.
            </Typography>
          </div>
        </Dialog> */}

        <Drawer open={isRegisterPhoneDialogOpen} anchor="bottom" className={classes.dialogRegister}>
          <div className={classes.dialogRegisterContent}>
            <Typography>Silakan masukan nomor handphone Anda untuk memulai permainan.</Typography>
            <div className={classes.formField}>
              <TextField onChange={(e) => handleChangeInput(e.target.value)} value={phoneNo} />
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

        <Drawer open={isConfettiOpen} anchor="bottom" className={classes.dialogRegister}>
          <div className={classes.dialogRegisterContent}>
            <Typography>Selamat kamu mendapatkan hadiah Lorem Ipsum.</Typography>
            <Typography>Kuota akan dikirim ke nomor handphone kamu maksimal 2x24 jam.</Typography>
          </div>
        </Drawer>

        {isConfettiOpen && <Confetti width={windowSize.width} height={windowSize.height} />}
      </div>
    </ThemeProvider>
  )
}

export default App
