import { Avatar, Button, Typography } from "@mui/material";
import { Manga } from "../../../types/manga";
import { StyledButton } from "../../../ui/Button";
import { Flex } from "../../Flex";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseUtils";
import { useContext, useState } from "react";
import { UserContext } from "../../../provider/userProvider";
import { toast } from "react-toastify";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
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
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [lastChapter, setLastChapter] = useState(0);

  const deleteManga = () => {
    if (window.confirm(`Deseja realmente deletar o mangá ${manga.name}?`)) {
      setIsLoading(true);
      deleteDoc(doc(db, `users/${currentUser?.uid}/mangas/${manga.name}`))
        .then(() =>
          toast(`O mangá ${manga.name} foi deletado da sua lista com sucesso!`)
        )
        .catch(() =>
          toast(
            `Ocorreu um erro ao deletar o mangá ${manga.name} da sua lista.`
          )
        )
        .finally(() => setIsLoading(false));
    }
  };

  const updateLastChapter = () => {
    axios
      .get(
        "https://corsproxy.io/?" +
          encodeURIComponent(
            `https://api.mangadex.org/manga/${manga.mangadex_id}/feed?order[createdAt]=desc`
          ),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (data: {
          data: {
            data: {
              attributes: {
                chapter: string;
              };
            }[];
          };
        }) => {
          const newChapter = Number(
            data?.data?.data?.[0]?.attributes?.chapter || 0
          );
          manga.chapters !== newChapter
            ? updateDoc(
                doc(db, `users/${currentUser?.uid}/mangas/${manga?.name}`),
                {
                  chapters: newChapter,
                }
              )
                .then(() =>
                  toast(
                    `Último capítulo do mangá ${manga?.name} atualizado com sucesso!`
                  )
                )
                .catch(() =>
                  toast(
                    `Ocorreu um erro ao atualizar o último capítulo do mangá ${manga?.name} `
                  )
                )
            : toast("O capítulo já está atualizado!");
        }
      );
  };

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
        <Flex align="center" css={{ width: "25%", gap: "16px" }}>
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
      <Flex css={{ width: "25%" }}>
        <Typography color="#202632">
          <strong>{manga.chapters} capítulos</strong>
        </Typography>
      </Flex>
      {isCRUD ? (
        <Flex css={{ width: "25%" }}>
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
      ) : (
        <Flex css={{ width: "25%" }}>
          {manga.chapters === manga.lastRead ? (
            <Typography color="#083B7F">
              <strong>Em dia!</strong>
            </Typography>
          ) : (
            <Typography color="#00695f">
              <strong>Tem capítulo disponível!</strong>
            </Typography>
          )}
        </Flex>
      )}
      <Flex css={{ width: "7%" }}>
        {!isCRUD && (
          <StyledButton
            onClick={() => updateLastChapter()}
            size="small"
            style={{ background: "green" }}
            variant="contained"
            disabled={isLoading}
          >
            <UpdateIcon />
          </StyledButton>
        )}
      </Flex>
      <Flex css={{ width: "7%" }}>
        {isCRUD ? (
          <StyledButton onClick={() => handleSelectedManga?.(manga)}>
            <AddIcon />
          </StyledButton>
        ) : (
          <StyledButton
            onClick={() => deleteManga()}
            size="small"
            style={{ background: "#f44336" }}
            variant="contained"
            disabled={isLoading}
          >
            <DeleteIcon />
          </StyledButton>
        )}
      </Flex>
    </Flex>
  );
};
