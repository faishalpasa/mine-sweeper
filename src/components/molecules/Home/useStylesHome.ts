import { makeStyles, Theme } from '@material-ui/core'

interface StyleProps {
  columnsTotal: number
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => {
  const gridTemplateColumns = ({ columnsTotal }: StyleProps) => {
    return `repeat(${columnsTotal}, 1fr)`
  }

  return {
    loadingContent: {
      flex: '1'
    },
    boardContent: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginTop: '8px',
      padding: '16px'
    },
    boardPlatfrom: {
      padding: '4px',
      background: 'silver',
      border: '1px solid #000',
      borderRadius: '4px',
      position: 'relative'
    },
    boardLoadingLog: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      zIndex: 2
    },
    authBlocker: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      zIndex: 2,
      background: '#00000038',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    authBlockerContent: {
      background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(48,207,162,1) 100%)',
      padding: '16px',
      borderRadius: '8px',
      position: 'relative',
      textAlign: 'center'
    },
    splashImage: {
      width: '150px',
      height: '150px',
      marginTop: '16px'
    },
    board: {
      position: 'relative',
      display: 'grid',
      gap: '1px',
      gridTemplateColumns,
      margin: '8px 0px'
    },
    tools: {
      margin: '8px 0px',
      display: 'flex',
      borderRadius: '8px',
      padding: '8px',
      boxShadow: theme.shadows[4]
    },
    toolItemCoin: {
      alignItems: 'center',
      display: 'flex',
      boxShadow: theme.shadows[1],
      borderRadius: '4px',
      padding: '4px 8px',
      gap: '16px'
    },
    coinWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    coinTopUp: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    coinIcon: {
      width: '20px'
    },
    toolItem: {
      flex: 1,
      textAlign: 'center',
      color: theme.palette.common.black
    },
    toolItemText: {
      fontWeight: 600
    },
    prizeSection: {
      marginTop: '16px'
    },
    prizeTitle: {
      fontWeight: 500,
      marginBottom: '8px'
    },
    prizeSubtitle: {
      fontWeight: 400
    },
    prizesWrapper: {
      overflow: 'auto',
      width: '100%',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    prizes: {
      display: 'flex',
      gap: '8px'
    },
    prizeItem: {
      textAlign: 'center'
    },
    prizeCard: {
      borderRadius: '4px',
      width: '200px',
      position: 'relative',
      overflow: 'hidden'
    },
    prizeImageWrapper: {
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    },
    prizeImage: {
      width: '100%',
      margin: 'auto'
    },
    prizeText: {
      textAlign: 'left',
      background: theme.palette.primary.main,
      padding: '8px',
      color: '#fff'
    },
    prizeTextLabel: {
      fontSize: '8px'
    },
    prizeTextName: {
      fontSize: '10px'
    },

    sliderWrapper: {
      marginTop: '8px',
      '& .slick-slide': {
        transform: 'scale(.9)',
        transition: 'all .3s ease',
        '&.slick-active': {
          transform: 'scale(1)'
        }
      }
    },
    sliderPrizeItem: {
      textAlign: 'center'
    },
    sliderPrizeCard: {
      borderRadius: '4px',
      position: 'relative',
      overflow: 'hidden',
      border: `0px solid ${theme.palette.primary.main}`,
      transition: 'all .3s ease'
    },
    bombAnimate: {
      textAlign: 'center',
      width: '100%',
      position: 'relative',
      '& img': {
        width: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },

    periodBlocker: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      zIndex: 2,
      background: '#00000038',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    periodBlockerContent: {
      background: theme.palette.common.white,
      padding: '16px',
      borderRadius: '8px'
    },
    dialogContent: {
      background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(48,207,162,1) 100%)',
      paddingTop: '64px !important',
      position: 'relative',
      overflow: 'unset'
    },
    imageBomb: {
      position: 'absolute',
      left: '50%',
      top: '-100',
      transform: 'translate(-50%, 0)',
      width: '150px',
      height: '150px'
    },
    imageBombExplode: {
      position: 'absolute',
      left: '50%',
      top: '-140',
      transform: 'translate(-50%, 0)',
      width: '200px',
      height: '200px'
    },
    dialogPaper: {
      overflow: 'unset'
    },
    dialogPaperBomb: {
      overflow: 'unset',
      background: 'transparent',
      boxShadow: 'none'
    }
  }
})

export default useStyles
