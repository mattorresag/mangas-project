import { boolean, number, object, string } from "yup";

export const schema = object({
  name: string().required("É obrigatório escrever uma mensagem."),
  manganato_id: string().required(
    "É obrigatório o ID do mangá do site Manganato."
  ),
  chapters: number().nullable(),
  isFinished: boolean(),
});
