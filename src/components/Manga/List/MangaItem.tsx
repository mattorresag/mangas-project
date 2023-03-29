import { Avatar, Typography } from "@mui/material";
import { Manga } from "../../../types/manga";
import { Flex } from "../../Flex";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseUtils";
import { useContext, useMemo, useState } from "react";
import { UserContext } from "../../../provider/userProvider";
import { toast } from "react-toastify";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import createBreakpoint from "../../../hooks/useWindowSize";
interface Props {
  manga: Manga;
  handleSelectedManga?: (manga: Manga | null) => void;
  isCRUD?: boolean;
}

const useBreakpoint = createBreakpoint();

export const MangaItem = ({
  manga,
  handleSelectedManga,
  isCRUD = false,
}: Props): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = ["xs", "xxs"].includes(breakpoint);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

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
            `https://api.mangadex.org/manga/${manga.mangadex_id}/feed?order[chapter]=desc`
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

  const availableChapter = useMemo(() => {
    if (manga.lastRead === manga.chapters)
      return { text: "Em dia!", color: "#083B7F" };
    return manga.lastRead && manga.lastRead < manga.chapters
      ? { text: "Tem capítulo disponível!", color: "#00695f" }
      : { text: "Há uma divergência nos capítulos.", color: "#f44336" };
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
        {!isMobile && <Avatar src={manga.cover} />}
        <Typography
          variant={isMobile ? "caption" : "body1"}
          color="#202632"
          style={{ wordBreak: "break-all" }}
        >
          <strong>{manga.name}</strong>
        </Typography>
      </Flex>
      {!isCRUD && (
        <Flex
          align={isMobile ? "start" : "center"}
          css={{ width: "25%", gap: "16px" }}
          direction={isMobile ? "column" : "row"}
          justify={"start"}
        >
          <Flex css={{ width: "fit-content" }}>
            <Typography
              variant={isMobile ? "caption" : "body1"}
              color="#202632"
            >
              <strong>
                {!isMobile && "Capítulo"} {manga.lastRead}
              </strong>
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
        <Typography variant={isMobile ? "caption" : "body1"} color="#202632">
          <strong>
            {manga.chapters} {!isMobile && "capítulos"}
          </strong>
        </Typography>
      </Flex>
      {isCRUD ? (
        <Flex css={{ width: "25%" }}>
          {manga.isFinished ? (
            <Typography variant={isMobile ? "caption" : "body1"} color="green">
              <strong>Finalizado</strong>
            </Typography>
          ) : (
            <Typography
              variant={isMobile ? "caption" : "body1"}
              color="#083B7F"
            >
              <strong>Em Andamento</strong>
            </Typography>
          )}
        </Flex>
      ) : (
        <Flex css={{ width: "25%" }}>
          <Typography
            variant={isMobile ? "caption" : "body1"}
            color={availableChapter.color}
          >
            <strong>{availableChapter.text}</strong>
          </Typography>
        </Flex>
      )}
      <Flex
        css={{ width: "14%", gap: isCRUD ? "0px" : "8px" }}
        direction={isMobile ? "column" : "row"}
        align="center"
      >
        <Flex css={{ width: "50%" }}>
          {!isCRUD && (
            <UpdateIcon
              onClick={() => {
                isLoading ? null : updateLastChapter();
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
                isLoading ? null : deleteManga();
              }}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
