import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  playButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // background: '#242424',
    background: 'transparent',
    height: '80px',
    '&:after': {
      content: '""',
      width: '128px',
      height: '128px',
      position: 'absolute',
      left: '50%',
      top: '0',
      transform: 'translate(-50%, -50%)',
      // background: '#fff',
      background: 'transparent',
      borderRadius: '100%'
    }
  },
  buttonPlatform: {
    position: 'relative'
  },
  buttonPlay: {
    color: '#fff',
    width: '100px',
    height: '100px',
    border: '8px solid #730000',
    cursor: 'pointer',
    zIndex: 99,
    position: 'absolute',
    fontSize: '24px',
    background: '#da0000',
    fontWeight: 600,
    borderRadius: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '&:hover': {
      boxShadow: '0px 0px 60px 0px rgba(255,46,46,0.82)'
    },
    '&:disabled': {
      background: '#980000',
      color: '#8e8e8e',
      cursor: 'auto',
      '&:hover': {
        background: '#980000',
        boxShadow: 'none'
      }
    },
    '&.glow': {
      animation: '$glowing .5s infinite',
      boxShadow: '0px 0px 30px 0px #da0000'
    }
  },
  '@keyframes glowing': {
    '50%': {
      boxShadow: '0px 0px 75px 0px #da0000'
    }
  }
}))

export default useStyles
