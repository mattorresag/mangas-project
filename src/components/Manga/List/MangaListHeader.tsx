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
        maxHeight: "50vh",
        position: "relative",
        boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.75)",
        borderRadius: "8px",
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
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
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
      <Flex
        direction="column"
        css={{
          overflowY: "auto",
          overflowX: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
