import { makeStyles } from '@material-ui/core'

// interface StyleProps { }

const useStyles = () =>
  makeStyles(() => {
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
      tableContainer: {
        marginTop: '16px'
      }
    }
  })

export default useStyles
