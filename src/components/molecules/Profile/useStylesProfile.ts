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
        backgroundImage: 'url("/images/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1'
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
    }
  }
})

export default useStyles
