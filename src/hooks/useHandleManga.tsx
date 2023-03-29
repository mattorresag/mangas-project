import axios from "axios";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../provider/userProvider";
import { Manga } from "../types/manga";
import { db } from "../utils/firebaseUtils";
interface Props {
  selectedManga?: Manga | null;
  handleSelectedManga?: (manga: Manga | null) => void;
}
export const useHandleManga = ({
  selectedManga,
  handleSelectedManga,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleAddManga = ({ lastRead }: { lastRead: number }) => {
    const isDuplicate = currentUser?.mangas?.find(
      (userManga) => userManga.name === selectedManga?.name
    );
    isDuplicate
      ? toast(`O mangá ${selectedManga?.name} já pertence a sua lista!`)
      : setDoc(
          doc(
            db,
            `users/${currentUser?.uid}/mangas/`,
            selectedManga?.name || ""
          ),
          {
            name: selectedManga?.name,
            id: selectedManga?.id,
            cover: selectedManga?.cover || "",
            chapters: selectedManga?.chapters,
            lastRead,
            mangadex_id: selectedManga?.mangadex_id,
          }
        )
          .then(() =>
            toast(
              `O mangá ${selectedManga?.name} foi adicionado à sua lista com sucesso!`
            )
          )
          .catch(() =>
            toast(
              `Ocorreu um erro ao adicionar o mangá ${selectedManga?.name} à sua lista.`,
              {
                type: "error",
              }
            )
          )
          .finally(() => handleSelectedManga?.(null));
  };

  const handleUpdateManga = ({ lastRead }: { lastRead: number }) => {
    updateDoc(
      doc(db, `users/${currentUser?.uid}/mangas/${selectedManga?.name}`),
      {
        lastRead,
      }
    )
      .then(() => toast("Último capítulo lido alterado com sucesso!"))
      .catch(() =>
        toast("Ocorreu um erro alterar o último capítulo.", {
          type: "error",
        })
      )
      .finally(() => handleSelectedManga?.(null));
  };

  const handleDeleteManga = ({
    manga,
    isUserManga = true,
  }: {
    manga: Manga;
    isUserManga?: boolean;
  }) => {
    const deleteFromUserList = () =>
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

    const deleteFromMangaList = () =>
      deleteDoc(doc(db, `mangas/${manga.name}`))
        .then(() => toast(`O mangá ${manga.name} foi deletado com sucesso!`))
        .catch(() => toast(`Ocorreu um erro ao deletar o mangá ${manga.name}.`))
        .finally(() => setIsLoading(false));

    if (window.confirm(`Deseja realmente deletar o mangá ${manga.name}?`)) {
      setIsLoading(true);
      return isUserManga ? deleteFromUserList() : deleteFromMangaList();
    }
    setIsLoading(false);
  };

  const handleUpdateLastChapter = ({ manga }: { manga: Manga }) => {
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

  return {
    handleUpdateManga,
    handleAddManga,
    handleUpdateLastChapter,
    handleDeleteManga,
    isLoading,
  };
};
