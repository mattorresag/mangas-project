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
import { useState } from "react";

type IFormValues = InferType<typeof schema>;

export const Panel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      isFinished: false,
      chapters: 0,
      name: "",
      manganato_id: "",
      cover: "",
    },
  });

  const submitManga: SubmitHandler<IFormValues> = async (data, e) => {
    e?.preventDefault();
    setIsLoading(true);
    await setDoc(doc(db, "mangas", data.name), {
      name: data.name,
      chapters: data.chapters,
      isFinished: data.isFinished,
      manganato_id: data.manganato_id,
      cover: data.cover,
    })
      .then(() => {
        toast(`O mangá ${data.name} foi adicionado com sucesso!`);
        reset({
          isFinished: false,
          name: "",
          chapters: null,
          manganato_id: "",
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
        <form onSubmit={handleSubmit(submitManga)}>
          <Flex direction="column" css={{ gap: "16px" }}>
            <Flex css={{ gap: "16px" }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField placeholder="Nome" {...field} />
                )}
              />
              <Controller
                name="chapters"
                control={control}
                render={({ field }) => (
                  <TextField placeholder="Número de Capítulos" {...field} />
                )}
              />
            </Flex>
            <Flex align="center" justify="center" css={{ gap: "16px" }}>
              <Controller
                name="manganato_id"
                control={control}
                render={({ field }) => (
                  <TextField placeholder="ID Manganato" {...field} />
                )}
              />
              <Controller
                name="cover"
                control={control}
                render={({ field }) => (
                  <TextField placeholder="Capa" {...field} />
                )}
              />
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
