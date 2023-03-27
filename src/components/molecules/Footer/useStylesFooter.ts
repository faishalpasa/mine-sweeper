import { makeStyles } from '@material-ui/core'

const useStyles = () =>
  makeStyles(() => {
    return {
      footer: {
        display: 'flex',
        width: '100%'
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
