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
      marginTop: '16px',
      padding: '16px'
    },
    contentTitle: {
      fontWeight: 500
    },
    list: {
      paddingInlineStart: '16px'
    },
    listItem: {
      marginBottom: '8px'
    }
  }
})

export default useStyles
