import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core'

import Cell from 'components/molecules/Cell'
import {
  appBoardFetch,
  appGameOverSet,
  appToggleFlagSet,
  appDataFetch,
  appDataPointSet,
  appDataCoinSet,
  appGameWinSet,
  appBoardLogSave
} from 'redux/reducers/app'

import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesHome'
import { isJsonStringValid } from 'utils/string'

interface CellPorps {
  id: number
  isBomb: boolean
  isRevealed: boolean
  isFlagged: boolean
  bombDetected: number
  positionX: number
  positionY: number
}

const homeSelector = ({ app }: RootState) => ({
  theme: app.theme,
  board: app.board,
  data: app.data,
  isToggleFlag: app.isToggleFlag,
  isLoading: app.isLoading,
  isLoadingLog: app.isLoadingLog,
  isGameOver: app.isGameOver,
  isGameWin: app.isGameWin
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

const Home = () => {
  const dispatch = useDispatch()
  const boardState = useSelector(homeSelector, shallowEqual)
  const classes = useStyles({ columnsTotal: boardState.board.columns })()
  const [cells, setCells] = useState<CellPorps[][]>([])
  const [flaggedCells, setFlaggedCells] = useState(0)
  const [temporaryPoints, setTemporaryPoints] = useState(0)
  const [isDialogBombOpen, setIsDialogBombOpen] = useState(false)
  const [isDialogWinOpen, setIsDialogWinOpen] = useState(false)

  const currentPoints = boardState.data.points
  const currentCoins = boardState.data.coins
  const currentLevel = boardState.data.level

  const handleToggleFlag = () => {
    dispatch(appToggleFlagSet(!boardState.isToggleFlag))
  }

  const handleSetPoints = (points: number) => {
    dispatch(appDataPointSet(currentPoints + points))
  }

  const handleClickPlayAgain = () => {
    dispatch(appGameOverSet(false))
    dispatch(appDataCoinSet(currentCoins - 1))
    setIsDialogBombOpen(false)
  }

  const handleClickNextLevel = () => {
    location.href = '/'
  }

  const handleDialogBombOpen = () => {
    setIsDialogBombOpen(true)
  }

  const handleDialogWinOpen = () => {
    setIsDialogWinOpen(true)
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
        handleSetPoints(1)
      } else {
        // Commented: disable reveal all bombs
        // newCells.forEach((cellRows, indexRow) => {
        //   cellRows.forEach((cellColumn, indexColumn) => {
        //     if (cellColumn.isBomb) {
        //       newCells[indexRow][indexColumn].isRevealed = true
        //     }
        //   })
        // })

        setCells(newCells)

        const stringifyCells = JSON.stringify(cells)
        dispatch(appBoardLogSave(stringifyCells, temporaryPoints))
        dispatch(appGameOverSet(true))
      }
    }
  }

  const handleRevealOtherCells = (
    updatedCells: CellPorps[][],
    position: { x: number; y: number }
  ) => {
    const otherCells = handleGetOtherCells(updatedCells, position)
    const isOtherCellsHasBomb = otherCells.find((cell) => cell.isBomb)

    let totalCellRevealed = 0

    if (!isOtherCellsHasBomb) {
      while (otherCells.length) {
        console.count('getOtherCell')
        const otherCellRow = otherCells.shift()

        if (otherCellRow && otherCellRow.isRevealed && otherCellRow.isFlagged) {
          otherCellRow.isFlagged = false
          setFlaggedCells((prevState) => prevState - 1)
        } else if (otherCellRow && otherCellRow.isRevealed) {
          continue
        }

        if (otherCellRow && otherCellRow.bombDetected === 0 && !otherCellRow.isBomb) {
          otherCells.push(
            ...handleGetOtherCells(updatedCells, {
              x: otherCellRow.positionX,
              y: otherCellRow.positionY
            })
          )
        }

        if (otherCellRow && !otherCellRow.isBomb && !otherCellRow.isFlagged) {
          otherCellRow.isFlagged = false
          otherCellRow.isRevealed = true
          totalCellRevealed += 1
        }
      }
    }

    setTemporaryPoints(totalCellRevealed)
    setCells(updatedCells)

    const stringifyCells = JSON.stringify(cells)
    dispatch(appBoardLogSave(stringifyCells, totalCellRevealed))
  }

  const handleGetOtherCells = (currentCells: CellPorps[][], position: { x: number; y: number }) => {
    const otherCells = []
    const currentRow = currentCells[position.y]
    const prevRow = currentCells[position.y - 1]
    const nextRow = currentCells[position.y + 1]

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
    const { rows, columns } = boardState.board
    if (rows === 0 && columns === 0) {
      dispatch(appBoardFetch())
      dispatch(appDataFetch())
    }
  }, [])

  useEffect(() => {
    if (temporaryPoints) {
      handleSetPoints(temporaryPoints)
    }
  }, [temporaryPoints])

  useEffect(() => {
    const { rows, columns, mines, state } = boardState.board

    const initialCells: CellPorps[][] = []
    const initialMines = getRandomMines(mines, rows, columns)
    let cellId = 1

    const isJsonValid = isJsonStringValid(state)

    if (isJsonValid) {
      const decodedState = JSON.parse(state)
      setCells(decodedState)
    } else {
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
      // console.log({ initialCells, initialMines, cellId })
      setCells(initialCells)
    }
  }, [boardState.board])

  useEffect(() => {
    if (boardState.board.rows && boardState.board.columns) {
      const totalIsNotBombCells =
        boardState.board.columns * boardState.board.rows - boardState.board.mines
      let totalOpenedCells = 0

      for (let indexRow = 0; indexRow < cells.length; indexRow += 1) {
        for (let indexColumn = 0; indexColumn < cells[indexRow].length; indexColumn += 1) {
          if (
            cells[indexRow][indexColumn].isRevealed &&
            !cells[indexRow][indexColumn].isFlagged &&
            !cells[indexRow][indexColumn].isBomb
          ) {
            totalOpenedCells += 1
          }
        }
      }

      if (totalIsNotBombCells === totalOpenedCells) {
        dispatch(appGameWinSet(true))
      }

      // console.log({ totalIsNotBombCells, totalOpenedCells })
    }
  }, [cells, boardState.board])

  useEffect(() => {
    if (boardState.isGameOver) {
      handleDialogBombOpen()
    }
  }, [boardState.isGameOver])

  useEffect(() => {
    if (boardState.isGameWin) {
      handleDialogWinOpen()
    }
  }, [boardState.isGameWin])

  if (boardState.isLoading) {
    return <div className={classes.loadingContent} />
  }

  return (
    <>
      <div className={classes.boardContent}>
        <div className={classes.tools}>
          <div className={classes.toolItem}>
            <Typography variant="caption">Koin</Typography>
            <Typography className={classes.toolItemText}>{boardState.data.coins}</Typography>
          </div>
          <div className={classes.toolItem}>
            <Typography variant="caption">Level</Typography>
            <Typography className={classes.toolItemText}>{boardState.data.level}</Typography>
          </div>
          <div className={classes.toolItem}>
            <Typography variant="caption">Skor</Typography>
            <Typography className={classes.toolItemText}>{boardState.data.points}</Typography>
          </div>
          {/* <div className={classes.toolItem}>
            <Button
              onClick={handleToggleFlag}
              variant="contained"
              color={boardState.isToggleFlag ? 'secondary' : 'default'}
              size="small"
            >
              {boardState.board.mines - flaggedCells} 🚩
            </Button>
          </div> */}
        </div>
        <div className={classes.boardPlatfrom}>
          {boardState.isLoadingLog && <div className={classes.boardLoadingLog} />}
          <div className={classes.board}>
            {cells.map((columns) =>
              columns.map((row) => (
                <Cell
                  key={row.id}
                  isRevealed={row.isRevealed}
                  isFlagged={row.isFlagged}
                  hasBomb={row.isBomb}
                  isGameOver={boardState.isGameOver || boardState.isGameWin}
                  onClick={handleClickCell}
                  positionX={row.positionX}
                  positionY={row.positionY}
                  bombDetected={row.bombDetected}
                />
              ))
            )}
          </div>
        </div>
        <div className={classes.prizeSection}>
          <Typography variant="body1" className={classes.prizeTitle}>
            Hadiah periode ini &nbsp;
            <Typography variant="caption" component="span" className={classes.prizeSubtitle}>
              (01 - 31 Maret 2023)
            </Typography>
          </Typography>
          <div className={classes.prizesWrapper}>
            <div className={classes.prizes}>
              <div className={classes.prizeItem}>
                <div className={classes.prizeCard}>
                  <div className={classes.prizeImageWrapper}>
                    <img className={classes.prizeImage} src="/images/motor.png" alt="prize" />
                  </div>
                  <div className={classes.prizeText}>
                    <Typography variant="caption" component="p">
                      Peringkat Pertama
                    </Typography>
                    <Typography variant="body2">
                      <b>1 Unit Motor</b>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.prizeItem}>
                <div className={classes.prizeCard}>
                  <div className={classes.prizeImageWrapper}>
                    <img className={classes.prizeImage} src="/images/handphone.png" alt="prize" />
                  </div>
                  <div className={classes.prizeText}>
                    <Typography variant="caption" component="p">
                      Peringkat Kedua
                    </Typography>
                    <Typography variant="body2">
                      <b>1 Unit Handphone</b>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={classes.prizeItem}>
                <div className={classes.prizeCard}>
                  <div className={classes.prizeImageWrapper}>
                    <img className={classes.prizeImage} src="/images/smartwatch.png" alt="prize" />
                  </div>
                  <div className={classes.prizeText}>
                    <Typography variant="caption" component="p">
                      Peringkat Ketiga
                    </Typography>
                    <Typography variant="body2">
                      <b>1 Unit Smart Watch</b>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Backdrop open={boardState.isLoading}>
        <CircularProgress />
      </Backdrop>

      <Dialog open={isDialogBombOpen}>
        <DialogContent>
          <Typography>Boom! Kamu membuka kotak berisi bom.</Typography>
          <Typography>
            Kamu masih memiliki {currentCoins} koin, gunakan 1 untuk melanjutkan?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary" variant="contained" onClick={handleClickPlayAgain}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogWinOpen}>
        <DialogContent>
          <Typography>Hore! Kamu berhasil menyelesaikan level {currentLevel}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary" variant="contained" onClick={handleClickNextLevel}>
            Level berikutnya
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Home