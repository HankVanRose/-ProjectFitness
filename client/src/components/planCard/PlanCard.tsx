import { memo, useCallback } from 'react';
import { PlanType } from '../../types';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function PlanCard({
  id,
  name,
  description,
  equipment,
  difficulty,
  image,
}: PlanType) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/plans/${id}`);
  }, [navigate, id]);

  return (
    <Box
      m="10px"
      h="100%"
      bgImage={`url(${image})`}
      bgColor="black"
      bgSize="cover"
      bgRepeat="no-repeat"
      borderRadius="md"
      overflow="hidden"
    >
      <Box
        p={4}
        backdropFilter="auto"
        backdropBlur="1px"
        brightness="0.7"
        color="white"
      >
        <VStack align="stretch" spacing={2}>
          <Text
            fontWeight="bold"
            cursor="pointer"
            onClick={handleNavigate}
            _hover={{ opacity: 0.8 }}
          >
            {name}
          </Text>
          
          <Text>
            Сложность: {difficulty}
          </Text>
          
          <Text>
            Необходимое снаряжение: {equipment}
          </Text>
          
          <Text>
            {description}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default memo(PlanCard);
