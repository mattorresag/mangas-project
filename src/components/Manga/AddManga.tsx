import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Manga } from "../../types/manga";
import { StyledButton } from "../../ui/Button";
import { StyledTypography } from "../../ui/Typography";
import { Flex } from "../Flex";
import { schema } from "./schema";
import { InferType } from "yup";
import { useHandleManga } from "../../hooks/useHandleManga";

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const { handleAddManga, handleUpdateManga } = useHandleManga({
    selectedManga,
    handleSelectedManga,
  });

  const submit: SubmitHandler<IFormValues> = (data) => {
    if (!data) return;
    if (isEditing) {
      handleUpdateManga({ lastRead: data.lastRead });
    } else {
      handleAddManga({ lastRead: data.lastRead });
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
