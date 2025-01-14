import { Box, Grid } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { ExercisesType } from '@/types';

import ModalExercise from './ModalExercise';

type ExecriseHelpToModalProps = {
  exercises: ExercisesType;
};
export default function ExecriseHelpToModal({
  exercises,
}: ExecriseHelpToModalProps) {
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box p={4} bg={bgColor} color={textColor}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {exercises.map((exercise) => (
          <Box key={exercise.id} p={4} borderRadius="md">
            <ModalExercise
              image={exercise.image}
              id={exercise.id}
              name={exercise.name}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
