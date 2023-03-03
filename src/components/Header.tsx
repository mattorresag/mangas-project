import { Button, Typography } from '@mui/material';
import { signOut, User } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebaseUtils';
import { Flex } from './Flex';

export const Header = (): JSX.Element => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const handleLogout = () => {
    signOut(auth);
  }

  return (
    <Flex align='center' gap='16' css={{ padding: '16px', width: 'calc(100vw - 16px)', position: 'fixed', top: 0, height: `100px`, background: 'AliceBlue' }} justify='between'>
      <Typography color='Highlight' style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
        Home
      </Typography>
      <Flex align='center' css={{ gap: '32px' }}>
        <Typography>
          {user?.email}
        </Typography>
        {user?.email && (
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
