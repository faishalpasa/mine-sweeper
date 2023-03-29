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

import { topScoreDataFetch } from 'redux/reducers/topScore'
import type { RootState } from 'redux/rootReducer'

import { maskPhoneNumber } from 'utils/string'
import useStyles from './useStylesTopScore'

const winnerSelector = ({ topScore }: RootState) => ({
  data: topScore.data,
  isLoading: topScore.isLoading
})

const TopScore = () => {
  const classes = useStyles()()
  const dispatch = useDispatch()
  const termsState = useSelector(winnerSelector, shallowEqual)

  const { data, isLoading } = termsState

  useEffect(() => {
    if (!termsState.data.length) {
      dispatch(topScoreDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle}>Top Skor</Typography>
        <TableContainer className={classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>No. Handphone</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Poin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((winner) => (
                <TableRow key={winner.id}>
                  <TableCell>{maskPhoneNumber(winner.msisdn)}</TableCell>
                  <TableCell>{winner.level}</TableCell>
                  <TableCell>{winner.points}</TableCell>
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

export default TopScore
