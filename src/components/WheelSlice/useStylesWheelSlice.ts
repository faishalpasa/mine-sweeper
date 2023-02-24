import { makeStyles } from '@material-ui/core'

const imageSize = 40
const lColor = 50

const useStyles = ({ index, radius, sliceHeight, sliceOffeset, hColor, color = '#fff' }: any) =>
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
          borderColor: `transparent transparent hsl(${hColor} 100% ${lColor}%) transparent`
        },
        '&:after': {
          marginTop: '-1px',
          marginBottom: '-2px',
          borderWidth: `0 ${radius}px ${sliceHeight / 2 + 4}px 0px`,
          borderColor: `transparent hsl(${hColor} 100% ${lColor}%) transparent  transparent`
        },
        '&.glowing': {
          '&:before': {
            animation: '$glowBefore 2s infinite',
            animationDelay: `${index % 2 === 0 ? 0 : 1}s`
          },
          '&:after': {
            animation: '$glowAfter 2s infinite',
            animationDelay: `${index % 2 === 0 ? 0 : 1}s`
          }
        }
      },
      label: {
        position: 'absolute',
        bottom: 0,
        width: '85%',
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
          borderColor: `transparent transparent hsl(${hColor} 100% ${lColor - 25}%) transparent`
        }
      },
      '@keyframes glowAfter': {
        '50%': {
          borderColor: `transparent hsl(${hColor} 100% ${lColor - 25}%) transparent transparent`
        }
      }
    }
  })

export default useStyles
