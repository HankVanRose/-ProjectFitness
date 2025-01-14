import { Button, Card, Text, Badge } from '@chakra-ui/react';
import { memo, useState } from 'react';
import DayModal from './DayModal';
import { useAppSelector } from '@/store/hooks/hooks';

function AdedPlanCard({
  dayid,
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
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((store) => store.appSlice);

  const handleOpen = () => {
    if (!isAnyDayCompleted) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log('idid', dayid);
  // console.log(`planid`, planId);

  return (
    <>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        display={'flex'}
        width={700}
        opacity={isAnyDayCompleted ? 0.6 : 1}
        pointerEvents={isAnyDayCompleted ? 'none' : 'auto'}
      >
        <Card.Body gap="5" onClick={handleOpen}>
          <Text
            textStyle="2x2"
            fontWeight="medium"
            letterSpacing="tight"
            mt="3"
            textAlign={'center'}
          >
            ТРЕНИРОВОЧНЫЙ ДЕНЬ: {cardNumber}
          </Text>
          <Card.Description
            textAlign={'center'}
            style={{
              color: isAnyDayCompleted ? 'green' : 'red',
              fontWeight: 600,
            }}
          >
            {isAnyDayCompleted
              ? `ТЫ ЗАРАБОТАЛ: ${points} points`
              : `ТЫ ЗАРАБОТАЕШЬ: ${points} points`}
          </Card.Description>
        </Card.Body>
        <Card.Footer
          gap="5"
          display={'flex'}
          style={{ justifyContent: 'center' }}
        >
          <Button
            variant="solid"
            colorScheme="teal"
            size="sm"
            _hover={{
              bg: 'teal.600',
            }}
            _active={{ bg: 'teal.700' }}
            px={2}
            onClick={handleOpen}
            display={isAnyDayCompleted ? 'none' : 'block'} // скрываем кнопку
            mb={2}
          >
            ОТКРЫТЬ
          </Button>
          <Badge
            colorPalette="red"
            display={isAnyDayCompleted ? 'none' : 'block'}
            mb={2}
          >
            НЕ ЗАКОНЧЕНА
          </Badge>
          <Badge
            colorPalette="green"
            display={isAnyDayCompleted ? 'block' : 'none'}
            mb={2}
          >
            ЗАВЕРШЕНА
          </Badge>
        </Card.Footer>
      </Card.Root>

      <DayModal
        exercises={exercises}
        open={open}
        planId={planId}
        setOpen={handleClose}
        dayid={dayid}
        description={description}
        cardNumber={cardNumber}
        title={title}
        rounds={rounds}
        type={type}
        target={target}
        points={points}
        updatePlanCompletion={updatePlanCompletion}
      />
    </>
  );
}

export default memo(AdedPlanCard);
