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
      // background: 'linear-gradient(180deg, rgba(209,13,25,1) 0%, rgba(0,0,0,1) 100%)',
      minHeight: 'calc(100vh - 50px - 56px - 32px)'
    },
    contentTitle: {
      fontWeight: 500
      // color: theme.palette.common.white
    },
    tableContainer: {
      marginTop: '16px'
    },
    tableHeaderCell: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  }
})

export default useStyles
