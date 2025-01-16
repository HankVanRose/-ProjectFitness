import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './header/Header';
import { Flex, Box } from '@chakra-ui/react';

export default function Layout() {
  return (
    <Flex
      direction='column'
      minH='100vh'
    >
      <Box p={4}>
        <Header />
      </Box>
      <Box as='main' flex='1' p={4}>
        <Outlet />
      </Box>
      <Box as='footer' p={4}>
        <Footer />
      </Box>
    </Flex>
  );
}
