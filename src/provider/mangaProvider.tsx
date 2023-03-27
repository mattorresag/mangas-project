import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Manga } from "../types/manga";
import { auth, db } from "../utils/firebaseUtils";

interface Props {
  children: React.ReactNode;
}

type Context = {
  mangas?: Manga[];
  setMangas: React.Dispatch<React.SetStateAction<Manga[] | undefined>>;
  loadingMangas: boolean;
};

export const MangaContext = createContext<Context>({
  mangas: undefined,
  setMangas: () => null,
  loadingMangas: false,
});

export const MangaProvider = ({ children }: Props): JSX.Element => {
  const [loadingMangas, setLoadingMangas] = useState(false);
  const [mangas, setMangas] = useState<Manga[] | undefined>(undefined);

  useEffect(() => {
    setLoadingMangas(true);
    const transactionsRef = collection(db, `mangas`);
    const q = query(transactionsRef);
    onSnapshot(
      q,
      (snapShot) => {
        let list: Manga[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Manga);
        });
        setMangas(list);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoadingMangas(false);
  }, [auth]);

  return (
    <MangaContext.Provider value={{ mangas, setMangas, loadingMangas }}>
      {children}
    </MangaContext.Provider>
  );
};
