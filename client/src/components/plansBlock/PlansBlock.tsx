import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import PlanCard from '../planCard/PlanCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

export default function PlansBlock() {
  const { VITE_API } = import.meta.env;

  const [plans, setPlans] = useState([]);

   
  
  useEffect(() => {
    const allPlans = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/plans`);
        setPlans(res.data);
      } catch (error) {
        console.error(error, 'Ошибка');
      }
    };
    allPlans();
  }, []);

  return (
    <Container maxW="full" px={4}>
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={6}
        py={8}
      >
        {plans.map((plan) => (
          <Box key={plan.id}>
            <PlanCard
              image={plan.image}
              id={plan.id}
              name={plan.name}
              shortDescription={plan.shortDescription}
              equipment={plan.equipment}
              difficulty={plan.difficulty}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
