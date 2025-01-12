import { Button, Card, Image, Text } from '@chakra-ui/react';
import { Badge } from "@chakra-ui/react"

export default function AdedPlanCard({
  id,
  planId,
  points,
  quantityOfTrain,
  description,
  cardNumber,
  singlePlan
}) {

   
  return (
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
        {/* <Card.Title textAlign={'center'}>ТВОЙ ТРЕНИРОВОЧНЫЙ ДЕНЬ ВНУТРИ</Card.Title> */}
        <Card.Description textAlign={'center'} style={{color:'red'}}>
          ТЫ ЗАРАБОТАЕШЬ: {points} points
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="5" display={'flex'} style={{justifyContent:'center'}}>
        <Button variant="solid">ОТКРЫТЬ</Button>
        <Badge colorPalette="red">Removed</Badge>
        <Badge colorPalette="green">Success</Badge>
      </Card.Footer>
    </Card.Root>
  );
}
