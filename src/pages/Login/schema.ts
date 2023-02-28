import { object, string } from "yup";

export const schema = object({
  username: string().required("Usuário inválido."),
  password: string().required("Senha inválida."),
});
