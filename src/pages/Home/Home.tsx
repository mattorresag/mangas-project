import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from 'react';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/userProvider';

export const Home = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const mangas = currentUser?.mangas;

  return (
    <Flex direction='column' align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%', gap: '32px' }}>
      <Header />
      <Typography variant='h2' color='#0092EE'>
        Meus Mangás
      </Typography>
      {mangas?.map((manga) => (
        <Typography>
          {manga.name}
        </Typography>)
      )}
      <Button variant='contained' onClick={() => navigate('/mangas-list')}>
        <Flex align='center' css={{ gap: '8px' }}>
          <AddIcon />
          <Typography>
            Adicionar novo mangá
          </Typography>
        </Flex>
      </Button>
    </Flex>
  );
}
