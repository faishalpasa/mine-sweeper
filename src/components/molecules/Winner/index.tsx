import React, { useEffect } from 'react'
import {
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  CircularProgress,
  Backdrop
} from '@material-ui/core'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { winnerDataFetch } from 'redux/reducers/winner'
import type { RootState } from 'redux/rootReducer'

import { maskPhoneNumber } from 'utils/string'
import useStyles from './useStylesWinner'

const winnerSelector = ({ winner }: RootState) => ({
  data: winner.data,
  isLoading: winner.isLoading
})

const Winner = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const termsState = useSelector(winnerSelector, shallowEqual)

  const { data, isLoading } = termsState

  useEffect(() => {
    if (!termsState.data.length) {
      dispatch(winnerDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle}>Pemenang Periode 01 - 28 Februari</Typography>
        <TableContainer className={classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>No. Handphone</TableCell>
                <TableCell>Hadiah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((winner) => (
                <TableRow key={winner.id}>
                  <TableCell>
                    {maskPhoneNumber(winner.msisdn)}
                    <br />
                    <small>Point: {winner.points}</small>
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
