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
      background: theme.palette.common.white,
      padding: '8px',
      borderRadius: '8px'
    },
    board: {
      position: 'relative',
      display: 'grid',
      gap: '1px',
      gridTemplateColumns
    },
    tools: {
      margin: '8px 0px',
      display: 'flex',
      background: theme.palette.secondary.main,
      borderRadius: '8px',
      padding: '8px'
    },
    toolItemCoin: {
      alignItems: 'center',
      display: 'flex',
      background: theme.palette.common.white,
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
      color: theme.palette.common.white
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
      backgroundImage: 'url("/images/prize-bg.jpg")',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    },
    prizeImage: {
      height: '80px',
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
      '& .slick-slide': {
        transform: 'scale(.9)',
        transition: 'all .3s ease',
        '&.slick-active': {
          transform: 'scale(1)',
          '& $sliderPrizeCard': {
            border: `4px solid ${theme.palette.primary.main}`
          }
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
    }
  }
})

export default useStyles
