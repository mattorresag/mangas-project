import React, { useState, useEffect } from "react";
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
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type IFormValues = InferType<typeof schema>;

const Signup = () => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);

  const { handleSubmit, control, formState: { errors } } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
      confirmEmail: ''
    }
  })

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(db, "users"), {
          uid: user.uid,
          name: data.name,
          authProvider: "local",
          email: data.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    if (user) navigate('/home')
  }, [user])

  return (
    <Flex align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%' }}>
      <Flex direction='column' align='center' css={{ gap: '32px' }}>
        <Typography variant='h2' color='#0092EE'>
          Mangas Project
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' align='center' css={{ gap: '16px' }}>
            <Flex>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Usuarío"
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                    {...field}
                  />
                )} />
            </Flex>
            <Flex>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="E-mail"
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                    {...field}
                  />
                )} />
            </Flex>
            <Flex>
              <Controller
                control={control}
                name='confirmEmail'
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Confirme o e-mail"
                    error={!!errors?.confirmEmail?.message}
                    helperText={errors?.confirmEmail?.message}
                    {...field}
                  />
                )} />
            </Flex>
            <Flex>
              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <TextField
                    type="password"
                    placeholder="Senha"
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                    {...field}
                  />
                )} />
            </Flex>
            <Flex css={{ width: '100%' }}>
              <Button style={{ width: '100%' }} variant='contained' type='submit'>Cadastrar-se</Button>
            </Flex>

          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Signup;