import { Avatar, Button, Typography } from "@mui/material";
import { Manga } from "../../types/manga";
import { StyledButton } from "../../ui/Button";
import { Flex } from "../Flex";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
interface Props {
  manga: Manga;
  handleSelectedManga?: (manga: Manga | null) => void;
  isCRUD?: boolean;
}
export const MangaItem = ({
  manga,
  handleSelectedManga,
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
        <Flex align="center" css={{ width: "20%", gap: "16px" }}>
          <Typography color="#202632">
            <strong>Capítulo {manga.lastRead}</strong>
          </Typography>
          <StyledButton
            onClick={() => handleSelectedManga?.(manga)}
            size="small"
            variant="contained"
          >
            <EditIcon />
          </StyledButton>
        </Flex>
      )}
      <Flex css={{ width: "24%" }}>
        <Typography color="#202632">
          <strong>{manga.chapters} capítulos</strong>
        </Typography>
      </Flex>
      <Flex css={{ width: "24%" }}>
        {manga.isFinished ? (
          <Typography color="green">
            <strong>Finalizado</strong>
          </Typography>
        ) : (
          <Typography color="#083B7F">
            <strong>Em Andamento</strong>
          </Typography>
        )}
      </Flex>
      {isCRUD && (
        <Flex css={{ width: "7%" }}>
          <StyledButton onClick={() => handleSelectedManga?.(manga)}>
            <AddIcon />
          </StyledButton>
        </Flex>
      )}
    </Flex>
  );
};
