import axiosInstance from '@/axiosInstance';
import { Box, HStack, VStack, Text, List, Separator } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface UserDay {
  id: number;
  userId: number;
  dayId: number;
  isCompleted: boolean;
  plannedOn: string | null;
  Day: {
    id: number;
    name: string;
    planId: number;
    Exercises: Array<{
      id: number;
      name: string;
      description: string;
    }>;
    Plan: {
      name: string;
    };
  };
}
export default function SoonestList({ userId }: { userId: number }) {
  const [userDays, setUserDays] = useState<UserDay[]>([]);
  useEffect(() => {
    const fetchUserDays = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/userdays/soonest/${userId}`
        );
        setUserDays(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDays();
  }, []);
  return (
    <VStack w="100%" >

      <Text fontWeight='700' fontSize='1.2rem'> Ближайшие тренировки: </Text>

      { userDays.length > 0 ? userDays.map((day) => (
        <Box
          key={day.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          borderColor={day.isCompleted ? 'gray' : 'gray'}
          transition="all 0.2s"
          h="200px"
          w="300px"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          justifyContent="space-around"
          _hover={{
            borderColor: 'yellow.300',
          }}
        >
          <HStack justify="space-between" width="100%">
            <VStack align="stretch" width="100%">
              <Text
                fontWeight="600"
                transition="all 0.2s"
                _hover={{
                  color: 'yellow.300',
                  cursor: 'pointer',
                }}
              >
                <Link to={`/plans/${day.Day?.planId}`}>
                  {day.Day?.Plan.name}{' '}
                </Link>
              </Text>
              <Text fontSize="0.7rem" fontWeight="600" color="gray.600">
                {day.plannedOn
                  ? `Запланировано на: ${new Date(
                      new Date(day.plannedOn).setDate(
                        new Date(day.plannedOn).getDate() + 1
                      )
                    )
                      .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join(', ')}  `
                  : 'Не запланировано'}
              </Text>
              <List.Root
                variant="plain"
                fontSize="0.7rem"
                color="gray.700"
                lineHeight="0.9rem"
                maxH="90px"
                overflowY="auto"
                p={1}
                css={{
                  scrollbarWidth: 'none',
                  scrollbarColor: 'gray.200 transparent',
                }}
              >
                {day.Day?.Exercises.map((exercise) => (
                  <List.Item
                    transition="all 0.2s"
                    key={exercise.id}
                    _hover={{
                      color: 'yellow.300',
                      cursor: 'pointer',
                    }}
                  >
                    <Link to={`/exercises/${exercise.id}`}>
                      {exercise.name}
                    </Link>
                  </List.Item>
                ))}
              </List.Root>
            </VStack>
          </HStack>
        </Box>
      )) : <Text color='gray.700'>Нет запланированных тренировок</Text>}
    </VStack>
  );
}
