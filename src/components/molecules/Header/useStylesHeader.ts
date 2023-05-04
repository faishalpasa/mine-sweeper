import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    header: {
      width: '100%',
      maxWidth: '425px',
      position: 'fixed',
      top: 0,
      background: '#ffffff',
      zIndex: 999,
      boxShadow: theme.shadows[3]
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      margin: '8px'
    },
    user: {
      flex: '1'
    },
    logout: {
      marginLeft: 'auto',
      marginRight: 0
    },
    buttonProfile: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    },
    buttonProfileLabel: {
      display: 'flex',
      flexDirection: 'column'
    },
    profileName: {
      fontSize: '12px',
      fontWeight: 500
    },
    profileMsisdn: {
      fontSize: '10px'
    },
    timer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    checkboxWrapper: {
      display: 'flex',
      gap: '4px',
      marginTop: '8px',
      alignItems: 'flex-start'
    },
    checkbox: {
      padding: 0
    },
    dialogContent: {
      background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(48,207,162,1) 100%)',
      paddingTop: '64px !important',
      position: 'relative',
      overflow: 'unset'
    },
    imageBomb: {
      position: 'absolute',
      left: '50%',
      top: '-50%',
      transform: 'translate(-50%, 0)',
      width: '150px'
    },
    dialogPaper: {
      overflow: 'unset'
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
    }
  }
})

export default useStyles
