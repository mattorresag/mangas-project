import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { Flex } from "./Flex";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
  });
  const { user, setUser } = useAuth();

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify(input));
    setUser(input);
    navigate('/home')
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (user) navigate('/home')
  }, [user])

  return (
    <Flex align='center' justify='center' css={{ width: '100vw', height: 'calc(100vh - 16px)', maxWidth: '100%' }}>
      <Flex direction='column' css={{ gap: '16px' }}>
        <Flex>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setInput({ name: e.target.value })}
          />
        </Flex>
        <Flex justify='between'>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;