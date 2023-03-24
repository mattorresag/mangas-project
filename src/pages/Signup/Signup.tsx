import { Flex } from "../../components/Flex";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { schema } from "./schema";
import { auth, db } from "../../utils/firebaseUtils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler } from "react-hook-form/dist/types";
import { doc, setDoc } from "firebase/firestore";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { StyledButton } from "../../ui/Button";
import { toast } from "react-toastify";

type IFormValues = InferType<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      confirmEmail: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, `users`, user.uid), {
          uid: user.uid,
          name: data.name,
          authProvider: "local",
          email: data.email,
        });
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  return (
    <Layout>
      <Flex direction="column" align="center" css={{ gap: "32px" }}>
        <StyledTypography variant="h2">Mangas Project</StyledTypography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "300px" }}>
          <Flex
            direction="column"
            align="center"
            css={{ gap: "16px", width: "100%" }}
          >
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Usuarío"
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                    style={{ width: "100%" }}
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="E-mail"
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                    style={{ width: "100%" }}
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="confirmEmail"
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Confirme o e-mail"
                    error={!!errors?.confirmEmail?.message}
                    style={{ width: "100%" }}
                    helperText={errors?.confirmEmail?.message}
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Senha"
                    error={!!errors?.password?.message}
                    style={{ width: "100%" }}
                    helperText={errors?.password?.message}
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex css={{ width: "100%" }}>
              <StyledButton
                style={{ width: "100%" }}
                variant="contained"
                type="submit"
              >
                Cadastrar-se
              </StyledButton>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Layout>
  );
};

export default Signup;
