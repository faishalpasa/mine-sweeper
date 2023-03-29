import { makeStyles } from '@material-ui/core'

interface StyleProps {
  columnsTotal: number
}

const useStyles = ({ columnsTotal }: StyleProps) =>
  makeStyles(() => {
    const gridTemplateColumns = `repeat(${columnsTotal}, 1fr)`

    return {
      loadingContent: {
        flex: '1'
      },
      boardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1'
      },
      boardPlatfrom: {
        padding: '4px',
        background: 'silver',
        border: '1px solid #000',
        borderRadius: '4px'
      },
      board: {
        display: 'grid',
        border: '1px solid #000',
        gridTemplateColumns
      },
      tools: {
        display: 'flex'
      },
      toolItem: {
        flex: 1,
        textAlign: 'center'
      },
      prizeSection: {
        padding: '8px 16px'
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
        height: '100px'
      },
      prizeText: {
        textAlign: 'left',
        background: '#d10d19',
        padding: '8px',
        color: '#fff'
      }
    }
  })

export default useStyles
