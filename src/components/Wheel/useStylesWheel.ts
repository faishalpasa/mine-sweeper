import { makeStyles } from '@material-ui/core/styles'

const colors = ['#fbc616', '#ef6519', '#6bbd42', '#44a1df', '#862a97', '#4054a3']

const useStyles = ({ spinDuration, diameter, rotation }: any) =>
  makeStyles((theme) => {
    return {
      wheelWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '50vh'
      },
      wheelPosition: {
        position: 'absolute',
        top: '25%',
        transform: 'rotate(-90deg)'
      },
      wheelBoard: {
        height: `${diameter - 2}px`,
        width: `${diameter - 2}px`,
        position: 'relative',
        borderRadius: '100%',
        overflow: 'hidden',
        zIndex: 1
      },
      wheelBackground: {
        borderRadius: '100%',
        height: `${diameter + 40}px`,
        width: `${diameter + 40}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: theme.palette.primary.main,
        boxShadow: '0px 0px 49px 36px rgba(0,0,0,0.22)',
        transition: 'all 1s ease-in',
        zIndex: 1,
        '&.spin': {
          animation: '$glowing 2s infinite'
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          height: `${diameter + 12}px`,
          width: `${diameter + 12}px`,
          border: '8px dotted #ffe452',
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
        '&.stop': {
          transition: 'unset',
          animationFillMode: 'unset',
          animationTimingFunction: 'unset',
          transform: `rotate(${rotation}deg)`
        },
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
          height: '48px',
          width: '48px',
          background: theme.palette.primary.main,
          boxShadow: '0 0 5px 5px rgba(0, 0, 0, .22)',
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
        color: '#da0000',
        top: '50%',
        right: 0,
        width: '50px',
        height: '50px',
        zIndex: 2,
        position: 'absolute',
        transform: 'translate(50%, -50%) rotate(90deg)'
      },
      starIcon: {
        top: '50%',
        left: '50%',
        color: '#ffe452',
        right: 0,
        width: 40,
        height: 40,
        zIndex: 2,
        position: 'absolute',
        transform: 'translate(-50%, -50%) rotate(90deg)'
      },
      button: {
        width: 100,
        border: '8px solid #730000',
        cursor: 'pointer',
        height: 100,
        zIndex: 1,
        position: 'relative',
        fontSize: 24,
        background: '#c80000',
        fontFamily: 'Play, sans-serif',
        fontWeight: 600,
        borderRadius: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
      },
      '@keyframes glowing': {
        [`${(100 / colors.length) * 1}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[1]}`
        },
        [`${(100 / colors.length) * 2}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[2]}`
        },
        [`${(100 / colors.length) * 3}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[3]}`
        },
        [`${(100 / colors.length) * 4}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[4]}`
        },
        [`${(100 / colors.length) * 5}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[5]}`
        },
        [`${(100 / colors.length) * 6}%`]: {
          boxShadow: `0px 0px 88px 44px ${colors[0]}`
        }
      }
    }
  })

export default useStyles
