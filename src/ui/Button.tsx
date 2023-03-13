import { styled } from '@material-ui/styles'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)({
  background: `#3d5a80`,
  color: 'white',
  '&:hover': {
    background: '#98c1d9'
  }
})