import { Avatar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useMemo } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import { Manga } from "../../../../types/manga";
import { UserContext } from "../../../../provider/userProvider";
import { Flex } from "../../../Flex";
import { useHandleManga } from "../../../../hooks/useHandleManga";
interface Props {
  manga: Manga;
  handleSelectedManga?: (manga: Manga | null) => void;
  isCRUD?: boolean;
}

export const MangaItemDesktop = ({
  manga,
  handleSelectedManga,
  isCRUD = false,
}: Props): JSX.Element => {
  const { currentUser } = useContext(UserContext);

  const { handleUpdateLastChapter, handleDeleteManga, isLoading } =
    useHandleManga({});

  const availableChapter = useMemo(() => {
    if (manga.lastRead === manga.chapters)
      return { text: "Em dia!", color: "#083B7F" };
    return manga.lastRead && manga.lastRead < manga.chapters
      ? { text: "Tem capítulo disponível!", color: "#00695f" }
      : { text: "Erro.", color: "#f44336" };
  }, [manga]);

  const isMangaAdded = useMemo(() => {
    return !!currentUser?.mangas?.find((m) => m.name === manga.name);
  }, [currentUser, manga]);

  return (
    <Flex
      align="center"
      justify="between"
      css={{ gap: "8px", width: "100%", padding: "16px" }}
    >
      <Flex align="center" css={{ gap: "16px", width: "30%" }}>
        <Avatar src={manga.cover} />
        <Typography
          variant="body1"
          color="#202632"
          style={{ wordBreak: "break-word" }}
        >
          <strong>{manga.name}</strong>
        </Typography>
      </Flex>
      {!isCRUD && (
        <Flex
          align="center"
          css={{ width: "25%", gap: "16px" }}
          direction="row"
          justify="start"
        >
          <Flex css={{ width: "fit-content" }}>
            <Typography variant="body1" color="#202632">
              <strong>Capítulo {manga.lastRead}</strong>
            </Typography>
          </Flex>
          <Flex css={{ width: "50%" }}>
            <EditIcon
              style={{
                background: `#3d5a80`,
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
              }}
              onClick={() => handleSelectedManga?.(manga)}
            />
          </Flex>
        </Flex>
      )}
      <Flex css={{ width: "25%" }}>
        <Typography variant="body1" color="#202632">
          <strong>{manga.chapters} capítulos</strong>
        </Typography>
      </Flex>
      {isCRUD ? (
        <Flex css={{ width: "25%" }}>
          {manga.isFinished ? (
            <Typography variant="body1" color="green">
              <strong>Finalizado</strong>
            </Typography>
          ) : (
            <Typography variant="body1" color="#083B7F">
              <strong>Em Andamento</strong>
            </Typography>
          )}
        </Flex>
      ) : (
        <Flex css={{ width: "25%" }}>
          <Typography variant="body1" color={availableChapter.color}>
            <strong>{availableChapter.text}</strong>
          </Typography>
        </Flex>
      )}
      <Flex
        css={{ width: "14%", gap: isCRUD ? "0px" : "8px" }}
        direction="row"
        align="center"
      >
        <Flex css={{ width: "50%" }}>
          {!isCRUD && (
            <UpdateIcon
              onClick={() => {
                isLoading ? null : handleUpdateLastChapter({ manga });
              }}
              style={{
                background: "green",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
              }}
            />
          )}
        </Flex>
        <Flex css={{ width: "50%" }}>
          {isCRUD ? (
            <Flex css={{ width: "fit-content" }}>
              <AddIcon
                style={{
                  background: `#3d5a80`,
                  color: isMangaAdded ? "black" : "white",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  isMangaAdded ? null : handleSelectedManga?.(manga);
                }}
              />
            </Flex>
          ) : (
            <DeleteIcon
              style={{
                background: `#f44336`,
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
              }}
              onClick={() => {
                isLoading ? null : handleDeleteManga({ manga });
              }}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
