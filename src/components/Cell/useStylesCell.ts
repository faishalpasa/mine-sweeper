import { makeStyles } from '@material-ui/core'

const useStyles = () =>
  makeStyles(() => {
    return {
      block: {
        width: '100%',
        aspectRatio: '1/1',
        background: 'silver',
        boxShadow: '3px 3px 1px #fff inset, -3px -3px 2px #8a8a8a inset',
        border: '0.5px solid #656565',
        '&:hover': {
          boxShadow: 'unset'
        },
        '&.active': {
          boxShadow: 'unset'
        }
      }
    }
  })

export default useStyles
