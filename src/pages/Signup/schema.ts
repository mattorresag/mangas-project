import { object, ref, string } from "yup";

export const schema = object({
  username: string().required("Usuário inválido."),
  password: string().required("Senha inválida."),
  email: string().email("E-mail inválido!").required("E-mail é obrigatório."),
  confirmEmail: string()
    .oneOf([ref("email"), null], "Confirmação de e-mail diferente do e-mail!")
    .required("required"),
});
