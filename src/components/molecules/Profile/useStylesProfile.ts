import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    loadingContent: {
      flex: '1'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginTop: '8px',
      padding: '16px',
      minHeight: 'calc(100vh - 50px - 56px - 32px)',
      position: 'relative',
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/background-2.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1'
      },
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1',
        background: 'black',
        opacity: '0.22'
      }
    },
    contentTitle: {
      fontWeight: 900,
      fontSize: '20px',
      color: theme.palette.common.black,
      '-webkit-text-fill-color': theme.palette.common.black,
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': theme.palette.common.white
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'end'
    },
    formTitle: {
      fontWeight: 500
    },
    formInput: {
      marginBottom: '16px'
    },
    formInputPin: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusWrapper: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    paper: {
      margin: '8px 0px',
      padding: '16px'
    },
    inputPin: {
      textAlign: 'center',
      marginTop: '8px',
      '& .pincode-input-container': {
        '& .pincode-input-text': {
          width: '40px !important',
          height: '40px !important',
          borderRadius: '4px'
        }
      }
    },
    dialogContent: {
      // background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(48,207,162,1) 100%)',
      paddingTop: '64px !important',
      position: 'relative',
      overflow: 'unset'
    },
    dialogCloseIcon: {
      position: 'absolute',
      top: '8px',
      right: '8px'
    },
    dialogBackIcon: {
      position: 'absolute',
      top: '8px',
      left: '8px'
    },
    dialogTitle: {
      position: 'absolute',
      top: '8px',
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  }
})

export default useStyles
