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
        backgroundImage: 'url("/images/background-2.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1'
      },
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: '-1',
        background: 'black',
        opacity: '0.22'
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
    list: {
      paddingInlineStart: '16px',
      margin: '0px'
    },
    listItem: {
      marginBottom: '8px',
      '&::marker': {
        fontSize: '14px'
      }
    },
    listItemText: {
      fontSize: '14px',
      lineHeight: '20px',
      '& p': {
        marginTop: '0px',
        marginBottom: '8px'
      },
      '& ol': {
        paddingInlineStart: '16px'
      },
      '& ul': {
        paddingInlineStart: '16px'
      }
    },
    paper: {
      marginTop: '8px',
      padding: '16px',
      maxHeight: 'calc(100vh - 220px)',
      overflowX: 'auto'
    }
  }
})

export default useStyles
