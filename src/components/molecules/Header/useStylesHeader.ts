import { makeStyles } from '@material-ui/core'

const useStyles = () =>
  makeStyles(() => {
    return {
      header: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
      },
      user: {
        flex: '1'
      },
      logout: {}
    }
  })

export default useStyles
