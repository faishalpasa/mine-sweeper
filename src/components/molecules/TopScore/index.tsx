import React from 'react'

import useStyles from './useStylesTopScore'

const TopScore = () => {
  const classes = useStyles()()
  // if (boardState.isLoading) {
  //   return <div className={classes.loadingContent} />
  // }

  return <div className={classes.content}>Top Skor</div>
}

export default TopScore
