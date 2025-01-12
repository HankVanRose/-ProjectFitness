import { Button, Card, Text, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import DayModal from './DayModal';

export default function AdedPlanCard({
  id,
  planId,
  points,
  description,
  cardNumber,
  singlePlan,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
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
          <Button variant="solid" onClick={handleOpen}>
            ОТКРЫТЬ
          </Button>
          <Badge colorPalette="red">НЕ ЗАКОНЧЕНА</Badge>
          <Badge colorPalette="green">ЗАВЕРШЕНА</Badge>
        </Card.Footer>
      </Card.Root>
      <DayModal
        open={open}
        singlePlan={singlePlan}
        setOpen={handleClose}
        id={id}
        description={description}
        cardNumber={cardNumber}
      />
    </>
  );
}
