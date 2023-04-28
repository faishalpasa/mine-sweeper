import { makeStyles, Theme } from '@material-ui/core'

interface StyleProps {
  hasBomb: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => {
  const flipBoxBackBgColor = ({ hasBomb }: StyleProps) => {
    return hasBomb ? 'red' : theme.palette.grey[200]
  }

  return {
    block: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '2px',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        paddingTop: '100%'
      },
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
      background: theme.palette.primary.main,
      color: 'black',
      display: 'flex',
      alignItems: 'center'
    },
    flipBoxBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      backgroundColor: flipBoxBackBgColor,
      color: 'white',
      transform: 'rotateX(180deg)',
      display: 'flex',
      alignItems: 'center'
    }
  }
})

export default useStyles
