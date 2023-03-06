import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Cell from 'components/Cell'
import { commentFetch } from 'redux/reducers/comment'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesBoard'

interface CellPorps {
  id: number
  isBomb: boolean
  isRevealed: boolean
  isFlagged: boolean
  bombDetected: number
  positionX: number
  positionY: number
}

const COLUMN_TOTAL = 14
const ROW_TOTAL = 14
const MINES_TOTAL = 10

let cellId = 1

const boardSelector = ({ app }: RootState) => ({
  theme: app.theme
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
  const [isGameOver, setIsGameOver] = useState(false)
  const boardState = useSelector(boardSelector, shallowEqual)
  const classes = useStyles({ columnsTotal: COLUMN_TOTAL })()
  const [cells, setCells] = useState<CellPorps[][]>([])
  console.log(boardState)

  const handleClickCell = (position: { x: number; y: number }) => {
    const newCells = [...cells]
    const isBomb = newCells[position.y][position.x].isBomb

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
      setIsGameOver(true)
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
    dispatch(commentFetch(1))

    const initialCells: CellPorps[][] = []
    const initialMines = getRandomMines(MINES_TOTAL, ROW_TOTAL, COLUMN_TOTAL)

    for (let indexRow = 0; indexRow < ROW_TOTAL; indexRow += 1) {
      initialCells[indexRow] = []
      for (let indexColumn = 0; indexColumn < COLUMN_TOTAL; indexColumn += 1) {
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
  }, [])

  return (
    <>
      <div className={classes.boardPlatfrom}>
        <div className={classes.board}>
          {cells.map((columns) =>
            columns.map((row) => (
              <Cell
                key={row.id}
                isRevealed={row.isRevealed}
                hasBomb={row.isBomb}
                isGameOver={isGameOver}
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
        <button>🚩</button>
      </div>
    </>
  )
}

export default Board
