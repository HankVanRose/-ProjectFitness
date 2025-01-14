import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  Stack,
  Button,
} from '@chakra-ui/react';
import { ExerciseType } from '../../types';

export default function SingleExercisePage() {
  const [singleExercise, setSingleExercise] = useState<ExerciseType>({});
  const { VITE_API } = import.meta.env;
  const { id } = useParams();
  const caloriesSymbol = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="red"
      className="bi bi-fire"
      viewBox="0 0 16 16"
    >
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
    </svg>
  );
  const navigate = useNavigate()

  const exp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="green"
      className="bi bi-exposure"
      viewBox="0 0 16 16"
    >
      <path d="M8.5 4a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0V7h2a.5.5 0 0 0 0-1h-2zm-3 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8" />
    </svg>
  );

  const redirectHandler = () => {
    navigate('/card')
  }

  useEffect(() => {
    const getSingleExercise = async (id: number) => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/exercise/${id}`);
        setSingleExercise(res.data);
      } catch (error) {
        console.error(error, 'Ошибка загрузки упражнения');
      }
    };
    getSingleExercise(id);
  }, [id]);

  return (
    <Box
    color={{ base: 'black', _dark: 'white' }}
      padding="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxW="container.lg">
        <VStack spacing={10} align="stretch">
          <Heading textAlign="center" fontSize="2.5rem" fontWeight="bold">
            BE FIT УПРАЖНЕНИЕ: {singleExercise.name?.toUpperCase()}
          </Heading>
          <Image
            src={singleExercise.image}
            alt={singleExercise.name?.toUpperCase()}
            borderRadius="md"
            maxHeight="768px"
            objectFit="cover"
          />
          <Stack spacing={4} textAlign="justify" marginX="100px" marginY="15px">
            <Heading fontSize="2rem">
              ЧТО ТАКОЕ: {singleExercise.name?.toUpperCase()}?
            </Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {singleExercise.shortDescription}
            </Text>
            <Heading fontSize="2rem">
              ЕЩЕ НЕМНОГО О: {singleExercise.name?.toUpperCase()}?
            </Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {singleExercise.longDescription}
            </Text>
            <Heading fontSize="2rem">ОСНОВНЫЕ ГРУППЫ МЫШЦ</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {singleExercise.longMuscleGroup}
            </Text>
            <Image
              src={singleExercise.muscleImage}
              alt={singleExercise.name?.toUpperCase()}
              borderRadius="md"
              maxHeight="768px"
              objectFit="cover"
            />
            <Heading fontSize="2rem">НЕОБХОДИМОЕ ОБОРУДОВАНИЕ:</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {singleExercise.equipment?.toUpperCase()}
            </Text>

            <Heading fontSize="2rem">
              КОЛИЧЕСТВО КАЛЛОРИЙ СЖИГАЕМЫХ ЗА ДЕЙСТВИЕ:
            </Heading>
            <div
              style={{
                display: 'flex',
                alignItems: 'stretch',
                alignContent: 'center',
              }}
            >
              {caloriesSymbol}
              <Text
                fontSize="1.3rem"
                lineHeight="1.6"
                textAlign="justify"
                marginRight="0.25rem"
                marginLeft="0.5rem"
                fontWeight={700}
              >
                {singleExercise.calories} кКал.
              </Text>
            </div>

            <Heading fontSize="2rem">
              КОЛИЧЕСТВО БАЛЛОВ ЗА ВЫПОЛНЕННОЕ ДЕЙСТВИЕ:
            </Heading>
            <div
              style={{
                display: 'flex',
                alignItems: 'stretch',
                alignContent: 'center',
              }}
            >
              {exp}
              <Text
                fontSize="1.3rem"
                lineHeight="1.6"
                textAlign="justify"
                marginRight="0.25rem"
                fontWeight={700}
                marginLeft="0.5rem"
              >
                {singleExercise.points} pts.
              </Text>
            </div>

            <Button
             color={{ base: 'white', _dark: 'white' }}
              marginY={20}
              variant="outline"
              backgroundColor="green.700"
              borderColor="green.700"
              borderRadius={10}
              height={50}
              onClick={redirectHandler}
            >
              {caloriesSymbol} СДЕЛАЙ СВОЙ ПЕРВЫЙ{' '}
              {singleExercise.name?.toUpperCase()} СЕЙЧАС
            </Button>

             
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
