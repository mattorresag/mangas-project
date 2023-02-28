import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import { Flex } from './Flex';

export const Header = (): JSX.Element => {
  const navigate = useNavigate()
  const { user, handleLogout } = useAuth();
  return (
    <Flex align='center' gap='16' css={{ padding: '16px', width: 'calc(100vw - 16px)', position: 'fixed', top: 0, height: `100px`, background: 'AliceBlue' }} justify='between'>
      <Typography color='Highlight' style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
        Home
      </Typography>
      <Flex align='center' css={{ gap: '32px' }}>
        <Typography>
          {user?.name}
        </Typography>
        {user?.role === 'admin' && (
          <Button onClick={() => navigate('/panel')}>
            Acessar painel
          </Button>
        )}
        <Button variant='contained' onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
