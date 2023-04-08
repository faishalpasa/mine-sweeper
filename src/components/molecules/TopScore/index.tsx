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
  Backdrop,
  Paper
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

const winnerStyles = (position: number) => {
  if (position === 1) {
    return { background: '#f59f0b' }
  } else if (position === 2) {
    return { background: '#c0c0c0' }
  } else if (position === 3) {
    return { background: '#fa6b25' }
  } else {
    return {}
  }
}

const TopScore = () => {
  const classes = useStyles()
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
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tableHeaderCell}
                  style={{ padding: '6px 6px 6px 16px' }}
                ></TableCell>
                <TableCell className={classes.tableHeaderCell}>No. Handphone</TableCell>
                <TableCell className={classes.tableHeaderCell}>Level</TableCell>
                <TableCell className={classes.tableHeaderCell}>Poin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((winner, index) => (
                <TableRow key={winner.id} style={{ ...winnerStyles(index + 1) }}>
                  <TableCell style={{ padding: '6px 6px 6px 16px' }}>{index + 1}</TableCell>
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
