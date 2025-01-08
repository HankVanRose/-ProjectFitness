import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { SimpleGrid, Box, Spinner, Text, Container } from '@chakra-ui/react';
import ExerciseCard from './ExerciseCard';

export default function AllExercisesPage() {
  const { VITE_API } = import.meta.env;

  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const allExercises = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/exercise`);
        setExercises(res.data);
      } catch (error) {
        setError('Ошибка при загрузке упражнений');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    allExercises();
  }, [VITE_API]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
        <Text ml={4}>Загрузка упражнений...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} color="red.500">
        {error}
      </Box>
    );
  }

  return (
    <Container maxW="full" px={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} p={4}>
        {exercises.map((exercise) => (
          <Box key={exercise.id} p={4}   borderRadius="md">
            <ExerciseCard
              image={exercise.image}
              id={exercise.id}
              name={exercise.name}
              shortDescription={exercise.shortDescription}
              equipment={exercise.equipment}
              shortMuscleGroup={exercise.shortMuscleGroup}
              type={exercise.type}
              points={exercise.points}
              calories={exercise.calories}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
