import { makeStyles } from '@material-ui/core'

// const sliceColor = '#095B8D'
// const darkenSliceColor = '#063c5d'

const useStyles = ({ radius, sliceHeight, sliceOffeset, background }: any) =>
  makeStyles(() => {
    return {
      wheelSlice: {
        zIndex: 150,
        position: 'absolute',
        top: `calc(50% - ${sliceOffeset}px)`,
        height: `${sliceHeight}px)`,
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
          borderColor: `transparent transparent ${background} transparent`
        },
        '&:after': {
          marginTop: '-1px',
          marginBottom: '-2px',
          borderWidth: `0 ${radius}px ${sliceHeight / 2 + 4}px 0px`,
          borderColor: `transparent ${background} transparent  transparent`
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
        fontSize: '20px',
        textAlign: 'right',
        paddingLeft: '20px',
        fontFamily: 'Play, sans-serif'
      }
    }
  })

export default useStyles
