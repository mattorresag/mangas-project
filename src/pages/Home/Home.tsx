import { CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/userProvider";
import { StyledTypography } from "../../ui/Typography";
import { StyledButton } from "../../ui/Button";
import { Layout } from "../../ui/Layout";
import { MangaItem } from "../../components/Manga/MangaItem";
import { MangaListHeader } from "../../components/Manga/MangaListHeader";

export const Home = (): JSX.Element => {
  const { currentUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const mangas = currentUser?.mangas;

  return (
    <Layout>
      <Header />
      <StyledTypography variant="h2">Meus Mangás</StyledTypography>
      {loading ? (
        <CircularProgress size="100px" />
      ) : (
        <>
          <MangaListHeader>
            {mangas?.map((manga) => (
              <Flex
                css={{
                  background: "#98c1d9 ",
                  "&:first-child": { marginTop: "-16px" },
                  "&:nth-child(odd)": { background: "#6b8ead" },
                }}
              >
                <MangaItem manga={manga} />
              </Flex>
            ))}
          </MangaListHeader>
          <StyledButton
            variant="contained"
            onClick={() => navigate("/mangas-list")}
          >
            <Flex align="center" css={{ gap: "8px" }}>
              <AddIcon />
              <Typography>Adicionar novo mangá</Typography>
            </Flex>
          </StyledButton>
        </>
      )}
    </Layout>
  );
};
