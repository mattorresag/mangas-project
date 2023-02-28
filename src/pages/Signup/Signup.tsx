import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/auth";
import { Flex } from "../../components/Flex";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { schema } from "./schema";

type IFormValues = InferType<typeof schema>;

const Signup = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth();

  const { handleSubmit, control, formState: { errors } } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      username: '',
      email: '',
      confirmEmail: ''
    }
  })

  const submit = () => {
    console.log('teste')
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
        <form onSubmit={handleSubmit(submit)}>
          <Flex direction='column' align='center' css={{ gap: '16px' }}>
            <Flex>
              <Controller
                control={control}
                name='username'
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder="Usuário"
                    error={!!errors?.username?.message}
                    helperText={errors?.username?.message}
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
                    type="text"
                    placeholder="Senha"
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
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