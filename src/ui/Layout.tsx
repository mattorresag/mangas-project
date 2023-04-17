import { Flex } from "../components/Flex";
import createBreakpoint from "../hooks/useWindowSize";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        css={{
          width: "100%",
          height: "100%",
          gap: "32px",
          padding: "16px",
        }}
      >
        {children}
      </Flex>
    </div>
  );
};
