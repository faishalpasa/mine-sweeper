import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    coinItems: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px',
      flexDirection: 'column'
    },
    coinItem: {
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: '8px',
      padding: '8px',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '&.selected': {
        borderColor: theme.palette.primary.main,
        background: `${theme.palette.primary.main}33`
      }
    },
    paymentItem: {
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: '8px',
      padding: '8px',
      width: '200px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '&.selected': {
        borderColor: theme.palette.primary.main,
        background: `${theme.palette.primary.main}33`
      }
    },
    paymentLogo: {
      width: '25px'
    }
  }
})

export default useStyles
