import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    loadingContent: {
      flex: '1'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginTop: '8px',
      padding: '16px',
      minHeight: 'calc(100vh - 50px - 56px - 32px)',
      position: 'relative',
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1'
      }
    },
    contentTitle: {
      fontWeight: 900,
      fontSize: '20px',
      color: theme.palette.common.black,
      '-webkit-text-fill-color': theme.palette.common.black,
      '-webkit-text-stroke-width': '1px',
      '-webkit-text-stroke-color': theme.palette.common.white
    },
    tableContainer: {
      marginTop: '8px'
    },
    tableHeaderCell: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    },
    winner: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    winnerLogo: {
      width: '50px'
    },
    winnerText: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
})

export default useStyles
