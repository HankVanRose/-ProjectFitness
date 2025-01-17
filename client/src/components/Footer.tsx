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
  Flex,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaTelegram } from 'react-icons/fa';
import { useColorMode } from './ui/color-mode';

export default function Footer() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Box
      as="footer"
      py={10}
      mt={5}
      bg={{ base: 'white', _dark: 'black' }}
      width="100%"
      position="relative"
      color="white"
    >
      <Container mx="auto">
        <SimpleGrid
          columns={{ base: 1, md: 4 }}
          gap={8}
          justifyContent="center"
          alignItems="start"
        >
          {/* Logo Column */}
          <VStack gap={4} height="100%" w={200}>
            <Image
              src={colorMode === 'dark' ? '/LogoDark.png' : '/LogoLight.png'}
              alt="Logo"
              h={120}
              objectFit="contain"
            />
          </VStack>

          {/* Pages Column */}
          <VStack align={{ base: 'center', md: 'start' }} gap={3} height="100%">
            <Heading
              as="h6"
              size="sm"
              color={{ base: 'black', _dark: 'white' }}
            >
              Страницы
            </Heading>
            <VStack
              align={{ base: 'center', md: 'start' }}
              gap={2}
              width="100%"
            >
              <Link
                as={RouterLink}
                to="/"
                color={{ base: 'black', _dark: 'white' }}
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Главная
              </Link>
              <Link
                as={RouterLink}
                to="/plans"
                color={{ base: 'black', _dark: 'white' }} // Added white color
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Планы тренировок
              </Link>
              <Link
                as={RouterLink}
                to="/account"
                color={{ base: 'black', _dark: 'white' }}
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                width="100%"
              >
                Личный кабинет
              </Link>
            </VStack>
          </VStack>

          {/* Contacts Column */}
          <VStack align={{ base: 'center', md: 'start' }} gap={3} height="100%">
            <Heading
              as="h6"
              size="sm"
              color={{ base: 'black', _dark: 'white' }}
            >
              Контакты
            </Heading>
            <Text
              textAlign={{ base: 'center', md: 'left' }}
              color={{ base: 'black', _dark: 'white' }}
            >
              Адрес: г. Москва, <br />
              ул. Орджоникидзе, д. 11 стр. 10 <br />
              (м. Ленинский проспект)
            </Text>
          </VStack>

          {/* Developers Column */}
          <VStack align={{ base: 'center', md: 'start' }} gap={3} height="100%">
            <Heading
              as="h6"
              size="sm"
              color={{ base: 'black', _dark: 'white' }}
            >
              Сайт разработан
            </Heading>
            <VStack
              align={{ base: 'center', md: 'start' }}
              gap={2}
              width="100%"
            >
              <Link
                as={RouterLink}
                to="https://t.me/HankvanRose"
                target="_blank"
                rel="noopener noreferrer"
                color={{ base: 'black', _dark: 'white' }}
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack gap={2}>
                  <FaTelegram />
                  <Text>Вячеслав Платонов</Text>
                </HStack>
              </Link>
              <Link
                as={RouterLink}
                to="https://t.me/zemfiravildanova"
                target="_blank"
                rel="noopener noreferrer"
                color={{ base: 'black', _dark: 'white' }}
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack gap={2}>
                  <FaTelegram />
                  <Text>Земфира Вильданова</Text>
                </HStack>
              </Link>
              <Link
                as={RouterLink}
                to="https://t.me/renthefirst"
                target="_blank"
                rel="noopener noreferrer"
                color={{ base: 'black', _dark: 'white' }}
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                display="block"
                width="100%"
              >
                <HStack gap={2}>
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
          <Text color={{ base: 'black', _dark: 'white' }}>
            &copy; {new Date().getFullYear()} BE FIT. Все права защищены.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
