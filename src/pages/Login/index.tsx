import { Flex } from "../../components/Flex";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { schema } from "./schema";
import { SubmitHandler } from "react-hook-form/dist/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseUtils";
import { StyledTypography } from "../../ui/Typography";
import { Layout } from "../../ui/Layout";
import { StyledButton } from "../../ui/Button";
import { toast } from "react-toastify";

type IFormValues = InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const submit: SubmitHandler<IFormValues> = (data) => {
    if (data) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          navigate("/home");
        })
        .catch(() => toast("E-mail ou senha inválidos!"));
    }
  };

  return (
    <Layout>
      <Flex direction="column" align="center" css={{ gap: "32px" }}>
        <StyledTypography variant="h2">Mangas Project</StyledTypography>
        <form onSubmit={handleSubmit(submit)} style={{ width: "300px" }}>
          <Flex
            direction="column"
            align="center"
            css={{ gap: "16px", width: "100%" }}
          >
            <Flex css={{ width: "100%" }}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                    type="text"
                    placeholder="E-mail"
                    style={{ width: "100%" }}
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
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                    type="password"
                    placeholder="Senha"
                    style={{ width: "100%" }}
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
                Login
              </StyledButton>
            </Flex>
            <Flex css={{ width: "100%" }}>
              <StyledButton
                style={{ width: "100%" }}
                variant="contained"
                onClick={() => navigate("/signup")}
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

export default Login;
