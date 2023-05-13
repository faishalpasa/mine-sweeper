import React, { useEffect } from 'react'
import {
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  Backdrop,
  Paper
} from '@material-ui/core'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { winnerDataFetch } from 'redux/reducers/winner'
import type { RootState } from 'redux/rootReducer'

import { maskPhoneNumber } from 'utils/string'
import useStyles from './useStylesWinner'
import { pageTracking } from 'utils/analytics'

const winnerSelector = ({ winner }: RootState) => ({
  data: winner.data,
  isLoading: winner.isLoading
})

const backgroundColor = (position: number) => {
  if (position === 1) {
    return '#f59f0b'
  } else if (position === 2) {
    return '#c0c0c0'
  } else if (position === 3) {
    return '#fa6b25'
  } else {
    return ''
  }
}

const Winner = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const termsState = useSelector(winnerSelector, shallowEqual)

  const { data, isLoading } = termsState

  useEffect(() => {
    pageTracking('Pemenang Periode Sebelumnya')

    if (!termsState.data.length) {
      dispatch(winnerDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle}>Pemenang Periode Sebelumnya</Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table>
            <TableBody>
              {data.map((winner, index) => (
                <TableRow key={winner.id} style={{ backgroundColor: backgroundColor(index + 1) }}>
                  <TableCell>
                    <div className={classes.winner}>
                      <img
                        src={`/images/winner-${index + 1}.png`}
                        alt={`winner-${index + 1}`}
                        className={classes.winnerLogo}
                      />
                      <div className={classes.winnerText}>
                        <Typography>{maskPhoneNumber(winner.msisdn, 'x', 4)}</Typography>
                        <Typography variant="caption">Point: {winner.points}</Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{winner.prize}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Winner
