import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Cell from 'components/Cell'
import { appBoardDataFetch, appGameOverSet, appToggleFlagSet } from 'redux/reducers/app'
import { millisToMinutesAndSeconds } from 'utils/number'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesBoard'
import { Button, Typography } from '@material-ui/core'

interface CellPorps {
  id: number
  isBomb: boolean
  isRevealed: boolean
  isFlagged: boolean
  bombDetected: number
  positionX: number
  positionY: number
}

let cellId = 1

const boardSelector = ({ app }: RootState) => ({
  theme: app.theme,
  board: app.board,
  isToggleFlag: app.isToggleFlag,
  isLoading: app.isLoading,
  isGameOver: app.isGameOver
})

const getRandomMines = (amount: number, columns: number, rows: number) => {
  const mines = []
  const cellsTotal = columns * rows
  const minesPool = Array.from(Array(cellsTotal).keys())

  for (let indexMine = 0; indexMine < amount; indexMine += 1) {
    const n = Math.floor(Math.random() * minesPool.length)
    mines.push(...minesPool.splice(n, 1))
  }

  return mines
}

const Board = () => {
  const dispatch = useDispatch()
  const boardState = useSelector(boardSelector, shallowEqual)
  const classes = useStyles({ columnsTotal: boardState.board.columns })()
  const [cells, setCells] = useState<CellPorps[][]>([])
  const [durations, setDurations] = useState(0)
  const [flaggedCells, setFlaggedCells] = useState(0)

  const handleToggleFlag = () => {
    dispatch(appToggleFlagSet(!boardState.isToggleFlag))
  }

  const handleClickCell = (position: { x: number; y: number }) => {
    const newCells = [...cells]
    const isBomb = newCells[position.y][position.x].isBomb
    const isRevealed = newCells[position.y][position.x].isRevealed

    if (boardState.isToggleFlag) {
      if (flaggedCells < boardState.board.mines) {
        newCells[position.y][position.x] = {
          ...newCells[position.y][position.x],
          isFlagged: !newCells[position.y][position.x].isFlagged,
          isRevealed: !newCells[position.y][position.x].isRevealed
        }
        setFlaggedCells((prevState) =>
          newCells[position.y][position.x].isFlagged ? prevState + 1 : prevState - 1
        )

        setCells(newCells)
      }
    } else if (!isRevealed) {
      newCells[position.y][position.x] = {
        ...newCells[position.y][position.x],
        isRevealed: true
      }
      if (!isBomb) {
        handleRevealOtherCells(newCells, { x: position.x, y: position.y })
      } else {
        newCells.forEach((cellRows, indexRow) => {
          cellRows.forEach((cellColumn, indexColumn) => {
            if (cellColumn.isBomb) {
              newCells[indexRow][indexColumn].isRevealed = true
            }
          })
        })

        setCells(newCells)
        dispatch(appGameOverSet(true))
      }
    }
  }

  const handleRevealOtherCells = (cells: CellPorps[][], position: { x: number; y: number }) => {
    const otherCells = handleGetOtherCells(cells, position)
    const isOtherCellsHasBomb = otherCells.find((cell) => cell.isBomb)

    if (!isOtherCellsHasBomb) {
      while (otherCells.length) {
        const otherCellRow = otherCells.shift()

        if (otherCellRow && otherCellRow.isRevealed) {
          continue
        }
        if (otherCellRow && otherCellRow.bombDetected === 0 && !otherCellRow.isBomb) {
          otherCells.push(
            ...handleGetOtherCells(cells, { x: otherCellRow.positionX, y: otherCellRow.positionY })
          )
        }

        if (otherCellRow && !otherCellRow.isBomb) {
          otherCellRow.isFlagged = false
          otherCellRow.isRevealed = true
        }
      }
    }

    setCells(cells)
  }

  const handleGetOtherCells = (cells: CellPorps[][], position: { x: number; y: number }) => {
    const otherCells = []
    const currentRow = cells[position.y]
    const prevRow = cells[position.y - 1]
    const nextRow = cells[position.y + 1]

    if (currentRow[position.x - 1]) otherCells.push(currentRow[position.x - 1])
    if (currentRow[position.x + 1]) otherCells.push(currentRow[position.x + 1])
    if (prevRow) {
      if (prevRow[position.x - 1]) otherCells.push(prevRow[position.x - 1])
      if (prevRow[position.x]) otherCells.push(prevRow[position.x])
      if (prevRow[position.x + 1]) otherCells.push(prevRow[position.x + 1])
    }
    if (nextRow) {
      if (nextRow[position.x - 1]) otherCells.push(nextRow[position.x - 1])
      if (nextRow[position.x]) otherCells.push(nextRow[position.x])
      if (nextRow[position.x + 1]) otherCells.push(nextRow[position.x + 1])
    }

    return otherCells
  }

  useEffect(() => {
    dispatch(appBoardDataFetch())

    // const durationInterval = setInterval(() => {
    //   setDurations((prevstate) => prevstate + 1000)
    // }, 1000)

    // return () => clearInterval(durationInterval)
  }, [])

  useEffect(() => {
    const { rows, columns, mines } = boardState.board
    const initialCells: CellPorps[][] = []
    const initialMines = getRandomMines(mines, rows, columns)

    for (let indexRow = 0; indexRow < rows; indexRow += 1) {
      initialCells[indexRow] = []
      for (let indexColumn = 0; indexColumn < columns; indexColumn += 1) {
        const y = initialCells.length - 1
        const x = initialCells[y].length
        const columnCell = {
          id: cellId,
          isBomb: initialMines.includes(cellId - 1),
          isRevealed: false,
          isFlagged: false,
          bombDetected: 0,
          positionX: indexColumn,
          positionY: indexRow
        }
        const otherCells = handleGetOtherCells(initialCells, { y, x })
        for (const otherCell of otherCells) {
          if (columnCell.isBomb) {
            otherCell.bombDetected += 1
          } else if (otherCell.isBomb) {
            columnCell.bombDetected += 1
          }
        }

        initialCells[indexRow][indexColumn] = columnCell
        cellId += 1
      }
    }

    setCells(initialCells)
  }, [boardState.board])

  if (boardState.isLoading) {
    return null
  }

  return (
    <div className={classes.boardContent}>
      <div className={classes.tools}>
        <div className={classes.toolItem}>
          <Typography>{millisToMinutesAndSeconds(durations)}</Typography>
        </div>
        <div className={classes.toolItem}>
          <Typography>{boardState.board.mines - flaggedCells}</Typography>
        </div>
        <div className={classes.toolItem}>
          <Button
            onClick={handleToggleFlag}
            variant="contained"
            color={boardState.isToggleFlag ? 'primary' : 'secondary'}
          >
            🚩
          </Button>
        </div>
      </div>
      <div className={classes.boardPlatfrom}>
        <div className={classes.board}>
          {cells.map((columns) =>
            columns.map((row) => (
              <Cell
                key={row.id}
                isRevealed={row.isRevealed}
                isFlagged={row.isFlagged}
                hasBomb={row.isBomb}
                isGameOver={boardState.isGameOver}
                onClick={handleClickCell}
                positionX={row.positionX}
                positionY={row.positionY}
                bombDetected={row.bombDetected}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <Typography>Hadiah periode ini 01 Jan 2023 - 31 Maret 2023</Typography>
        <div className={classes.prizes}>
          <div className={classes.prizeItem}>
            <img className={classes.prizeImage} src="/images/motor.png" alt="prize" />
          </div>
          <div className={classes.prizeItem}>
            <img className={classes.prizeImage} src="/images/handphone.png" alt="prize" />
          </div>
          <div className={classes.prizeItem}>
            <img className={classes.prizeImage} src="/images/smartwatch.png" alt="prize" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
