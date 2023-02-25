import { makeStyles } from '@material-ui/core'

const imageSize = 60

const useStyles = ({
  radius,
  sliceHeight,
  sliceOffeset,
  backgroundColor,
  color = '#fff',
  value
}: any) =>
  makeStyles(() => {
    return {
      wheelSlice: {
        zIndex: 150,
        position: 'absolute',
        top: `calc(50% - ${sliceOffeset}px)`,
        height: `${sliceHeight}px`,
        left: '50%',
        width: '50%',
        color: color,
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
          borderColor: `transparent transparent ${backgroundColor} transparent`
        },
        '&:after': {
          marginTop: '-1px',
          marginBottom: '-2px',
          borderWidth: `0 ${radius}px ${sliceHeight / 2 + 4}px 0px`,
          borderColor: `transparent ${backgroundColor} transparent  transparent`
        },
        '&.glowing': {
          '&:before': {
            animation: '$glowBefore 2s infinite'
          },
          '&:after': {
            animation: '$glowAfter 2s infinite'
          }
        }
      },
      label: {
        position: 'absolute',
        bottom: 0,
        width: '90%',
        top: `${sliceHeight / 2}px`,
        marginTop: `-${imageSize / 2}px`
      },
      itemPrize: {
        width: 'auto',
        height: `${imageSize}px`,
        transform: 'rotate(90deg)'
      },
      '@keyframes glowBefore': {
        '50%': {
          borderColor: `transparent transparent #8396ff transparent`
        }
      },
      '@keyframes glowAfter': {
        '50%': {
          borderColor: `transparent #8396ff transparent transparent`
        }
      }
    }
  })

export default useStyles
