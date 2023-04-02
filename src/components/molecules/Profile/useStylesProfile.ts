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
      marginTop: '16px'
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
    }
  }
})

export default useStyles
