import { makeStyles } from '@material-ui/core'

const useStyles = () =>
  makeStyles((theme) => {
    return {
      header: {
        position: 'fixed',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        top: 0,
        background: '#ffffff',
        zIndex: 999,
        boxShadow: theme.shadows[3],
        maxWidth: '425px'
      },
      user: {
        flex: '1'
      },
      logout: {}
    }
  })

export default useStyles
