import { Typography, TextField, Button } from '@mui/material';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Flex } from '../../components/Flex';
import { Header } from '../../components/Header';
import { Manga } from '../../types/manga';
import { db } from '../../utils/firebaseUtils';
import { MangaItem } from '../../components/Manga/MangaItem';
import Dialog from '@mui/material/Dialog/Dialog';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { InferType, number, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../../provider/userProvider';
import { StyledTypography } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { StyledButton } from '../../ui/Button';

const schema = object({
  lastRead: number()
    .typeError('Deve ser um número.')
    .required("É obrigatório inserir o último capítulo lido"),
});


type IFormValues = InferType<typeof schema>;

export const MangaList = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  const [mangas, setMangas] = useState<Manga[]>([])
  const [selectedManga, setSelectedManga] = useState<Manga | null>();

  const handleSelectManga = (manga: Manga | null) => {
    setSelectedManga(manga)
  }

  const { handleSubmit, control, formState: { errors } } = useForm<IFormValues>({
    resolver: yupResolver(schema)
  })

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


  const submit: SubmitHandler<IFormValues> = (data) => {
    if (data) {
      addDoc(collection(db, `users/${currentUser?.uid}/mangas`), {
        name: selectedManga?.name,
        id: selectedManga?.id,
        cover: selectedManga?.cover,
        chapter: selectedManga?.chapters,
        lastRead: data.lastRead
      })
    }
  }

  return (
    <>
      <Layout>
        <Header />
        <StyledTypography variant='h2'>
          Mangás
        </StyledTypography>
        <Flex direction='column' css={{ width: '60vw', gap: '16px', maxHeight: '50vh', overflow: 'auto', position: 'relative' }}>
          <Flex align='center' justify='between' css={{ gap: '8px', width: '100%', position: 'sticky', top: '0', left: '0', background: 'red', zIndex: 10 }}>
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
            <MangaItem handleSelectManga={handleSelectManga} manga={manga} />
          ))}
        </Flex>
      </Layout>
      <Dialog onClose={() => setSelectedManga(null)} open={!!selectedManga}>
        <Flex direction='column' align='center' css={{ borderRadius: '16px', width: '30vw', height: '100%', gap: '16px', padding: '8px' }}>
          <StyledTypography variant='h4'>
            {selectedManga?.name}
          </StyledTypography>
          <form onSubmit={handleSubmit(submit)}>
            <Flex direction='column' css={{ gap: '16px', width: '100%' }}>
              <Flex css={{ width: '100%' }}>
                <Controller
                  control={control}
                  name='lastRead'
                  render={({ field }) => (
                    <TextField
                      style={{ width: '100%' }}
                      type="text"
                      placeholder="Último capítulo lido"
                      error={!!errors.lastRead?.message}
                      helperText={errors.lastRead?.message}
                      {...field}
                    />
                  )} />
              </Flex>
              <Flex css={{ width: '100%' }}>
                <StyledButton type='submit' variant='contained'>
                  Adicionar mangá a minha lista
                </StyledButton>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Dialog>
    </>
  );
}
