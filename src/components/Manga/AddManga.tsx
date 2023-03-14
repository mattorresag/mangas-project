import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, TextField } from "@mui/material";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../../provider/userProvider";
import { Manga } from "../../types/manga";
import { StyledButton } from "../../ui/Button";
import { StyledTypography } from "../../ui/Typography";
import { db } from "../../utils/firebaseUtils";
import { Flex } from "../Flex";
import { toast } from "react-toastify";
import { schema } from "./schema";
import { InferType } from "yup";

interface Props {
  handleSelectedManga: (manga: Manga | null) => void;
  selectedManga?: Manga | null;
  isEditing?: boolean;
}

type IFormValues = InferType<typeof schema>;

export const AddManga = ({
  handleSelectedManga,
  selectedManga,
  isEditing = false,
}: Props): JSX.Element => {
  const { currentUser } = useContext(UserContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit: SubmitHandler<IFormValues> = (data) => {
    if (data) {
      if (isEditing) {
        updateDoc(
          doc(db, `users/${currentUser?.uid}/mangas/${selectedManga?.name}`),
          {
            lastRead: data.lastRead,
          }
        )
          .then(() => toast("Último capítulo lido alterado com sucesso!"))
          .catch(() =>
            toast("Ocorreu um erro alterar o último capítulo.", {
              type: "error",
            })
          )
          .finally(() => handleSelectedManga(null));
      } else {
        setDoc(
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
            lastRead: data.lastRead,
          }
        )
          .then(() => toast("Mangá adicionado à sua lista com sucesso!"))
          .catch(() =>
            toast("Ocorreu um erro ao adicionar o mangá à sua lista.", {
              type: "error",
            })
          )
          .finally(() => handleSelectedManga(null));
      }
    }
  };

  return (
    <Dialog onClose={() => handleSelectedManga(null)} open={!!selectedManga}>
      <Flex
        direction="column"
        align="center"
        css={{
          borderRadius: "16px",
          width: "30vw",
          height: "100%",
          gap: "16px",
          padding: "8px",
        }}
      >
        <StyledTypography variant="h4">{selectedManga?.name}</StyledTypography>
        <form onSubmit={handleSubmit(submit)}>
          <Flex direction="column" css={{ gap: "16px", width: "100%" }}>
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="lastRead"
                render={({ field }) => (
                  <TextField
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Último capítulo lido"
                    error={!!errors.lastRead?.message}
                    helperText={errors.lastRead?.message}
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex css={{ width: "100%" }}>
              <StyledButton type="submit" variant="contained">
                {isEditing
                  ? "Alterar último capítulo"
                  : "Adicionar mangá a minha lista"}
              </StyledButton>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Dialog>
  );
};
