import { Avatar, Button, styled, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/userProvider';
import { StyledButton } from '../ui/Button';
import { auth } from '../utils/firebaseUtils';
import { Flex } from './Flex';

const defaultAvatar = 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png';

export const Header = (): JSX.Element => {
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  }

  return (
    <Flex align='center' css={{ padding: '16px', width: '100vw', position: 'fixed', top: 0, height: `100px`, background: '#293241' }} justify='between'>
      <Flex align='center' css={{ gap: '32px' }} >
        <Typography variant='h5' color='white' style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          <strong>HOME</strong>
        </Typography>
        {currentUser?.role === `admin` && (
          <Typography variant='h5' color='white' style={{ cursor: 'pointer' }} onClick={() => navigate('/panel')}>
            <strong>PAINEL</strong>
          </Typography>
        )}
      </Flex>
      <Flex align='center' css={{ gap: '32px' }}>
        <Flex align='center' css={{ gap: '8px' }}>
          <Avatar src={currentUser?.avatar || defaultAvatar} />
          <Typography variant='body1' color='white'>
            {currentUser?.name}
          </Typography>
        </Flex>
        <StyledButton variant='contained' onClick={handleLogout}>
          <strong>Logout</strong>
        </StyledButton>
      </Flex>
    </Flex>
  );
}
