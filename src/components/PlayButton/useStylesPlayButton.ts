import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  buttonPlay: {
    width: '200px',
    cursor: 'pointer',
    zIndex: 99,
    fontSize: '20px',
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '@keyframes glowing': {
    '50%': {
      boxShadow: '0px 0px 75px 0px #da0000'
    }
  }
}))

export default useStyles
