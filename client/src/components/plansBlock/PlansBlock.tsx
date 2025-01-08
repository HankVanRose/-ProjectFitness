import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import PlanCard from '../planCard/PlanCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

export default function PlansBlock() {
  const { VITE_API } = import.meta.env;

  const [plans, setPlans] = useState([]);

  const mockPlans = [
    {
      id: 1,
      name: "Full Body Workout",
      description: "Complete full body workout for all fitness levels",
      equipment: "Dumbbells, Mat",
      difficulty: "Beginner",
      image: "https://example.com/workout1.jpg"
    },
    {
      id: 2,
      name: "Core Strength",
      description: "Intensive core workout routine",
      equipment: "Mat, Resistance bands",
      difficulty: "Intermediate",
      image: "https://example.com/workout2.jpg"
    },
    {
      id: 3,
      name: "HIIT Training",
      description: "High-intensity interval training for fat burn",
      equipment: "None",
      difficulty: "Advanced",
      image: "https://example.com/workout3.jpg"
    }
  ];
  
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
        {mockPlans.map((plan) => (
          <Box key={plan.id}>
            <PlanCard
              image={plan.image}
              id={plan.id}
              name={plan.name}
              description={plan.description}
              equipment={plan.equipment}
              difficulty={plan.difficulty}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
