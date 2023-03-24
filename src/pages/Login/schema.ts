import { object, string } from "yup";

export const schema = object({
  email: string()
    .email("Deve-se inserir um e-mail.")
    .required("E-mail é obrigatório!."),
  password: string()
    .required("Senha é obrigatória.")
    .min(8, "A senha deve conter mais de 8 caracteres."),
});
