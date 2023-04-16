import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginTop: '-40px',
      marginBottom: '-55px',
      padding: '16px',
      position: 'relative',
      minHeight: 'calc(100vh - 55px + 23px)',
      justifyContent: 'center',
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        // backgroundImage: 'url("/images/background.png")',
        backgroundImage: 'url("/images/background-2.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1',
        opacity: 0.25
      }
    },
    paper: {
      marginTop: '8px',
      padding: '16px',
      background: theme.palette.secondary.main
    },
    actionButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '16px'
    },
    title: {}
  }
})

export default useStyles
