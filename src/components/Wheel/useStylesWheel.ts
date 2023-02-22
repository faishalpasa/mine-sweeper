import { makeStyles } from '@material-ui/core'

const useStyles = ({ spinDuration, diameter, rotation }: any) =>
  makeStyles(() => {
    return {
      app: {
        textAlign: 'center',
        background:
          'linear-gradient(90deg, rgba(58,180,154,1) 0%, rgba(0,71,102,1) 50%, rgba(58,180,154,1) 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
        gap: '64px',
        '@media (max-width:500px)': {
          gap: '40px'
        }
      },
      wheelWrapper: {
        height: `${diameter - 2}px`,
        width: `${diameter - 2}px`,
        position: 'relative',
        borderRadius: '100%',
        overflow: 'hidden',
        zIndex: 1,
        border: '2px solid #00000038'
      },
      wheelBackground: {
        borderRadius: '100%',
        height: `${diameter + 32}px`,
        width: `${diameter + 32}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'linear-gradient(90deg, rgba(171,180,58,1) 0%, rgba(253,119,29,1) 50%, rgba(208,252,69,1) 100%)',
        '-webkit-box-shadow': '0px 0px 60px 0px rgba(255,255,46,0.82)',
        '-moz-box-shadow': '0px 0px 60px 0px rgba(255,255,46,0.82)',
        boxShadow: '0px 0px 60px 0px rgba(255,255,46,0.82)'
      },
      wheel: {
        height: '100%',
        transition: 'all 5s ease-out',
        animationFillMode: 'forwards',
        animationTimingFunction: 'linear',
        '&.spin': {
          animationDuration: `${spinDuration}s`,
          animationTimingFunction: 'cubic-bezier(0.440, -0.205, 0.000, 1.030)',
          animationName: '$spinning'
        },
        '&:after': {
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: 20,
          width: 20,
          background: '#fff',
          boxShadow: '0 0 5px 5px rgba(0, 0, 0, .1)',
          top: '50%',
          left: '50%',
          marginTop: '-10px',
          marginLeft: '-10px',
          borderRadius: '100%',
          zIndex: 300
        },
        '&:before': {
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: 40,
          width: 40,
          background:
            'linear-gradient(90deg, rgba(171,180,58,1) 0%, rgba(253,119,29,1) 50%, rgba(208,252,69,1) 100%)',
          boxShadow: '0 0 5px 5px rgba(0, 0, 0, .1)',
          top: '50%',
          left: '50%',
          marginTop: '-20px',
          marginLeft: '-20px',
          borderRadius: '100%',
          zIndex: 200
        }
      },
      triangle: {
        top: '50%',
        right: 0,
        width: '40px',
        height: '60px',
        zIndex: 2,
        position: 'absolute',
        clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
        transform: 'translate(38%, -50%) rotate(90deg)',
        background: '#FF0000',
        '&:after': {
          content: '""',
          clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          position: 'absolute',
          height: '60px',
          width: '36px',
          background: 'rgba(208,252,69,1)',
          zIndex: 2,
          left: '50%',
          top: 0,
          transform: 'translate(-50%, -50%)'
        }
      },
      button: {
        all: 'unset',
        background: '#c80000',
        width: '100px',
        height: '100px',
        borderRadius: '100%',
        cursor: 'pointer',
        zIndex: 1,
        position: 'relative',
        border: '8px solid #730000',
        fontSize: '24px',
        fontFamily: 'Play, sans-serif',
        fontWeight: 600,
        '&:hover': {
          boxShadow: '0px 0px 60px 0px rgba(255,46,46,0.82)'
        },
        '&:active': {
          background: '#980000',
          color: '#8e8e8e'
        }
      },
      '@keyframes spinning': {
        from: {
          transform: 'rotate(0)'
        },
        to: {
          transform: `rotate(${rotation}deg)`
        }
      }
    }
  })

export default useStyles
