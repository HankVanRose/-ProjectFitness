import { PlanType } from '@/types';
import { Box, Button, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserPlanCard({ name, image }: PlanType) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const redirectToSession = (id) => {};

  return (
    <Box
      margin="10px"
      height="500px"
      width="100%"
      borderRadius="10px"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      backgroundColor="black"
    >
      {isLoading ? (
        <Box height="100%">
          <Skeleton height="80%" width="100%" borderRadius="10px" />
          <Skeleton
            height="40px"
            width="100%"
            marginTop="10px"
            borderRadius="5px"
          />
        </Box>
      ) : (
        <Box
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          height="100%"
        >
          <Box
            backdropFilter="blur(1px) brightness(0.7)"
            padding="20px"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            color="white"
          >
            <Text fontSize="40px">
              <b>{name}</b>
            </Text>
            <Box display="flex" flexDirection="column" marginTop="auto">
              <Button
                marginTop="10px"
                backgroundColor="green.500"
                _hover={{ bg: 'green.600' }}
                color={'white'}
              >
                ВЕРНУТЬСЯ К ТРЕНИРОВКАМ
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
