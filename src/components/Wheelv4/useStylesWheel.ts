import { makeStyles } from '@material-ui/core'

const useStyles = ({ spinDuration, diameter, rotation }: any) =>
  makeStyles(() => {
    return {
      wheelWrapper: {
        position: 'relative',
        transform: 'rotate(-90deg)'
      },
      wheelBoard: {
        height: `${diameter - 2}px`,
        width: `${diameter - 2}px`,
        position: 'relative',
        borderRadius: '100%',
        overflow: 'hidden',
        zIndex: 1,
        border: '4px solid #242424'
      },
      wheelBackground: {
        borderRadius: '100%',
        height: `${diameter + 40}px`,
        width: `${diameter + 40}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#242424',
        border: '8px solid #242424',
        boxShadow: '0px 0px 49px 36px rgba(0,0,0,0.22)',
        zIndex: 1,
        '&:after': {
          content: '""',
          position: 'absolute',
          height: `${diameter + 12}px`,
          width: `${diameter + 12}px`,
          border: '8px dotted #fff',
          boxShadow: '0px 0px 4px 4px rgba(0,0,0,0.42)',
          borderRadius: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      },
      wheel: {
        height: '100%',
        transition: 'all 5s ease-out',
        animationFillMode: 'forwards',
        animationTimingFunction: 'linear',
        '&.spin': {
          animationDuration: `${spinDuration}s`,
          animationTimingFunction: 'cubic-bezier(0.440, -0.080, 0.000, 1.030)',
          animationName: '$spinning'
        },
        '&:before': {
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: 48,
          width: 48,
          background: '#023FAE',
          boxShadow: '0 0 5px 5px rgba(0, 0, 0, .1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '100%',
          zIndex: 200
        },
        '&:after': {
          boxShadow: 'inset 0px 0px 6px 6px rgba(0,0,0,0.42)',
          content: '""',
          textAlign: 'center',
          display: 'block',
          lineHeight: 60,
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '100%',
          zIndex: 200
        }
      },
      markerIcon: {
        color: '#242424',
        top: '50%',
        right: 0,
        width: '40px',
        height: '60px',
        zIndex: 2,
        position: 'absolute',
        transform: 'translate(25%, -50%) rotate(180deg)'
      },
      starIcon: {
        top: '50%',
        left: '50%',
        color: 'gold',
        right: 0,
        width: 40,
        height: 60,
        zIndex: 2,
        position: 'absolute',
        transform: 'translate(-50%, -50%) rotate(90deg)'
      },
      button: {
        left: '50%',
        top: '50%',
        width: 60,
        border: '8px solid #730000',
        cursor: 'pointer',
        height: 60,
        zIndex: 1,
        position: 'absolute',
        fontSize: 16,
        background: 'linear-gradient(45deg, rgba(108,0,0,1) 0%, rgba(255,48,48,1) 100%)',
        fontFamily: 'Play, sans-serif',
        fontWeight: 600,
        borderRadius: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        '&:hover': {
          boxShadow: '0px 0px 60px 0px rgba(255,46,46,0.82)'
        },
        '&.disabled': {
          background: '#980000',
          color: '#8e8e8e',
          cursor: 'auto',
          '&:hover': {
            boxShadow: 'none'
          }
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
