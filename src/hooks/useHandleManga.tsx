import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../provider/userProvider";
import { Manga } from "../types/manga";
import { db } from "../utils/firebaseUtils";
interface Props {
  selectedManga?: Manga | null;
  handleSelectedManga: (manga: Manga | null) => void;
}
export const useHandleManga = ({
  selectedManga,
  handleSelectedManga,
}: Props) => {
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
          .finally(() => handleSelectedManga(null));
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
      .finally(() => handleSelectedManga(null));
  };
  return {
    handleUpdateManga,
    handleAddManga,
  };
};
