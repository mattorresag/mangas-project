import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { Manga } from '../../types/manga';
import { auth, db } from '../../utils/firebaseUtils';
import { useNavigate } from 'react-router-dom';

export const Home = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [mangas, setMangas] = useState<Manga[]>([])

  useEffect(() => {
    const transactionsRef = collection(db, `users/${user?.uid}/mangas`);
    const q = query(transactionsRef);
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list: Manga[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Manga);
        });
        setMangas(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <Flex direction='column' align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%', gap: '32px' }}>
      <Header />
      <Typography variant='h2' color='#0092EE'>
        Meus Mangás
      </Typography>
      {mangas.map((manga) => (
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
