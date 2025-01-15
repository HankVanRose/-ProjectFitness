import { Box, Grid } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { ExercisesType } from '@/types';

import ModalExercise from './ModalExercise';

type ExecriseHelpToModalProps = {
  exercises: ExercisesType;
  bgColor: string;
  bgImg: string;
};
export default function ExecriseHelpToModal({
  exercises,
  bgColor,
}: ExecriseHelpToModalProps) {
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box p={4} color={textColor}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {exercises.map((exercise) => (
          <Box key={exercise.id} p={4} borderRadius="md">
            <ModalExercise
              bg={bgColor}
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
