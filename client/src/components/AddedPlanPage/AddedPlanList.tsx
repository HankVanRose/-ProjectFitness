import axiosInstance from '../../axiosInstance';
import type { PlanType } from '@/types';
import { useEffect, useState } from 'react';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import AdedPlanCard from './AdedPlanCard';

export default function AddedPlanList() {
  const { VITE_API } = import.meta.env;
  const [singlePlan, setSinglePlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSinglePlan = async (id) => {
      try {
        const result = await axiosInstance.get(`${VITE_API}/days/${id}`);
        setSinglePlan(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchSinglePlan(id);
  }, [id]);

  // Проверяем, загружаются ли данные
  if (isLoading) {
    return <div>Loading...</div>;
  }
 

  return (
    <Container maxW="full" px={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} p={4}>
        {singlePlan.map((plan, index) => (
          <Box key={plan.id} p={4} borderRadius="md">
            <AdedPlanCard
              id={plan.id}
              planId={plan.planId}
              points={plan.points}
              quantityOfTrain={singlePlan.length}
              description={plan.description}
              cardNumber={index + 1}
              singlePlan={singlePlan}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
