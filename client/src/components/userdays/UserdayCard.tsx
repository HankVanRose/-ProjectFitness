import { Card, Text, Badge } from '@chakra-ui/react';
import { memo, useState } from 'react';
import DayModal from './DayModal';
import { ExercisesType } from '@/types';

type UserdayCardProps = {
  dayId: number;
  planId: number;
  points: number;
  description: string;
  cardNumber: number;
  isAnyDayCompleted: boolean;
  title: string;
  rounds: number;
  type: string;
  target: string;
  updatePlanCompletion: (userDayId: number, dayId: number) => void;
  exercises: ExercisesType,
  calories: number;
};

function UserdayCard({
  dayId,
  planId,
  points,
  description,
  cardNumber,
  isAnyDayCompleted,
  title,
  rounds,
  type,
  target,
  updatePlanCompletion,
  exercises,
  calories
}: UserdayCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card.Root width={400} cursor="pointer">
        <Card.Body p={5} onClick={() => setOpen(true)}>
          <Text fontWeight="700" textAlign="center" fontSize="1.1 rem">
            ТРЕНИРОВОЧНЫЙ ДЕНЬ №{cardNumber}
          </Text>
          <Card.Description
          onClick={() => setOpen(true)}
            textAlign={'center'}
            fontSize="1rem"
            fontWeight="600"
            mt={2}
            color={`${isAnyDayCompleted ? 'green.400' : 'red.500'}`}
          >
            {isAnyDayCompleted
              ? `Вы заработали: ${points} очков`
              : `Вы заработаете: ${points} очков`}
          </Card.Description>
        </Card.Body>
        <Card.Footer
          gap="5"
          display='flex'
          justifyContent='center'

        >
          <Badge
          onClick={() => setOpen(true)}
            colorPalette={isAnyDayCompleted ? 'green' : 'red'}
            p={3}
            mb={2}
            fontWeight="600"
            fontSize="1rem"
          >
            {isAnyDayCompleted ? 'ЗАВЕРШЕН' : 'НЕ ЗАВЕРШЕН'}
          </Badge>
        </Card.Footer>
      </Card.Root>

      <DayModal
        open={open}
        planId={planId}
        setOpen={setOpen}
        dayId={dayId}
        description={description}
        cardNumber={cardNumber}
        title={title}
        rounds={rounds}
        type={type}
        target={target}
        points={points}
        updatePlanCompletion={updatePlanCompletion}
        isCompleted={isAnyDayCompleted}
        exercises={exercises}
        calories={calories}
      />
    </>
  );
}

export default memo(UserdayCard);
