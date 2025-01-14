import axiosInstance from '../../axiosInstance';
import type { PlanType } from '@/types';
import { useEffect, useState, useMemo } from 'react';
import { Box, Container, SimpleGrid, Button, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AdedPlanCard from './AdedPlanCard';
import { useAppSelector } from '@/store/hooks/hooks';
import { useColorModeValue } from '../ui/color-mode';

export default function AddedPlanList() {
  const { VITE_API } = import.meta.env;
  const [singlePlan, setSinglePlan] = useState<PlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAppSelector((store) => store.appSlice);
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    const fetchSinglePlan = async (id) => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get(`${VITE_API}/days/${id}`);
        setSinglePlan(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchSinglePlan(id);
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner />
      </div>
    );
  }

  console.log(singlePlan.map((el) => el.Exercises));

  const updatePlanCompletion = (planId: number, dayId: number) => {
    setSinglePlan((prevPlans) => {
      const updatedSHit = prevPlans.map((plan) => {
        console.log(`plan.id`, plan.id);
        console.log(`planIIIId`, planId);
        return plan.id === dayId
          ? {
              ...plan,
              UserDays: plan.UserDays.map((day) => {
                console.log(`dayID`, dayId);
                console.log(`dayTOCHKAID`, day.id);
                return day.id == planId ? { ...day, isCompleted: true } : day;
              }),
            }
          : plan;
      });

      return updatedSHit;
      // prevPlans.map((plan) =>
      //     plan.id === planId
      //       ? {
      //           ...plan,
      //           UserDays: plan.UserDays.map((day) =>
      //             day.id == dayId ? { ...day, isCompleted: true } : day
      //           ),
      //         }
      //       : plan
      //   )
    });
  };

  return (
    <Container maxW="full" px={4} py={8} bg={bgColor} color={textColor}>
      <SimpleGrid
        bg={bgColor}
        color={textColor}
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={2}
      >
        {singlePlan.map((plan, index) => {
          // console.log(plan.Exercises);
          const isAnyDayCompleted = plan.UserDays.some(
            (day) => day.isCompleted && day.userId === user?.id
          );

          return (
            <Box
             
              color={textColor}
              key={plan.id}
              p={2}
              borderRadius="3xl"
              bg={isAnyDayCompleted ? bgColor : bgColor}
              boxShadow="md"
              width={500}
              m={4}
              display={'flex'}
              justifyContent={'center'}
              _hover={{
                shadow: 'lg',
                transform: 'scale(1.02)',
                transition: '0.2s',
              }}
              borderWidth={isAnyDayCompleted ? '2px' : '2px'}
              borderColor={isAnyDayCompleted ? 'green.500' : bgColor}
            >
              <AdedPlanCard
                dayid={plan.id}
                planId={plan.planId}
                points={plan.points}
                description={plan.description}
                title={plan.title}
                rounds={plan.rounds}
                type={plan.type}
                target={plan.target}
                exercises={plan.Exercises}
                cardNumber={index + 1}
                isAnyDayCompleted={isAnyDayCompleted}
                updatePlanCompletion={updatePlanCompletion}
              />
            </Box>
          );
        })}
      </SimpleGrid>
      <Box
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <Button
          variant="solid"
          colorScheme="teal"
          size="lg"
          _hover={{
            bg: 'teal.600',
            transform: 'scale(1.05)',
            transition: '0.2s',
          }}
          _active={{ bg: 'teal.700' }}
          px={8}
        >
          ЗАВЕРШИТЬ ПЛАН
        </Button>
      </Box>
    </Container>
  );
}
