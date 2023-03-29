import { Typography } from "@mui/material";
import React from "react";
import createBreakpoint from "../../../hooks/useWindowSize";
import { Flex } from "../../Flex";
interface Props {
  children: React.ReactNode;
  isCRUD?: boolean;
}

const useBreakpoint = createBreakpoint();
export const MangaListHeader = ({
  children,
  isCRUD = false,
}: Props): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = ["xs", "xxs"].includes(breakpoint);

  return (
    <Flex
      direction="column"
      css={{
        width: "90vw",
        gap: "16px",
        maxHeight: "50vh",
        overflowY: "auto",
        overflowX: "hidden",
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
          background: "rgb(61, 90, 128)",
          zIndex: 10,
        }}
      >
        <Flex align="center" css={{ gap: "16px", width: "30%" }}>
          <Typography variant={isMobile ? "caption" : "body1"} color="#202632">
            <strong>Mangá</strong>
          </Typography>
        </Flex>
        {!isCRUD && (
          <Flex css={{ width: "25%", gap: "16px" }}>
            <Typography
              variant={isMobile ? "caption" : "body1"}
              color="#202632"
            >
              <strong>{isMobile ? "Últ cap" : "Último capítulo lido"}</strong>
            </Typography>
          </Flex>
        )}
        <Flex css={{ width: "25%" }}>
          <Typography variant={isMobile ? "caption" : "body1"} color="#202632">
            <strong>{isMobile ? "Nº Cap" : "Número de capítulos"}</strong>
          </Typography>
        </Flex>
        <Flex css={{ width: "25%" }}>
          <Typography variant={isMobile ? "caption" : "body1"} color="#202632">
            <strong>Status</strong>
          </Typography>
        </Flex>
        <Flex css={{ width: "14%" }} justify="end">
          <Flex css={{ width: "50%" }}>
            <Typography variant={isMobile ? "caption" : "body1"}>
              <strong>{isCRUD ? "Add" : ""}</strong>
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column">{children}</Flex>
    </Flex>
  );
};
