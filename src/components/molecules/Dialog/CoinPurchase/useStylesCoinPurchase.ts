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
      // width: '200px',
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
      // width: '200px',
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
    },
    dialogPaper: {
      overflow: 'unset'
    },
    dialogContent: {
      background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(48,207,162,1) 100%)',
      paddingTop: '64px !important',
      position: 'relative',
      overflow: 'unset'
    },
    dialogCloseIcon: {
      position: 'absolute',
      top: '8px',
      right: '8px'
    },
    dialogBackIcon: {
      position: 'absolute',
      top: '8px',
      left: '8px'
    },
    imageCoins: {
      position: 'absolute',
      left: '50%',
      top: '-100',
      transform: 'translate(-50%, 0)',
      width: '150px',
      height: '150px'
    }
  }
})

export default useStyles
