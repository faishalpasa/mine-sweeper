import { makeStyles, Theme } from '@material-ui/core'

interface StyleProps {
  hasBomb: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => {
  const flipBoxBackBgColor = ({ hasBomb }: StyleProps) => {
    return hasBomb ? theme.palette.primary.main : theme.palette.grey[300]
  }

  return {
    block: {
      width: '100%',
      aspectRatio: '1/1',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '2px',
      overflow: 'hidden',
      '&.active': {
        '& $flipBoxInner': {
          transform: 'rotateX(180deg)'
        }
      },
      '&.flagged': {
        boxShadow: 'unset',
        cursor: 'pointer'
      }
    },
    label: {
      flex: 1,
      textAlign: 'center',
      cursor: 'inherit'
    },
    flipBoxInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d'
    },
    flipBoxFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      backgroundColor: theme.palette.grey[700],
      // background: '#D10D7B',
      color: 'black'
    },
    flipBoxBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      backgroundColor: flipBoxBackBgColor,
      color: 'white',
      transform: 'rotateX(180deg)'
    }
  }
})

export default useStyles
