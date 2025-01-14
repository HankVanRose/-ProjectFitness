import { Box, Text, Button, Skeleton } from '@chakra-ui/react';
import { ExerciseType } from '../../types';
import { useNavigate } from 'react-router-dom';
import './ExerciseCard.css';
import { useState, useEffect, memo } from 'react';

 function ExerciseCard({ image, id, name }: ExerciseType) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    navigate(`/exercises/${id}`);
  };

  return (
    <Box
      className="Card1"
      onClick={handleNavigate}
      border="none"
      margin="10px"
      cursor="pointer"
      position="relative"
      height="500px"
      borderRadius="10px"
      overflow="hidden"
    >
      {isLoading ? (
        <Box height="100%">
          <Skeleton height="80%" width="100%" borderRadius="10px" />
          <Skeleton
            height="40px"
            width="80%"
            marginTop="10px"
            borderRadius="5px"
          />
        </Box>
      ) : (
        <Box
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          height="100%"
        >
          <Box
            className="text-white"
            backdropFilter="blur(1px) brightness(0.7)"
            padding="20px"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Text fontSize="40px" color="white">
              <b>{name.slice(0, 22)}...</b>
            </Text>

            <Box display="flex" flexDirection="column" marginTop="auto">
             

              <Button
                marginTop="10px"
                backgroundColor="green.500"
                borderColor="green.500"
                onClick={handleNavigate}
                color={'white'}
                fontWeight={600}
              >
                ОПИСАНИЕ УПРАЖНЕНИЯ
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default memo(ExerciseCard)