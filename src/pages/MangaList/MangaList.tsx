import { Typography } from '@mui/material';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { Manga } from '../../types/manga';
import { db } from '../../utils/firebaseUtils';
import { MangaItem } from '../../components/Manga/MangaItem';

export const MangaList = (): JSX.Element => {
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
      <Flex direction='column' css={{ width: '60vw', gap: '16px', maxHeight: '50vh', overflow: 'auto', position: 'relative' }}>
        <Flex align='center' justify='between' css={{ gap: '8px', width: '100%', position: 'sticky', top: '0', left: '0', background: 'red', zIndex: 9999 }}>
          <Flex align='center' css={{ gap: '16px', width: '30%' }}>
            <Typography fontFamily='Rubik'>
              Capa
            </Typography>
            <Typography>
              Nome do mangá
            </Typography>
          </Flex>
          <Typography fontFamily='Rubik'>
            Número de capítulos
          </Typography>
          <Typography fontFamily='Rubik'>
            Status
          </Typography>
        </Flex>
        {mangas.map((manga) => (
          <MangaItem manga={manga} />
        ))}
      </Flex>
    </Flex>
  );
}
