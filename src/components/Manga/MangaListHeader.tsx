import { Typography } from "@mui/material";
import React from "react";
import { Flex } from "../Flex";
interface Props {
  children: React.ReactNode;
  isCRUD?: boolean;
}
export const MangaListHeader = ({
  children,
  isCRUD = false,
}: Props): JSX.Element => {
  return (
    <Flex
      direction="column"
      css={{
        width: "60vw",
        gap: "16px",
        maxHeight: "50vh",
        overflow: "auto",
        position: "relative",
        padding: "0 16px 16px",
      }}
    >
      <Flex
        align="center"
        justify="between"
        css={{
          gap: "8px",
          width: "100%",
          padding: "16px",
          position: "sticky",
          top: "0",
          left: "0",
          background: "#3d5a80",
          zIndex: 10,
        }}
      >
        <Flex align="center" css={{ gap: "16px", width: "30%" }}>
          <Typography color="#202632">
            <strong>Capa</strong>
          </Typography>
          <Typography color="#202632">
            <strong>Nome do mangá</strong>
          </Typography>
        </Flex>
        {!isCRUD && (
          <Flex css={{ width: "20%" }}>
            <Typography color="#202632">
              <strong>Último capítulo lido</strong>
            </Typography>
          </Flex>
        )}
        <Flex css={{ width: "24%" }}>
          <Typography color="#202632">
            <strong>Número de capítulos</strong>
          </Typography>
        </Flex>
        <Flex css={{ width: "24%" }}>
          <Typography color="#202632">
            <strong>Status</strong>
          </Typography>
        </Flex>
        {isCRUD && (
          <Flex css={{ width: "7%" }}>
            <Typography>
              <strong>Adicionar</strong>
            </Typography>
          </Flex>
        )}
      </Flex>
      <Flex direction="column">{children}</Flex>
    </Flex>
  );
};
