import { Avatar, Typography } from '@mui/material';
import { Manga } from '../../types/manga';
import { Flex } from '../Flex';
interface Props {
  manga: Manga;
}
export const MyMangaItem = ({ manga }: Props): JSX.Element => {
  return (
    <Flex align='center' justify='between' css={{ gap: '8px', width: '100%', padding: '16px' }}>
      <Flex align='center' css={{ gap: '16px', width: '30%' }}>
        <Avatar src={manga.cover} />
        <Typography color='#202632'>
          <strong>{manga.name}</strong>
        </Typography>
      </Flex>
      <Typography color='#202632'>
        <strong>Capítulo {manga.lastRead}</strong>
      </Typography>
      <Typography color='#202632'>
        <strong>{manga.chapters} capítulos</strong>
      </Typography>
      {manga.isFinished ? (
        <Typography color='green'>
          <strong>Finalizado</strong>
        </Typography>
      ) : (
        <Typography color='#083B7F'>
          <strong>Em Andamento</strong>
        </Typography>
      )}
    </Flex>
  );
}
