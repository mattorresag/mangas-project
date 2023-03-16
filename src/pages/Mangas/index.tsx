import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Manga } from "../../types/manga";
import { db } from "../../utils/firebaseUtils";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { MangaList } from "../../components/Manga/List/MangaList";

export const Mangas = (): JSX.Element => {
  const [mangas, setMangas] = useState<Manga[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <StyledTypography variant="h2">Mangás</StyledTypography>
        <MangaList mangas={mangas} />
      </Layout>
    </>
  );
};
