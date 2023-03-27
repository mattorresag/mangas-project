import { useContext } from "react";
import { Header } from "../../components/Header";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { MangaList } from "../../components/Manga/List/MangaList";
import { MangaContext } from "../../provider/mangaProvider";

export const Mangas = (): JSX.Element => {
  const { mangas } = useContext(MangaContext);

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
