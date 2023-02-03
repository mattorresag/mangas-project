import React, { useState, useEffect } from 'react'
import { useAuth } from '../../providers/auth'
import { Flex } from '../Flex'
import { addDoc, collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../utils/firebaseUtils';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { schema } from './schema';
import { InferType } from 'yup';

type IFormValues = InferType<typeof schema>;

const Home = () => {
  const [mangas, setMangas] = useState<{ id: string; data: DocumentData; }[]>([]);

  const { handleSubmit, control, reset, resetField } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      isFinished: false,
      chapters: null,
      name: ''
    }
  })

  const submitManga: SubmitHandler<IFormValues> = async (data, e) => {
    e?.preventDefault()
    await addDoc(collection(db, 'mangas'), {
      name: data.name,
      chapters: data.chapters,
      isFinished: data.isFinished,
    });
    reset({ isFinished: false, name: '', chapters: null });
  }

  useEffect(() => {
    const q = query(collection(db, 'mangas'), orderBy('created', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot.docs)
      setMangas(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <Flex direction='column' align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%', gap: '32px' }}>
      <Typography variant='h2' color='#0092EE'>
        Adicionar novo mangá
      </Typography>
      <Flex align='center' justify='center'>
        <form onSubmit={handleSubmit(submitManga)}>
          <Flex direction='column' css={{ gap: '16px' }}>
            <Flex css={{ gap: '16px' }}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField placeholder='Nome' {...field} />
                )}
              />
              <Controller
                name='chapters'
                control={control}
                render={({ field }) => (
                  <TextField placeholder='Número de Capítulos' {...field} />
                )}
              />
            </Flex>
            <Flex align='center' justify='center' css={{ gap: '16px' }}>
              <Typography>
                Finalizado?
              </Typography>
              <Controller
                name='isFinished'
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} />
                )}
              />
            </Flex>
            <Button variant='contained' type='submit'>
              Enviar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

export default Home