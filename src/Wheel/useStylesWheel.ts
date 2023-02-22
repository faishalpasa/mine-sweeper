import { makeStyles } from '@material-ui/core'

const spinDuration = 5
const diameter = 350
const numberOfSlices = 8
const rotateRadius = 360 / numberOfSlices
const radius = diameter / 2
const circumfrance = 6.283185307 * radius
const sliceHeight = circumfrance / numberOfSlices
const sliceOffeset = sliceHeight / 2
const sliceColor = '#095B8D'
const darkenSliceColor = '#063c5d'
const rotation = 360 * numberOfSlices

export default makeStyles(() => ({
  app: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    gap: '16px'
  },
  wheelWrapper: {
    height: `${diameter - 2}px`,
    width: `${diameter - 2}px`,
    position: 'relative',
    borderRadius: '100%',
    overflow: 'hidden'
  },
  wheel: {
    height: '100%',
    transition: 'all 2s ease-out',
    '&.spin': {
      animation: `$spinning infinite ${spinDuration}s cubic-bezier(0.440, -0.205, 0.000, 1.030)`
    },
    '&:before': {
      content: '""',
      textAlign: 'center',
      display: 'block',
      lineHeight: 60,
      position: 'absolute',
      height: 40,
      width: 40,
      background: 'white',
      boxShadow: '0 0 5px 5px rgba(0, 0, 0, .1)',
      top: '50%',
      left: '50%',
      marginTop: '-20px',
      marginLeft: '-20px',
      borderRadius: '100%',
      zIndex: 200,
      cursor: 'pointer'
    }
  },
  wheelSlice: {
    zIndex: 150,
    position: 'absolute',
    top: `calc(50% - ${sliceOffeset}px)`,
    height: `calc(50% - ${sliceHeight}px)`,
    left: '50%',
    width: '50%',
    color: 'white',
    textAlign: 'right',
    paddingRight: '10px',
    display: 'block',
    transformOrigin: 'left center',
    '&:before, &:after': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    },
    '&:before': {
      marginBottom: '-1px',
      marginTop: '-2px',
      borderWidth: `0 0 ${sliceHeight / 2 + 4}px ${radius}px`,
      borderColor: `transparent transparent ${sliceColor} transparent`
    },
    '&:after': {
      marginTop: '-1px',
      marginBottom: '-2px',
      borderWidth: `0 ${radius}px ${sliceHeight / 2 + 4}px 0px`,
      borderColor: `transparent ${sliceColor} transparent  transparent`
    },
    '&:nth-child(even)': {
      '&:after': {
        borderColor: `transparent ${darkenSliceColor} transparent transparent`
      },
      '&:before': {
        borderColor: `transparent transparent ${darkenSliceColor} transparent`
      }
    }
  },
  label: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '70%',
    lineHeight: `${sliceHeight}px`,
    paddingTop: 1,
    paddingBottom: '1px',
    fontSize: '16px',
    textAlign: 'right',
    paddingLeft: '20px'
  },

  '@keyframes spinning': {
    from: {
      transform: 'rotate(0)'
    },
    to: {
      transform: `rotate(${360 * 5}deg)`
    }
  }
}))
