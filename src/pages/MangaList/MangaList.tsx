import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { Manga } from "../../types/manga";
import { db } from "../../utils/firebaseUtils";
import { MangaItem } from "../../components/Manga/MangaItem";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { MangaListHeader } from "../../components/Manga/MangaListHeader";
import { AddManga } from "../../components/Manga/AddManga";

export const MangaList = (): JSX.Element => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [selectedManga, setSelectedManga] = useState<Manga | null>();

  const handleSelectManga = (manga: Manga | null) => {
    setSelectedManga(manga);
  };

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
        <MangaListHeader isCRUD>
          {mangas.map((manga) => (
            <Flex
              css={{
                background: "#98c1d9 ",
                "&:first-child": { marginTop: "-16px" },
                "&:nth-child(odd)": { background: "#6b8ead" },
              }}
            >
              <MangaItem
                isCRUD
                handleSelectedManga={handleSelectManga}
                manga={manga}
              />
            </Flex>
          ))}
        </MangaListHeader>
      </Layout>
      <AddManga
        handleSelectedManga={handleSelectManga}
        selectedManga={selectedManga}
      />
    </>
  );
};
