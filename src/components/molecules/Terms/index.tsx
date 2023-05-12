import React, { useEffect } from 'react'
import { Backdrop, CircularProgress, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { termsDataFetch } from 'redux/reducers/terms'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesTerms'
import { pageTracking } from 'utils/analytics'

const termsSelector = ({ terms }: RootState) => ({
  data: terms.data,
  isLoading: terms.isLoading
})

const Terms = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const termsState = useSelector(termsSelector, shallowEqual)

  const { data, isLoading } = termsState

  useEffect(() => {
    pageTracking('Syarat dan Ketentuan')

    if (!termsState.data.length) {
      dispatch(termsDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle}>Syarat dan Ketentuan</Typography>
        <Paper className={classes.paper}>
          <ol className={classes.list}>
            {data.map((termData) => (
              <li className={classes.listItem} key={termData.id}>
                <Typography className={classes.listItemText}>{termData.description}</Typography>
              </li>
            ))}
          </ol>
        </Paper>
      </div>

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Terms
