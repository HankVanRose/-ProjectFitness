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
  Grid,
  Separator,
} from '@chakra-ui/react';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useAppSelector } from '@/store/hooks/hooks';
import { Blockquote } from '../ui/blockquote';

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
        navigate(`/plans/${id}/days`);
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
        console.log(response.data);
        setPlan(response.data);

        const sessionResponse = await axiosInstance.get(
          `${VITE_API}/session/${id}/user/${user?.id}`
        );

        // const existingPlan = sessionResponse.data.find(
        //   (session) => session.planId === response.data.id
        // );
        // console.log(existingPlan);
        // console.log(sessionResponse.data);
        if (sessionResponse.data.plan) {
          setPlanExists(true);
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPlan();
  }, [id, user?.id]);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!plan) {
    return <div>Plan not found</div>;
  }
  console.log(plan.shortDescription);

  return (
    <Box color={{ base: 'white', _dark: 'white' }}>
      <Toaster />
      <Box position="relative" width="100%">
        <Box
          position="relative"
          bgImage={`url(${plan.image})`}
          bgSize="cover"
          bgAttachment="fixed"
        >
          <Box backdropFilter="blur(3px) brightness(40%) contrast(101%)" p={6}>
            {/* Main Grid Container */}
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap={8}
              mt={{ base: 4, md: 6 }}
            >
              {/* Left Column - Image and Details */}
              <VStack align="stretch">
                <Heading
                  fontSize="3rem"
                  fontWeight="bold"
                  color="white"
                  mb={4}
                  textAlign="center"
                  letterSpacing="0.05em"

                >
                  {plan.name?.toUpperCase()}
                </Heading>

                <Image
                  src={plan.image}
                  alt={plan.name}
                  borderRadius="20px 20px 0px 0px"
                  maxW="100%"
                  h="auto"
                  filter="brightness(80%) contrast(95%)"
                  mb={4}
                />

                <Button
                  variant="outline"
                  bg="rgba(229, 62, 62, 0.8)"
                  color="white"
                  borderColor="red.700"
                  borderRadius="0px 0px 20px 20px"
                  height={10}
                  w="100%"
                  _hover={{
                    bg: 'red.600',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 20px rgba(229, 62, 62, 0.6)',
                  }}
                  transition="all 0.3s ease"
                  onClick={
                    planExists
                      ? () => navigate(`/plans/${id}/days`)
                      : addPlanHandler
                  }
                >
                  {planExists ? 'ПЕРЕЙТИ НА МОЙ ПЛАН' : '+ ДОБАВИТЬ В МОЙ ПЛАН'}
                </Button>

                <Text
                  textAlign="center"
                  mt={5}
                  fontWeight="600"
                  fontStyle="italic"
                >
                  {plan.slogan?.toUpperCase()}
                </Text>
              </VStack>

              {/* Right Column - Descriptions */}
              <VStack mt={10} align="stretch" pl={{ base: 0, md: 4 }}>
                <Text fontWeight="600" fontSize="1.2rem">
                  Уровень сложности: {plan.difficulty?.toUpperCase()}
                </Text>

                <Text fontWeight="600" mt={2} fontSize="1.2rem">
                  Необходимое оборудование: {plan.equipment?.toUpperCase()}
                </Text>

                <Text fontWeight="600" mt={2} fontSize="1.2rem">
                  Общее количество тренировочных дней: {plan.numOfTrainings}
                </Text>

                <Blockquote fontWeight="500" mt={4} fontSize="1.2rem">
                  {plan.shortDescription}
                </Blockquote>

                <Blockquote colorPalette='red' fontSize="1.1rem" mt={4} fontWeight="500" lineHeight="1.3">
                  {plan.longDescription}
                </Blockquote>
              </VStack>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
