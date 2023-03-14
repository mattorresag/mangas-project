import { number, object } from "yup";

export const schema = object({
  lastRead: number()
    .typeError("Deve ser um número.")
    .required("É obrigatório inserir o último capítulo lido"),
});
