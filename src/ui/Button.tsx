import { styled } from '@material-ui/styles'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)({
  background: `#eae8ff`,
  color: 'rgb(1, 42, 54)',
  '&:hover': {
    background: '#adacb5'
  }
})