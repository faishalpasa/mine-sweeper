import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Cell from 'components/Cell'
import { commentFetch } from 'redux/reducers/comment'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesBoard'

interface ColumnPorps {
  id: number
  isBomb: boolean
  isRevealed: boolean
  positionX: number
  positionY: number
}

const COLUMN_TOTAL = 10
const ROW_TOTAL = 10

let x = 0
let y = 0
let z = 0

export const boardSelector = ({ app }: RootState) => ({
  theme: app.theme
})

const Board = () => {
  const dispatch = useDispatch()
  const boardState = useSelector(boardSelector, shallowEqual)
  const classes = useStyles({ columnsTotal: COLUMN_TOTAL })()
  const [columns, setColumns] = useState<
    {
      id: number
      isBomb: boolean
      isRevealed: boolean
      positionX: number
      positionY: number
    }[]
  >([])
  console.log(boardState)

  const handleClickCell = (position: { x: number; y: number }) => {
    const newColumns = [...columns].map((column) => ({
      ...column,
      isRevealed:
        column.positionX === position.x && column.positionY === position.y
          ? true
          : column.isRevealed
    }))
    handleRevealOtherCells(newColumns, { x: position.x, y: position.y })
  }

  const handleRevealOtherCells = (columns: ColumnPorps[], position: { x: number; y: number }) => {
    const newOtherColumns: ColumnPorps[] = []
    // const nextPositionX = position.x + 1
    columns.forEach((column, index) => {
      newOtherColumns[index] = {
        ...column,
        isRevealed:
          column.positionY === position.y || column.positionX === position.x
            ? true
            : column.isRevealed
      }
    })
    setColumns(newOtherColumns)
  }

  useEffect(() => {
    dispatch(commentFetch(1))

    const initialColumns: ColumnPorps[] = []
    for (let indexRow = 0; indexRow < ROW_TOTAL; indexRow += 1) {
      if (y < ROW_TOTAL) {
        y += 1
      } else {
        y = 1
      }
      for (let indexColumn = 0; indexColumn < COLUMN_TOTAL; indexColumn += 1) {
        if (x < COLUMN_TOTAL) {
          x += 1
        } else {
          x = 1
        }

        z += 1
        initialColumns.push({
          id: z,
          isBomb: false,
          isRevealed: false,
          positionX: x,
          positionY: y
        })
      }
    }
    setColumns(initialColumns)
  }, [])

  return (
    <div className={classes.boardPlatfrom}>
      <div className={classes.board}>
        {columns.map((column) => (
          <Cell
            key={column.id}
            isRevealed={column.isRevealed}
            hasBomb={column.isBomb}
            onClick={handleClickCell}
            positionX={column.positionX}
            positionY={column.positionY}
          />
        ))}
      </div>
    </div>
  )
}

export default Board
