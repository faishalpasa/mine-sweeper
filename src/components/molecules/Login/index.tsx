import React, { useState } from 'react'
import {
  Dialog,
  Paper,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@material-ui/core'

import useStyles from './useStylesLogin'

const Login = () => {
  const classes = useStyles()
  const [isFieldLoginOpen, setIsFieldLoginOpen] = useState(true)
  const [isFieldPinOpen, setIsFieldPinOpen] = useState(false)
  const [isDialogForgotPinOpen, setIsDialogForgotPinOpen] = useState(false)

  const handleSubmitLogin = () => {
    setIsFieldLoginOpen(false)
    setIsFieldPinOpen(true)
  }

  const handleSubmitPin = () => {
    localStorage.setItem('auth', '1')
    location.href = '/'
  }

  const handleClickForgotPin = () => {
    setIsDialogForgotPinOpen(true)
  }

  const handleDialogForgotPinClose = () => {
    setIsDialogForgotPinOpen(false)
  }

  return (
    <>
      <div className={classes.content}>
        <img src="/images/title.png" alt="title" className={classes.title} />
        <Paper className={classes.paper}>
          {isFieldLoginOpen && (
            <TextField
              label="No. Handphone"
              variant="filled"
              margin="dense"
              placeholder="081234567890"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ autoComplete: 'off', style: { background: '#fff' } }}
              type="tel"
            />
          )}

          {isFieldPinOpen && (
            <TextField
              label="Masukan PIN"
              variant="filled"
              margin="dense"
              placeholder="******"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ autoComplete: 'off', style: { background: '#fff' } }}
              type="tel"
            />
          )}
          <div className={classes.actionButtons}>
            {isFieldLoginOpen && (
              <>
                <div />
                <Button onClick={handleSubmitLogin} variant="contained" color="primary">
                  Lanjutkan
                </Button>
              </>
            )}

            {isFieldPinOpen && (
              <>
                <Button onClick={handleClickForgotPin} color="primary">
                  Lupa PIN
                </Button>
                <Button onClick={handleSubmitPin} variant="contained" color="primary">
                  Kirim
                </Button>
              </>
            )}
          </div>
        </Paper>
      </div>

      <Dialog open={isDialogForgotPinOpen} onClose={handleDialogForgotPinClose}>
        <DialogContent>
          <Typography>PIN baru telah dikirim ke nomor kamu.</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleDialogForgotPinClose}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Login
