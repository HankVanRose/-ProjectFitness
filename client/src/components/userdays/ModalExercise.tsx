import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';

type ModalExerciseProps = {
  image: string;
  id: number;
  name: string;
};

export default function ModalExercise({ image, id, name }: ModalExerciseProps) {
  const navigate = useNavigate();
  const redirectToExercise = (id: number) => {
    navigate(`/exercises/${id}`);
    console.log(id);
  };

  //   const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');
  return (
    <Box
      overflow="hidden"
      style={{ scrollbarColor: ' #e5ff00', scrollbarWidth: 'thin' }}
    >
      <Image
        width={400}
        height={400}
        src={image}
        alt={name}
        onClick={() => redirectToExercise(id)}
      />
      <Text
        p={2}
        fontWeight="bold"
        color={textColor}
        onClick={() => redirectToExercise(id)}
      >
        {name}
      </Text>
    </Box>
  );
}
