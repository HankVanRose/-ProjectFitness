import axiosInstance from '../../axiosInstance';
import type { PlanType } from '@/types';
import { useEffect, useState } from 'react';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AdedPlanCard from './AdedPlanCard';
import { Button } from '@chakra-ui/react';
import { useAppSelector } from '@/store/hooks/hooks';

export default function AddedPlanList() {
  const { VITE_API } = import.meta.env;
  const [singlePlan, setSinglePlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
   const { user } = useAppSelector((store) => store.appSlice);

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
    return <div>Loading...</div>;
  }

  const updatePlanCompletion = (planId, dayId) => {
    setSinglePlan((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              UserDays: plan.UserDays.map((day) =>
                day.id === dayId ? { ...day, isCompleted: true } : day
              ),
            }
          : plan
      )
    );
  };

  return (
    <Container maxW="full" px={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} p={4}>
        {singlePlan.map((plan, index) => {
          const isAnyDayCompleted = plan.UserDays.some(
            (day) => day.isCompleted && day.userId === user?.id
          )
          

          return (
            <Box
              key={plan.id}
              p={4}
              borderRadius="md"
              bg={isAnyDayCompleted ? 'gray.300' : 'white'}
            >
              <AdedPlanCard
                id={plan.id}
                planId={plan.planId}
                points={plan.points}
                description={plan.description}
                title={plan.title}
                rounds={plan.rounds}
                type={plan.type}
                target={plan.target}
                cardNumber={index + 1}
                isAnyDayCompleted={isAnyDayCompleted}
                updatePlanCompletion={updatePlanCompletion}
     
                
              />
            </Box>
          );
        })}
      </SimpleGrid>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="solid">ЗАВЕРШИТЬ ПЛАН</Button>
      </Box>
    </Container>
  );
}
