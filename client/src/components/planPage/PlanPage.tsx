import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { PlanType, SessionType } from '../../types';
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
import { Toaster, toaster } from '@/components/ui/toaster';
import { useAppSelector } from '@/store/hooks/hooks';

export default function PlanPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [planExists, setPlanExists] = useState<boolean>(false);
  const navigate = useNavigate();
  const { VITE_API } = import.meta.env;
  const { user } = useAppSelector((store) => store.appSlice);

  const addPlanHandler = async (e): Promise<void> => {
    e.preventDefault();
    try {
      await axiosInstance.post<SessionType>(`${VITE_API}/session`, {
        userId: user?.id,
        planId: plan?.id,
      });

      toaster.create({
        title: 'План добавлен.',
        description: 'Ваш план был успешно добавлен!',
        type: 'success',
        duration: 5000,
      });
      setTimeout(function () {
        navigate(`/plans/${id}/yourown`);
      }, 2000);
    } catch (error) {
      console.log(error);
      toaster.create({
        title: 'Ошибка.',
        description:
          'Произошла ошибка при добавлении плана. Пожалуйста, попробуйте еще раз.',
        type: 'warning',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/plans/${id}`
        );
        setPlan(response.data);

        const sessionResponse = await axiosInstance.get<SessionType[]>(
          `${VITE_API}/session`,
          {
            params: { userId: user?.id },
          }
        );

        const existingPlan = sessionResponse.data.find(
          (session) => session.planId === response.data.id
        );

        setPlanExists(!!existingPlan);
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id, user?.id, VITE_API]);

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
    <>
      <Box
        color={{ base: 'black', _dark: 'white' }}
        padding="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Toaster />
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

            <Stack
              spacing={4}
              textAlign="justify"
              marginX="100px"
              marginY="15px"
            >
              <Heading fontSize="2rem">Уровень сложности:</Heading>
              <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
                {plan.difficulty?.toUpperCase()}
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
                Общее количество тренировочных дней: {plan.numOfTrainings}
              </Heading>
              <Heading fontSize="2rem">Подробнее о: {plan.name}</Heading>
              <Text fontSize="1.3rem" lineHeight="1.6" textAlign="justify">
                {plan.longDescription}
              </Text>
              <Heading fontSize="1.5rem" textAlign="center">
                {plan.slogan?.toUpperCase()}
              </Heading>
            </Stack>

            <Button
              variant="outline"
              backgroundColor="red.700"
              borderColor="red.700"
              borderRadius={10}
              height={50}
              w="100%"
              onClick={
                planExists
                  ? () => navigate(`/plans/${id}/yourown`)
                  : addPlanHandler
              }
            >
              {planExists ? 'ПЕРЕЙТИ НА МОЙ ПЛАН' : '+ ДОБАВИТЬ В МОЙ ПЛАН'}
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
