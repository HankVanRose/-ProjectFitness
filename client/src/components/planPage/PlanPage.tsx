import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { PlanType } from '../../types';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  Stack,
  Button,
  Spinner,
} from '@chakra-ui/react';

export default function PlanPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanType | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/plans/${id}`
        );
        setPlan(response.data);
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!plan) {
    return <div>Plan not found</div>;
  }

  return (
    <Box
      backgroundColor="#f9f9f9"
      padding="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxW="container.lg" className="py-5">
        <VStack spacing={10} align="stretch">
          <Heading textAlign="center" fontSize="2.5rem" fontWeight="bold">
            ПЛАН ТРЕНИРОВОК: {plan.name?.toUpperCase()}
          </Heading>
          <Image
            src={plan.image}
            alt={plan.name?.toUpperCase()}
            borderRadius="md"
            maxHeight="768px"
            objectFit="cover"
            alignSelf="center"
          />

          <Stack spacing={4} textAlign="justify" marginX="100px" marginY="15px">
            <Heading fontSize="2rem">Уровень сложности:</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {plan.difficulty}
            </Text>
            <Heading fontSize="2rem">Необходимое оборудование:</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {plan.equipment?.toUpperCase()}
            </Text>
            <Heading fontSize="2rem">Описание:</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {plan.shortDescription}
            </Text>
            <Heading fontSize="2rem">
              Продолжительность в неделях: {plan.weeksDuration}
            </Heading>
            <Heading fontSize="2rem">
              Общее количество тренировочных дней: {plan.numOfSessions}
            </Heading>
            <Heading fontSize="2rem">Подробнее о {plan.name}</Heading>
            <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
              {plan.longDescription}
            </Text>
            <Heading fontSize="1.5rem" textAlign="center">{plan.slogan?.toUpperCase()}</Heading>
          </Stack>

          <Button
            variant="outline"
            backgroundColor="red.700"
            borderColor="red.700"
            borderRadius={10}
            height={50}
            w="100%"
          >
            + ДОБАВИТЬ В МОЙ ПЛАН
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
