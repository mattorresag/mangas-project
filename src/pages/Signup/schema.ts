import { object, ref, string } from "yup";

export const schema = object({
  name: string().required("É obrigatório inserir um nome de usuarío."),
  password: string()
    .required("Senha inválida.")
    .min(8, "A senha deve conter no mínimo 8 caracteres."),
  email: string()
    .email("E-mail inválido!")
    .required("É obrigatório inserir um e-mail."),
  confirmEmail: string()
    .oneOf([ref("email"), null], "Os e-mails não conferem.")
    .required("É obrigatório inserir uma confirmação de e-mail."),
});
