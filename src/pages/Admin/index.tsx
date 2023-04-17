import { Flex } from "../../components/Flex";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseUtils";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { schema } from "./schema";
import { InferType } from "yup";
import { Header } from "../../components/Header";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { StyledButton } from "../../ui/Button";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import createBreakpoint from "../../hooks/useWindowSize";
import { MangaContext } from "../../provider/mangaProvider";

type IFormValues = InferType<typeof schema>;
const useBreakpoint = createBreakpoint();

export const Panel = () => {
  const breakpoint = useBreakpoint();
  const isMobile = ["xxs", "xs"].includes(breakpoint);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      isFinished: false,
      chapters: 0,
      name: "",
      mangadex_id: "",
      cover: "",
    },
  });

  const { mangas } = useContext(MangaContext);

  const submitManga: SubmitHandler<IFormValues> = async (data, e) => {
    e?.preventDefault();
    setIsLoading(true);
    const isMangaAlreadyAdded = mangas?.some(
      (manga) => manga.name === data?.name
    );
    if (isMangaAlreadyAdded) {
      toast(`O mangá ${data.name} já foi adicionado.`);
      setIsLoading(false);
      return;
    }
    await setDoc(doc(db, "mangas", data.name), {
      name: data.name,
      chapters: data.chapters,
      isFinished: data.isFinished,
      mangadex_id: data.mangadex_id,
      cover: data.cover,
    })
      .then(() => {
        toast(`O mangá ${data.name} foi adicionado com sucesso!`);
        reset({
          isFinished: false,
          name: "",
          chapters: null,
          mangadex_id: "",
          cover: "",
        });
      })
      .catch(() => toast(`Ocorreu um erro ao adicionar o mangá ${data.name}.`))
      .finally(() => setIsLoading(false));
  };

  return (
    <Layout>
      <Header />
      <StyledTypography variant="h2">Adicionar novo mangá</StyledTypography>
      <Flex align="center" justify="center">
        <form
          onSubmit={handleSubmit(submitManga)}
          style={{ width: isMobile ? "300px" : "100%" }}
        >
          <Flex direction="column" css={{ gap: "16px" }}>
            <Flex
              direction={isMobile ? "column" : "row"}
              css={{ gap: "16px", width: "100%" }}
            >
              <Flex>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      placeholder="Nome"
                      style={{ width: "100%" }}
                      {...field}
                    />
                  )}
                />
              </Flex>
              <Flex>
                <Controller
                  name="chapters"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      style={{ width: "100%" }}
                      placeholder="Número de Capítulos"
                      {...field}
                    />
                  )}
                />
              </Flex>
            </Flex>
            <Flex
              direction={isMobile ? "column" : "row"}
              css={{ gap: "16px", width: "100%" }}
            >
              <Flex>
                <Controller
                  name="mangadex_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      style={{ width: "100%" }}
                      placeholder="ID MangaDex"
                      {...field}
                    />
                  )}
                />
              </Flex>
              <Flex>
                <Controller
                  name="cover"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      style={{ width: "100%" }}
                      placeholder="Capa"
                      {...field}
                    />
                  )}
                />
              </Flex>
            </Flex>
            <Flex align="center" justify="center" css={{ gap: "16px" }}>
              <Typography>Finalizado?</Typography>
              <Controller
                name="isFinished"
                control={control}
                render={({ field }) => <Checkbox {...field} />}
              />
            </Flex>
            <StyledButton
              disabled={isLoading}
              variant="contained"
              type="submit"
            >
              Enviar
            </StyledButton>
          </Flex>
        </form>
      </Flex>
    </Layout>
  );
};
