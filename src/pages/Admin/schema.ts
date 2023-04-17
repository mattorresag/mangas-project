import { boolean, number, object, string } from "yup";

export const schema = object({
  name: string().required("É obrigatório escrever uma mensagem."),
  cover: string().required("É obrigatório inserir uma capa."),
  mangadex_id: string().required(
    "É obrigatório o ID do mangá do site MangaDex."
  ),
  chapters: number().nullable(),
  isFinished: boolean(),
});
