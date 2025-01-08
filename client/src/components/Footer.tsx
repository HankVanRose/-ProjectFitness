import { 
  Box, 
  Container, 
  SimpleGrid, 
  Image, 
  Heading, 
  Text, 
  Link, 
  VStack, 
  HStack, 
  Flex 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box
      as="footer"
      py={10}
      mt={5}
      bg="black" // Changed to black background
      width="100%"
      position="relative"
      color="white" // Added white text color for all content
    >
      <Container maxW="container.xl">
        <SimpleGrid 
          columns={{ base: 1, md: 4 }} 
          spacing={8}
          justifyContent="center"
          alignItems="start"
        >
          {/* Logo Column */}
          <VStack spacing={4} height="100%">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              h={120} 
              objectFit="contain"
            />
          </VStack>

          {/* Pages Column */}
          <VStack 
            align={{ base: 'center', md: 'start' }} 
            spacing={3}
            height="100%"
          >
            <Heading as="h6" size="sm" color="white">
              Страницы
            </Heading>
            <VStack 
              align={{ base: 'center', md: 'start' }} 
              spacing={2}
              width="100%"
            >
              <Link
                as={RouterLink}
                to="/"
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Главная
              </Link>
              <Link
                as={RouterLink}
                to="/"
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Планы тренировок
              </Link>
              <Link
                as={RouterLink}
                to="/"
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Личный кабинет
              </Link>
            </VStack>
          </VStack>

          {/* Contacts Column */}
          <VStack 
            align={{ base: 'center', md: 'start' }} 
            spacing={3}
            height="100%"
          >
            <Heading as="h6" size="sm" color="white">
              Контакты
            </Heading>
            <Text textAlign={{ base: 'center', md: 'left' }}>
              Адрес: г. Москва, <br />
              ул. Орджоникидзе, д. 11 стр. 10 <br />
              (м. Ленинский проспект)
            </Text>
          </VStack>

          {/* Developers Column */}
          <VStack 
            align={{ base: 'center', md: 'start' }} 
            spacing={3}
            height="100%"
          >
            <Heading as="h6" size="sm" color="white">
              Сайт разработан
            </Heading>
            <VStack 
              align={{ base: 'center', md: 'start' }} 
              spacing={2}
              width="100%"
            >
              <Link
                href="https://t.me/HankvanRose"
                isExternal
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack spacing={2}>
                  <FaTelegram />
                  <Text>Вячеслав Платонов</Text>
                </HStack>
              </Link>
              <Link
                href="https://t.me/zemfiravildanova"
                isExternal
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack spacing={2}>
                  <FaTelegram />
                  <Text>Земфира Вильданова</Text>
                </HStack>
              </Link>
              <Link
                href="https://t.me/renthefirst"
                isExternal
                color="white" // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack spacing={2}>
                  <FaTelegram />
                  <Text>Ренат Кабаков</Text>
                </HStack>
              </Link>
            </VStack>
          </VStack>
        </SimpleGrid>

        {/* Copyright */}
        <Flex 
          justify="center" 
          mt={8} 
          borderTop="1px" 
          borderColor="whiteAlpha.300" // Changed border color to be visible on black
          pt={4}
        >
          <Text>
            &copy; {new Date().getFullYear()} BE FIT. Все права защищены.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
