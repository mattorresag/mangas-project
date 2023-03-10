import { Avatar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Manga } from '../../types/manga';
import { Flex } from '../Flex';
import { StyledButton } from '../../ui/Button';
interface Props {
  manga: Manga;
  handleSelectManga: (manga: Manga | null) => void;
}
export const MangaItem = ({ manga, handleSelectManga }: Props): JSX.Element => {
  return (
    <Flex align='center' justify='between' css={{ gap: '8px', width: '100%' }}>
      <Flex align='center' css={{ gap: '16px', width: '30%' }}>
        <Avatar src={manga.cover} />
        <Typography fontFamily='Rubik'>
          {manga.name}
        </Typography>
      </Flex>
      <Typography fontFamily='Rubik'>
        {manga.chapters} capítulos
      </Typography>
      {manga.isFinished ? (
        <Typography fontFamily='Rubik' color='green'>
          Finalizado
        </Typography>
      ) : (
        <Typography fontFamily='Rubik' color='blue'>
          Em Andamento
        </Typography>
      )}
      <StyledButton onClick={() => handleSelectManga(manga)
      }>
        <AddIcon />
      </StyledButton>
    </Flex>
  );
}
