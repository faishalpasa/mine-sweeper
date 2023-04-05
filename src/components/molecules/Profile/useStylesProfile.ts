import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => {
  return {
    loadingContent: {
      flex: '1'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginTop: '8px'
      // background: 'linear-gradient(180deg, rgba(209,13,25,1) 0%, rgba(0,0,0,1) 100%)',
      // minHeight: 'calc(100vh - 50px - 56px - 32px)'
    },
    formSection: {
      padding: '16px'
    },
    formWrapper: {
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    formTitle: {
      fontWeight: 500
    },
    formInput: {
      marginBottom: '16px'
    },
    formInputPin: {
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statusWrapper: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }
  }
})

export default useStyles
