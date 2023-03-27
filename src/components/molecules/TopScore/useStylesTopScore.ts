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
        justifyContent: 'center'
      }
    }
  })

export default useStyles
