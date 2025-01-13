import { Button, Card, Text, Badge } from '@chakra-ui/react';
import { memo, useState } from 'react';
import DayModal from './DayModal';
import { useAppSelector } from '@/store/hooks/hooks';

function AdedPlanCard({
  id,
  planId,
  points,
  description,
  cardNumber,
  
  isAnyDayCompleted,
  title,
  rounds,
  type,
  target,
  updatePlanCompletion
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((store) => store.appSlice);

  const handleOpen = () => {
    setOpen(true);
    console.log(`day`, id);
    console.log(`План`, planId);
    console.log(`userId`, user?.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card.Root maxW="sm" overflow="hidden">
        <Card.Body gap="2">
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
            style={{ color: 'red', fontWeight: 600 }}
          >
            ТЫ ЗАРАБОТАЕШЬ: {points} points
          </Card.Description>
        </Card.Body>
        <Card.Footer
          gap="5"
          display={'flex'}
          style={{ justifyContent: 'center' }}
        >
          <Button
            variant="solid"
            onClick={handleOpen}
            display={isAnyDayCompleted ? 'none' : 'block'}
          >
            ОТКРЫТЬ
          </Button>
          <Badge
            colorPalette="red"
            display={isAnyDayCompleted ? 'none' : 'block'}
          >
            НЕ ЗАКОНЧЕНА
          </Badge>
          <Badge
            colorPalette="green"
            display={isAnyDayCompleted ? 'block' : 'none'}
          >
            ЗАВЕРШЕНА
          </Badge>
        </Card.Footer>
      </Card.Root>

      <DayModal
        open={open}
         
        setOpen={handleClose}
        id={id}
        description={description}
        cardNumber={cardNumber}
        title={title}
        rounds={rounds}
        type={type}
        target={target}
        updatePlanCompletion={updatePlanCompletion}
      />
    </>
  );
}

export default memo(AdedPlanCard);
