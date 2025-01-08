import { memo, useCallback, useEffect, useState } from 'react';
import { PlanType } from '../../types';
import { Box, Stack, Text, Image, Skeleton, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function PlanCard({ id, name, image }: PlanType) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

   
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

   
  const handleNavigate = useCallback(() => {
    navigate(`/plans/${id}`);
  }, [navigate, id]);

  return (
    <Box
      onClick={handleNavigate}
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
                onClick={handleNavigate}
              >
                ПОДРОБНЕЕ
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default memo(PlanCard);
