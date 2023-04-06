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
      backgroundImage: 'url("/images/background.png")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    contentTitle: {
      fontWeight: 500,
      color: theme.palette.common.white
    },
    tableContainer: {
      marginTop: '16px'
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
