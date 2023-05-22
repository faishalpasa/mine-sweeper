import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cell from 'components/molecules/Cell'
import {
  appBoardFetch,
  appGameOverSet,
  appToggleFlagSet,
  appDataFetch,
  appDataPointSet,
  appDataCoinSet,
  appGameWinSet,
  appBoardLogSave,
  appPrizeFetch,
  appNextLevel,
  appContinuePlay
} from 'redux/reducers/app'
import { isJsonStringValid } from 'utils/string'
import DialogCoinPurchase from 'components/molecules/Dialog/CoinPurchase'
import { pageTracking } from 'utils/analytics'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesHome'

interface CellPorps {
  id: number
  isBomb: boolean
  isRevealed: boolean
  isFlagged: boolean
  bombDetected: number
  positionX: number
  positionY: number
}

const homeSelector = ({ app, auth }: RootState) => ({
  authData: auth.data,
  theme: app.theme,
  board: app.board,
  data: app.data,
  prizes: app.prizes,
  isToggleFlag: app.isToggleFlag,
  isLoading: app.isLoading,
  isLoadingBoard: app.isLoadingBoard,
  isLoadingLog: app.isLoadingLog,
  isGameOver: app.isGameOver,
  isGameWin: app.isGameWin,
  isPeriodActive: app.isPeriodActive,
  isAuthenticated: auth.isAuthenticated,
  isDialogLoginOpen: app.isDialogLoginOpen
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
const slickSettings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  speed: 500,
  dots: false,
  arrows: false
}

const Home = () => {
  const dispatch = useDispatch()
  const boardState = useSelector(homeSelector, shallowEqual)
  const [cells, setCells] = useState<CellPorps[][]>([])
  const [flaggedCells, setFlaggedCells] = useState(0)
  const [temporaryPoints, setTemporaryPoints] = useState(0)
  const [isDialogBombOpen, setIsDialogBombOpen] = useState(false)
  const [isBombAnimateShow, setIsBombAnimateShow] = useState(false)
  const [isDialogPurchaseCoinOpen, setIsDialogPurchaseCoinOpen] = useState(false)
  const [isDialogPurchaseCoinClosable, setIsDialogPurchaseCoinClosable] = useState(false)
  const [isDialogWinOpen, setIsDialogWinOpen] = useState(false)
  const [isGamePlayed, setIsGamePlayed] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [time, setTime] = useState(0)

  const classes = useStyles({ columnsTotal: cells.length || boardState.board.columns })

  const currentPoints = boardState.data.points
  const currentCoins = boardState.data.coins
  const currentLevel = boardState.data.level
  const isMaxLevel = boardState.data.is_max_level
  const {
    isAuthenticated,
    isPeriodActive,
    isDialogLoginOpen,
    isLoadingBoard,
    isGameOver,
    isGameWin
  } = boardState

  const handleToggleFlag = () => {
    dispatch(appToggleFlagSet(!boardState.isToggleFlag))
  }

  const handleClickPlayAgain = () => {
    dispatch(appContinuePlay())
  }

  const handleClickNextLevel = () => {
    dispatch(appNextLevel())
  }

  const handleDialogBombOpen = () => {
    setIsDialogBombOpen(true)
    setIsBombAnimateShow(true)
  }

  const handleDialogWinOpen = () => {
    setIsDialogWinOpen(true)
  }

  const handleDialogWinClose = () => {
    setIsDialogWinOpen(false)
  }

  const handleDialogPurchaseCoinOpen = () => {
    setIsGamePlayed(false)
    setIsDialogPurchaseCoinClosable(false)
    setIsDialogBombOpen(false)
    setIsDialogPurchaseCoinOpen(true)
  }

  const handleClickButtonPurchaseCoin = () => {
    setIsDialogPurchaseCoinClosable(true)
    setIsDialogPurchaseCoinOpen(true)
  }

  const handleDialogPurchaseCoinClose = () => {
    setIsDialogPurchaseCoinOpen(false)
  }

  const handleSuccessPurchaseCoin = () => {
    setIsDialogPurchaseCoinOpen(false)
  }

  const handleDialogPurchaseCoinBack = () => {
    setIsDialogPurchaseCoinOpen(false)
    if (boardState.isGameOver) {
      setIsDialogBombOpen(true)
    }
  }

  const handleCloseDialogBomb = () => {
    setIsDialogBombOpen(false)
    setIsGamePlayed(false)
    if (currentCoins === 0) {
      setIsGamePlayed(false)
    }
  }

  const handleClickCell = (position: { x: number; y: number }) => {
    if (isGameWin) {
      handleDialogWinOpen()
    } else if (!isGameOver && isPeriodActive) {
      setIsGamePlayed(true)
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
          setCurrentStep(stringifyCells)
          setTemporaryPoints(0)
          dispatch(appGameOverSet(true))
        }
      }
    } else if (isGameOver && isPeriodActive) {
      handleDialogBombOpen()
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

    setTemporaryPoints(1 + totalCellRevealed)
    setCells(updatedCells)

    const stringifyCells = JSON.stringify(cells)
    setCurrentStep(stringifyCells)
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
    pageTracking('Home')

    const { rows, columns } = boardState.board
    if (rows === 0 && columns === 0) {
      dispatch(appBoardFetch())
      dispatch(appPrizeFetch())
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(appDataFetch())
      const interval = setInterval(() => {
        setTime((prevState) => prevState + 1000)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

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
    }
  }, [cells, boardState.board])

  useEffect(() => {
    if (boardState.isGameOver && isGamePlayed) {
      setTimeout(() => handleDialogBombOpen(), 1000)
    }
  }, [boardState.isGameOver, currentCoins, isGamePlayed])

  useEffect(() => {
    if (boardState.isGameWin) {
      handleDialogWinOpen()
    }
  }, [boardState.isGameWin])

  useEffect(() => {
    if (isDialogBombOpen) {
      setTimeout(() => {
        setIsBombAnimateShow(false)
      }, 1500)
    }
  }, [isDialogBombOpen])

  useEffect(() => {
    if (currentStep) {
      dispatch(appBoardLogSave(currentStep, temporaryPoints, time))
      setTime(0)
    }
  }, [currentStep, temporaryPoints])

  if (isLoadingBoard) {
    return (
      <div className={classes.loadingBoard}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div className={classes.boardContent}>
        <div className={classes.tools}>
          <div className={classes.toolItemCoin}>
            <div>
              <Typography variant="caption">Sisa Koin</Typography>
              <div className={classes.coinWrapper}>
                <img src="/images/koin.png" alt="coin" className={classes.coinIcon} />
                <Typography className={classes.toolItemText}>{boardState.data.coins}</Typography>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickButtonPurchaseCoin}
              disabled={!isAuthenticated}
            >
              Tambah Koin
            </Button>
          </div>
          <div className={classes.toolItem}>
            <Typography variant="caption">Level</Typography>
            <Typography className={classes.toolItemText}>{currentLevel}</Typography>
          </div>
          <div className={classes.toolItem}>
            <Typography variant="caption">Skor</Typography>
            <Typography className={classes.toolItemText}>{currentPoints}</Typography>
          </div>
        </div>
        {(boardState.isLoadingLog || !isAuthenticated) && (
          <div className={classes.boardLoadingLog} />
        )}
        <div className={classes.board}>
          {!isDialogLoginOpen && !isAuthenticated && (
            <div className={classes.authBlocker}>
              <div className={classes.authBlockerContent}>
                <Typography>
                  Untuk mulai main tekan tombol masuk.
                  <br />
                  Raih skor tertinggi dan menangin hadiahnya
                </Typography>
                <img
                  src="/images/splash-image-2.png"
                  alt="background"
                  className={classes.splashImage}
                />
              </div>
            </div>
          )}
          {!isDialogLoginOpen && isAuthenticated && !isPeriodActive && (
            <div className={classes.periodBlocker}>
              <div className={classes.periodBlockerContent} style={{ textAlign: 'center' }}>
                <Typography>
                  Maaf, saat ini belum ada periode
                  <br />
                  permainan yang aktif.
                </Typography>
              </div>
            </div>
          )}
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

        <div className={classes.sliderWrapper}>
          <Slider {...slickSettings}>
            {boardState.prizes.map((prize) => (
              <div className={classes.sliderPrizeItem} key={prize.id}>
                <div className={classes.sliderPrizeCard}>
                  <div className={classes.prizeImageWrapper}>
                    <img className={classes.prizeImage} src={prize.imageSrc} alt="prize" />
                  </div>
                  <div className={classes.prizeText}>
                    <Typography className={classes.prizeTextLabel}>{prize.label}</Typography>
                    <Typography className={classes.prizeTextName}>
                      <b>{prize.name}</b>
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Backdrop open={boardState.isLoading}>
        <CircularProgress />
      </Backdrop>

      <Dialog
        open={isDialogBombOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          className:
            isBombAnimateShow && isGamePlayed ? classes.dialogPaperBomb : classes.dialogPaper
        }}
      >
        {isBombAnimateShow && isGamePlayed ? (
          <div className={classes.bombAnimate}>
            <img src="/images/bomb.gif" alt="bomb" />
          </div>
        ) : (
          <>
            <DialogContent className={classes.dialogContent}>
              <CloseIcon className={classes.dialogCloseIcon} onClick={handleCloseDialogBomb} />

              {isGamePlayed ? (
                <img src="/images/explode.png" alt="bomb" className={classes.imageBombExplode} />
              ) : (
                <img src="/images/coins.png" alt="bomb" className={classes.imageBombExplode} />
              )}

              <Typography>
                {isGamePlayed ? (
                  <>
                    Boom! Anda membuka kotak berisi bom. Anda memiliki <b>{currentCoins}</b>{' '}
                    koin.&nbsp;
                    {currentCoins > 0
                      ? 'Gunakan 1 koin untuk melanjutkan permainan?'
                      : 'Beli koin untuk melanjutkan permainan?'}
                  </>
                ) : (
                  <>
                    Koin yang anda miliki <b>{currentCoins}</b>.&nbsp;
                    {currentCoins > 0
                      ? 'Gunakan 1 koin untuk melanjutkan permainan?'
                      : 'Beli koin untuk melanjutkan permainan?'}
                  </>
                )}
              </Typography>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
              <Button
                color="primary"
                variant="contained"
                onClick={currentCoins > 0 ? handleClickPlayAgain : handleDialogPurchaseCoinOpen}
                fullWidth
              >
                Ok
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <DialogCoinPurchase
        open={isDialogPurchaseCoinOpen}
        onClose={handleDialogPurchaseCoinClose}
        onBack={handleDialogPurchaseCoinBack}
        onSuccess={handleSuccessPurchaseCoin}
        isClosable={isDialogPurchaseCoinClosable}
      />

      <Dialog
        open={isDialogWinOpen}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          className: isBombAnimateShow ? classes.dialogPaperBomb : classes.dialogPaper
        }}
      >
        <DialogContent className={classes.dialogContent}>
          <img src="/images/levelup.png" alt="bomb" className={classes.imageBomb} />
          <Typography>
            Selamat anda berhasil menyelesaikan level <b>{currentLevel}</b>!
          </Typography>
          {isMaxLevel && (
            <Typography>
              Anda telah mencapai level maksimal. Silakan tunggu hasil pengumuman pemenang.
            </Typography>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '0px 16px 16px' }}>
          {isMaxLevel ? (
            <Button color="primary" variant="contained" onClick={handleDialogWinClose} fullWidth>
              Tutup
            </Button>
          ) : (
            <Button color="primary" variant="contained" onClick={handleClickNextLevel} fullWidth>
              Level berikutnya
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Home
