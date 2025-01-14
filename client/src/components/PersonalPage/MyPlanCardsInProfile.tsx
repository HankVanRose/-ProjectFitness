import { useAppSelector } from '@/store/hooks/hooks';
import { SessionType } from '@/types';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface MyPlanCardsInProfileProps {
    plan: SessionType,
    removePlanHandler: () => void
}

export default function MyPlanCardsInProfile({plan, removePlanHandler}: MyPlanCardsInProfileProps) {
  const navigate = useNavigate();
  
    return (
    <Box key={plan.planId} p={4} borderWidth='1px' borderRadius='md' w='full'>
      <Text fontWeight='bold'>
        Название плана: {plan.Plan?.name || 'Не указано'}
      </Text>
      <Text>Статус: {plan.isCompleted ? 'Завершен' : 'В процессе'}</Text>
      {plan.Plan?.image && (
        <Image
          src={plan.Plan.image}
          alt={plan.Plan.name || 'План'}
          maxW='100%'
          borderRadius='8px'
        />
      )}
      <Button
        minW='10ch'
        variant='surface'
        colorPalette='green'
        borderRadius='sm'
        onClick={() => navigate(`/plans/${plan.planId}/days`)}
        className='mt-3'
        mt={4}
        mr={4}
      >
        Открыть
      </Button>
      <Button
        minW='10ch'
        variant='surface'
        colorPalette='red'
        borderRadius='sm'
        onClick={removePlanHandler}
        className='mt-3'
        mt={4}
      >
        Удалить
      </Button>
    </Box>
  );
}
