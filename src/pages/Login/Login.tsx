import React, { useState, useEffect } from "react";
import { Flex } from "../../components/Flex";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { schema } from "./schema";
import { SubmitHandler } from "react-hook-form/dist/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseUtils";
import { useAuthState } from "react-firebase-hooks/auth";

type IFormValues = InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  const { handleSubmit, control } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      email: ''
    }
  })

  const submit: SubmitHandler<IFormValues> = (data) => {
    if (data) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          navigate('/home')
        })
    }
  }

  return (
    <Flex align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%' }}>
      <Flex direction='column' align='center' css={{ gap: '32px' }}>
        <Typography variant='h2' color='#0092EE'>
          Mangas Project
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Flex direction='column' align='center' css={{ gap: '16px' }}>
            <Flex>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="E-mail"
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
                    {...field}
                  />
                )} />
            </Flex>
            <Flex css={{ width: '100%' }}>
              <Button style={{ width: '100%' }} variant='contained' type='submit'>Login</Button>
            </Flex>
            <Flex css={{ width: '100%' }}>
              <Button style={{ width: '100%' }} variant='contained' onClick={() => navigate('/signup')}>Cadastrar-se</Button>
            </Flex>

          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;