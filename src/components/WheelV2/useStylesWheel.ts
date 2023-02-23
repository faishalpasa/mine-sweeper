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
        border: '4px solid #0FF7FF'
      },
      wheelBackground: {
        borderRadius: '100%',
        height: `${diameter + 40}px`,
        width: `${diameter + 40}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#0356E4',
        border: '8px solid #0FF7FF',
        // boxShadow: '0px 0px 60px 0px rgba(255,255,46,0.82)',
        boxShadow: '0px 0px 49px 36px rgba(0,0,0,0.22)',
        '&:after': {
          content: '""',
          position: 'absolute',
          height: `${diameter + 12}px`,
          width: `${diameter + 12}px`,
          border: '10px dotted rgba(0,254,255,1)',
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
      marker: {
        color: '#11f7ff',
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
        },
        '&:disabled': {
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
