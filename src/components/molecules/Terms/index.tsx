import React, { useEffect } from 'react'
import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { termsDataFetch } from 'redux/reducers/terms'
import type { RootState } from 'redux/rootReducer'

import useStyles from './useStylesTerms'

const termsSelector = ({ terms }: RootState) => ({
  data: terms.data,
  isLoading: terms.isLoading
})

const Terms = () => {
  const classes = useStyles()()
  const dispatch = useDispatch()
  const termsState = useSelector(termsSelector, shallowEqual)

  const { data, isLoading } = termsState

  useEffect(() => {
    if (!termsState.data.length) {
      dispatch(termsDataFetch())
    }
  }, [])

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.contentTitle} style={{ flex: 1 }}>
          Syarat dan Ketentuan
        </Typography>
        <ol className={classes.list}>
          {data.map((termData) => (
            <li className={classes.listItem} key={termData.id}>
              {termData.description}
            </li>
          ))}
        </ol>
      </div>

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  )
}

export default Terms
