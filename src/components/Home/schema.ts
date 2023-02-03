import { boolean, number, object, string } from "yup";

export const schema = object({
  name: string().required("É obrigatório escrever uma mensagem."),
  chapters: number().nullable(),
  isFinished: boolean(),
});
