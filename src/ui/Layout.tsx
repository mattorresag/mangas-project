import { Flex } from "../components/Flex";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div style={{ background: `#d8d5db`, width: '100%', height: '100vh' }}>
      <Flex direction='column' align='center' justify='center' css={{ width: '100%', height: '100%', gap: '32px' }}>
        {children}
      </Flex>
    </div>
  )
}