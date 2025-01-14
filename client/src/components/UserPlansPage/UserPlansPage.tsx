import axiosInstance from '@/axiosInstance';
import { useAppSelector } from '@/store/hooks/hooks';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserPlanCard from './UserPlanCard';

export default function UserPlansPage() {
  const { user } = useAppSelector((state) => state.appSlice);
  const [userPlans, setUserPlans] = useState([]);
  const { VITE_API } = import.meta.env;
  const [isLoading, setIsLoading] = useState(true);

  //id
  useEffect(() => {
    const allPlans = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `${VITE_API}/session/plans/${user?.id}`
        );
        setUserPlans(res.data);
      } catch (error) {
        console.error(error, 'Ошибка');
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.id) allPlans();
  }, [user?.id]);

  console.log(userPlans);

  return (
    <Container maxW="full" px={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={4}>
        {userPlans.map((plan) => (
          <Box key={plan.id} p={4} borderRadius="md">
            <UserPlanCard
              image={plan.Plan.image}
              id={plan.id}
              name={plan.Plan.name}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
