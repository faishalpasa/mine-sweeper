import React from 'react'

import useStyles from './useStylesTerms'

const Terms = () => {
  const classes = useStyles()()
  // if (boardState.isLoading) {
  //   return <div className={classes.loadingContent} />
  // }

  return <div className={classes.content}>Syarat & Ketentuan</div>
}

export default Terms
