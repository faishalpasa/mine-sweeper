import { makeStyles } from '@material-ui/core'

interface StyleProps {
  columnsTotal: number
}

const useStyles = ({ columnsTotal }: StyleProps) =>
  makeStyles(() => {
    const gridTemplateColumns = `repeat(${columnsTotal}, 1fr)`

    return {
      boardContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'center'
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
      prizes: {
        display: 'flex'
      },
      prizeItem: {
        flex: 1,
        textAlign: 'center'
      },
      prizeImage: {
        height: '100px'
      }
    }
  })

export default useStyles
