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
    }
  }
})

export default useStyles
