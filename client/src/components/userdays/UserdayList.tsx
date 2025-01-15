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
  calories: number;
};

export default function UserDaysList() {
  const [days, setDays] = useState<DayType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAppSelector((store) => store.appSlice);
  const { VITE_API } = import.meta.env;

  useEffect(() => {
    const fetchDaysAndUserDayAndExercise = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get(
          `${VITE_API}/days/${id}/user/${user!.id}`
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
  console.log(`points`, days.map(el=> el.points));
console.log(`calories`,days.map(el=> el.calories));

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
              position="relative"
              transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              transform="perspective(1000px)"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: isAnyDayCompleted
                  ? 'linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(72, 187, 120, 0.3))'
                  : 'linear-gradient(135deg, rgba(245, 101, 101, 0.1), rgba(245, 101, 101, 0.3))',
                opacity: 0,
                transition: 'all 0.5s ease',
                zIndex: 1,
                borderRadius: '10px',
              }}
              _after={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background:
                  'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'rotate(45deg) translateY(-100%)',
                transition: 'all 0.8s ease',
                zIndex: 2,
              }}
              _hover={{
                transform:
                  'perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(20px)',
                boxShadow: `
      0 5px 15px rgba(0, 0, 0, 0.1),
      0 10px 30px ${
        isAnyDayCompleted
          ? 'rgba(72, 187, 120, 0.2)'
          : 'rgba(245, 101, 101, 0.2)'
      }
    `,
                borderColor: isAnyDayCompleted ? 'green.400' : 'red.400',
                borderWidth: '2px',
                _before: {
                  opacity: 1,
                },
                _after: {
                  transform: 'rotate(45deg) translateY(100%)',
                },
              }}
              borderWidth={isAnyDayCompleted ? '2px' : '1px'}
              borderColor={isAnyDayCompleted ? 'green.500' : 'red.500'}
            >
              <Box
                position="relative"
                zIndex={3}
                transition="all 0.5s ease"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: isAnyDayCompleted
                    ? 'radial-gradient(circle at center, rgba(72, 187, 120, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(245, 101, 101, 0.2) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                }}
              >
                <Box
                  position="relative"
                  transition="transform 0.5s ease"
                  _hover={{
                    transform: 'translateY(-5px)',
                  }}
                >
                  <UserdayCard
                    dayId={day.id}
                    planId={day.planId}
                    points={day.points}
                    calories={day.calories}
                    description={day.description}
                    title={day.title}
                    rounds={day.rounds}
                    type={day.type}
                    target={day.target}
                    cardNumber={index + 1}
                    isAnyDayCompleted={isAnyDayCompleted}
                    updatePlanCompletion={updatePlanCompletion}
                    exercises={day.Exercises}
                    
                  />
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      <Button
        fontWeight="600"
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
