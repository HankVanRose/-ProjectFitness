import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';

type ModalExerciseProps = {
  image: string;
  id: number;
  name: string;
  bg: string;
};

export default function ModalExercise({
  image,
  id,
  name,
  bg,
}: ModalExerciseProps) {
  const navigate = useNavigate();
  const redirectToExercise = (id: number) => {
    navigate(`/exercises/${id}`);
    console.log(id);
  };

  return (
    <Box overflow="hidden" borderRadius="20px" maxW="400px">
      <Image
        bg={bg}
        height="300px" // Fixed height
        w="400px" // Maximum width
        src={image}
        alt={name}
        filter="brightness(0.8) contrast(0.9)"
        transition='all 0.4s'
        _hover={{
          cursor: 'pointer',
          filter: 'brightness(0.6)',
        }}
        borderRadius="20px"
        onClick={() => redirectToExercise(id)}
        objectFit="cover"
        objectPosition="center"
        margin="0 auto"
      />
      <Text
        textAlign="center"
        p={2}
        fontWeight="bold"
        onClick={() => redirectToExercise(id)}
      >
        {name}
      </Text>
    </Box>
  );
}
