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
        background: theme.palette.secondary.main
      }
    },
    coinValue: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
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
        background: theme.palette.secondary.main
      }
    },
    paymentLogo: {
      width: '25px'
    },
    coinIcon: {
      width: '25px'
    }
  }
})

export default useStyles
