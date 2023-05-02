import { makeStyles, Theme } from '@material-ui/core'

interface StyleProps {
  hasBomb: boolean
  columns: number
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => {
  const flipBoxBackBgColor = ({ hasBomb }: StyleProps) => {
    return hasBomb ? 'red' : theme.palette.grey[200]
  }

  const cellHeight = ({ columns }: StyleProps) => {
    return `calc((100vw - 32px) / ${columns})`
  }

  const cellHeightDesktop = ({ columns }: StyleProps) => {
    return `calc((425px - 32px) / ${columns})`
  }

  return {
    block: {
      width: '100%',
      height: cellHeight,
      display: 'flex',
      alignItems: 'center',
      borderRadius: '2px',
      overflow: 'hidden',
      '@media screen and (min-width: 425px)': {
        height: cellHeightDesktop
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
