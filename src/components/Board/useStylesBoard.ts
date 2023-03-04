import { makeStyles } from '@material-ui/core'

interface StyleProps {
  columnsTotal: number
}

const useStyles = ({ columnsTotal }: StyleProps) =>
  makeStyles(() => {
    const gridTemplateColumns = `repeat(${columnsTotal}, 1fr)`

    return {
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
      }
    }
  })

export default useStyles
