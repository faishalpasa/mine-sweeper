import React from 'react'
import { Button, Typography } from '@material-ui/core'

import useStyles from './useStylesHeader'

const Header = () => {
  const classes = useStyles()()

  return (
    <div className={classes.header}>
      <div className={classes.user}>
        <Typography>User: 0123</Typography>
      </div>
      <div className={classes.logout}>
        <Button>Logout</Button>
      </div>
    </div>
  )
}

export default Header
