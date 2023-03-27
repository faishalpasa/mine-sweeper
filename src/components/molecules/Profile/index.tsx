import React from 'react'

import useStyles from './useStylesProfile'

const Profile = () => {
  const classes = useStyles()()
  // if (boardState.isLoading) {
  //   return <div className={classes.loadingContent} />
  // }

  return <div className={classes.content}>Profil</div>
}

export default Profile
