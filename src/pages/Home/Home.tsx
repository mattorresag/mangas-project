import { CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/userProvider';
import { StyledTypography } from '../../ui/Typography';
import { StyledButton } from '../../ui/Button';
import { Layout } from '../../ui/Layout';
import { MyMangaItem } from '../../components/Manga/MyMangaItem';

export const Home = (): JSX.Element => {
  const { currentUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const mangas = currentUser?.mangas;

  return (
    <Layout>
      <Header />
      <StyledTypography variant='h2'>
        Meus Mangás
      </StyledTypography>
      {loading ? (
        <CircularProgress size='100px' />
      ) : (
        <Flex direction='column' css={{
          width: '60vw', gap: '16px', maxHeight: '50vh', overflow: 'auto', position: 'relative', padding: '16px',
        }}>
          <Flex align='center' justify='between' css={{ gap: '8px', width: '100%', padding: '16px', position: 'sticky', top: '0', left: '0', background: '#3d5a80', zIndex: 10 }}>
            <Flex align='center' css={{ gap: '16px', width: '30%' }}>
              <Typography color='#202632'>
                <strong>Capa</strong>
              </Typography>
              <Typography color='#202632'>
                <strong>Nome do mangá</strong>
              </Typography>
            </Flex>
            <Typography color='#202632'>
              <strong>Último capítulo lido</strong>
            </Typography>
            <Typography color='#202632'>
              <strong>Número de capítulos</strong>
            </Typography>
            <Typography color='#202632'>
              <strong>Status</strong>
            </Typography>
          </Flex>
          <Flex direction='column' >
            {mangas?.map((manga) => (
              <Flex css={{ background: '#98c1d9 ', '&:first-child': { marginTop: '-16px' }, '&:nth-child(odd)': { background: '#6b8ead' } }}>
                <MyMangaItem manga={manga} />
              </Flex>
            ))}
          </Flex>
        </Flex>)}
      <StyledButton variant='contained' onClick={() => navigate('/mangas-list')}>
        <Flex align='center' css={{ gap: '8px' }}>
          <AddIcon />
          <Typography>
            Adicionar novo mangá
          </Typography>
        </Flex>
      </StyledButton>
    </Layout>
  );
}
