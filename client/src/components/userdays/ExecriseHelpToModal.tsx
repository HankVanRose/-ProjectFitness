import { Box, Text, Image, Grid } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { ExercisesType } from '@/types';

type ExecriseHelpToModalProps = {
  exercises: ExercisesType;
};
export default function ExecriseHelpToModal({
  exercises,
}: ExecriseHelpToModalProps) {
  console.log(exercises.map((el) => el.image));

  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box p={4} bg={bgColor} color={textColor}>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {exercises.map((exercise, index) => (
          <Box
            key={index}
            overflow="hidden"
            style={{ scrollbarColor: ' #e5ff00', scrollbarWidth: 'thin' }}
          >
            <Image src={exercise.image} alt={exercise.name} />
            <Text p={2} fontWeight="bold" color={textColor}>
              {exercise.name}
            </Text>
            <Text p={2} color={textColor}>
              {exercise.description}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
