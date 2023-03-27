import React from 'react'

import useStyles from './useStylesWinner'

const Winner = () => {
  const classes = useStyles()()
  // if (boardState.isLoading) {
  //   return <div className={classes.loadingContent} />
  // }

  return <div className={classes.content}>Pemenang</div>
}

export default Winner
