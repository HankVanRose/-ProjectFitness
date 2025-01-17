// HomePage.tsx
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';
import newVid from '/videos/newvid.mp4';
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function NewMainPage() {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, purple.500)',
    'linear(to-r, blue.600, purple.700)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <Box>
      {/* Hero Section */}
      <Box position="relative" height="100vh" overflow="hidden">
        {/* Video Background */}
        <Box position="absolute" top={0} left={0} width="100%" height="100%">
          <video
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6)',
            }}
          >
            <source src={'/videos/newvid.mp4'} type="video/mp4" />
          </video>
        </Box>

        {/* Hero Content */}
        <Container maxW="container.xl" height="100%" position="relative">
          <Flex height="100%" alignItems="center" justifyContent="flex-start">
            <Stack maxW="lg">
              <MotionHeading
                fontSize={{ base: '4xl', md: '7xl' }}
                fontWeight="900"
                color="white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                BE FIT
              </MotionHeading>
              <Text
                fontWeight="800"
                fontSize={{ base: 'xl', md: '2xl' }}
                color="yellow.300"
                fontStyle="italic"
                mt={4}
              >
                Измени Свою Жизнь Сегодня
              </Text>
              <MotionText
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.100"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Индивидуальные фитнес программы, адаптированные под твои цели.
                Присоединяйтесь к тысячам людей по всей планете! Не пропусти
                свою жизнь сегодня.
              </MotionText>

              {/* <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  as={RouterLink}
                  //   to="/plans"
                  size="lg"
                  colorScheme="blue"
                  mt={2}
                  px={8}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Начать Трансформацию!
                </Button>
              </MotionBox> */}
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <Stack>
            <Stack textAlign="center">
              <Heading>Почему выбрать BE FIT?</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                Мы предлагаем больше, чем просто планы тренировок. Мы предлагаем
                изменение образа жизни.
              </Text>
            </Stack>

            <Flex flexWrap="wrap" justify="center" gap={8} mt={5}>
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  flex="1"
                  minW={{ base: '100%', md: '300px' }}
                  maxW={{ base: '100%', md: '400px' }}
                  p={8}
                  borderRadius="lg"
                  bg={bg}
                  boxShadow="xl"
                  _hover={{
                    transform: 'translateY(-5px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box fontSize="4xl" mb={4}>
                    {feature.icon}
                  </Box>
                  <Heading size="md" mb={4}>
                    {feature.title}
                  </Heading>
                  <Text color={textColor}>{feature.description}</Text>
                </MotionBox>
              ))}
            </Flex>
          </Stack>
        </Container>
      </Box>

   
    </Box>
  );
}

const features = [
  {
    title: 'Индивидуальные фитнес программы',
    description:
      'Индивидуальные планы тренировок, соответствующие вашему уровню физической подготовки и целям.',
    icon: '🎯',
  },
  {
    title: 'Экспертное руководство',
    description:
      'Все наши планы тренировок разрабатывают и курируют профессиональные тренеры.',
    icon: '💪',
  },
  {
    title: 'Отслеживание прогресс',
    description:
      'Отслеживайте свои улучшения с помощью подробного отслеживания прогресса и системы планирования тренировок.',
    icon: '📈',
  },
];
