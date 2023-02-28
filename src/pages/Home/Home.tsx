import { Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { Manga } from '../../types/manga';
import { db } from '../../utils/firebaseUtils';

export const Home = (): JSX.Element => {
  const [mangas, setMangas] = useState<Manga[]>([])

  useEffect(() => {
    const transactionsRef = collection(db, `mangas`);
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
        Mangás
      </Typography>
      {mangas.map((manga) => (
        <Typography>
          {manga.name}
        </Typography>)
      )}
    </Flex>
  );
}
