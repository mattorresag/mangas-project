import { Flex } from '../../components/Flex'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebaseUtils';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { schema } from './schema';
import { InferType } from 'yup';
import { Header } from '../../components/Header';
import { StyledTypography } from '../../ui/Typography';
import { Layout } from '../../ui/Layout';
import { StyledButton } from '../../ui/Button';

type IFormValues = InferType<typeof schema>;

export const CreateMangas = () => {
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      isFinished: false,
      chapters: 0,
      name: '',
      manganato_id: ''
    }
  })

  const submitManga: SubmitHandler<IFormValues> = async (data, e) => {
    e?.preventDefault()
    await addDoc(collection(db, 'mangas'), {
      name: data.name,
      chapters: data.chapters,
      isFinished: data.isFinished,
      manganato_id: data.manganato_id
    });
    reset({ isFinished: false, name: '', chapters: null });
  }


  return (
    <Layout>
      <Header />
      <StyledTypography variant='h2'>
        Adicionar novo mangá
      </StyledTypography>
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
              <Controller
                name='manganato_id'
                control={control}
                render={({ field }) => (
                  <TextField placeholder='ID Manganato' {...field} />
                )}
              />
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
            <StyledButton variant='contained' type='submit'>
              Enviar
            </StyledButton>
          </Flex>
        </form>
      </Flex>
    </Layout>
  )
}
