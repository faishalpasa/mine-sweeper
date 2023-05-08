import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      display: 'flex',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      background: '#ffffff',
      boxShadow: theme.shadows[4],
      maxWidth: '425px',
      zIndex: 999
      // '@media screen and (max-height: 400px)': {
      //   position: 'static'
      // }
    },
    footerItem: {
      flex: '1',
      '& .MuiButton-label': {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})

export default useStyles
