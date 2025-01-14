import axiosInstance from '../../axiosInstance';
import type { ExerciseType } from '@/types';
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Button, Spinner, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks/hooks';
import UserdayCard from './UserdayCard';

type UserDayType = {
  id: number;
  userId: number;
  dayId: number;
  isCompleted: boolean;
  plannedOn: Date;
};

type DayType = {
  id: number;
  planId: number;
  points: number;
  description: string;
  title: string;
  type: string;
  target: string;
  rounds: number;
  Exercises: ExerciseType[];
  UserDays: UserDayType[];
};

export default function UserDaysList() {
  const [days, setDays] = useState<DayType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAppSelector((store) => store.appSlice);

  useEffect(() => {
    const fetchDaysAndUserDayAndExercise = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get(
          `api/days/${id}/user/${user!.id}`
        );
        setDays(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && user) fetchDaysAndUserDayAndExercise();
  }, [id, user]);

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

  const updatePlanCompletion = (userDayId: number, dayId: number) => {
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        return day.id === dayId
          ? {
              ...day,
              UserDays: day.UserDays.map((userDay) => {
                return userDay.id == userDayId
                  ? { ...userDay, isCompleted: true }
                  : userDay;
              }),
            }
          : day;
      });

      return updatedDays;
    });
  };

  return (
    <Flex
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {days.map((day, index) => {
          const isAnyDayCompleted = day.UserDays.some(
            (userDay) => userDay.isCompleted && userDay.userId === user?.id
          );

          return (
            <Box
              borderRadius={10}
              m={4}
              key={day.id}
              p={2}
              boxShadow="md"
              _hover={{
                transform: 'scale(1.02)',
                transition: '0.3s',
              }}
              borderWidth={isAnyDayCompleted ? '2px' : '1px'}
              borderColor={isAnyDayCompleted ? 'green.500' : 'red.500'}
            >
              <UserdayCard
                dayId={day.id}
                planId={day.planId}
                points={day.points}
                description={day.description}
                title={day.title}
                rounds={day.rounds}
                type={day.type}
                target={day.target}
                cardNumber={index + 1}
                isAnyDayCompleted={isAnyDayCompleted}
                updatePlanCompletion={updatePlanCompletion}
              />
            </Box>
          );
        })}
      </SimpleGrid>

      <Button
      fontWeight='600'
        _hover={{
          bg: 'green.500',
          transition: '0.5s',
        }}
        p={4}
        mt={5}
        maxW="300px"
      >
        ЗАВЕРШИТЬ ПЛАН
      </Button>
    </Flex>
  );
}
