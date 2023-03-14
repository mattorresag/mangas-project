import { Avatar, Typography } from "@mui/material";
import { Manga } from "../../types/manga";
import { StyledButton } from "../../ui/Button";
import { Flex } from "../Flex";
import AddIcon from "@mui/icons-material/Add";
interface Props {
  manga: Manga;
  handleSelectManga?: (manga: Manga) => void;
  isCRUD?: boolean;
}
export const MangaItem = ({
  manga,
  handleSelectManga,
  isCRUD = false,
}: Props): JSX.Element => {
  return (
    <Flex
      align="center"
      justify="between"
      css={{ gap: "8px", width: "100%", padding: "16px" }}
    >
      <Flex align="center" css={{ gap: "16px", width: "30%" }}>
        <Avatar src={manga.cover} />
        <Typography color="#202632">
          <strong>{manga.name}</strong>
        </Typography>
      </Flex>
      {!isCRUD && (
        <Typography color="#202632">
          <strong>Capítulo {manga.lastRead}</strong>
        </Typography>
      )}
      <Typography color="#202632">
        <strong>{manga.chapters} capítulos</strong>
      </Typography>
      {manga.isFinished ? (
        <Typography color="green">
          <strong>Finalizado</strong>
        </Typography>
      ) : (
        <Typography color="#083B7F">
          <strong>Em Andamento</strong>
        </Typography>
      )}
      {isCRUD && (
        <StyledButton onClick={() => handleSelectManga?.(manga)}>
          <AddIcon />
        </StyledButton>
      )}
    </Flex>
  );
};
