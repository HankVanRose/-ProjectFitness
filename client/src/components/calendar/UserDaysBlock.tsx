import axiosInstance from '@/axiosInstance';
import {
  Box,
  Button,
  Collapsible,
  Flex,
  HStack,
  List,
  NativeSelectField,
  NativeSelectRoot,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';
import { BsSortAlphaUp, BsSortDownAlt } from 'react-icons/bs';

// types.ts
type SortOrder = 'oldest' | 'newest';
type PlanFilter = 'all' | 'planned' | 'notPlanned';
type CompletionFilter = 'all' | 'completed' | 'notCompleted';

interface FilterOptions {
  sortOrder: SortOrder;
  planFilter: PlanFilter;
  completionFilter: CompletionFilter;
}

// hooks/useFilteredUserDays.ts
const useFilteredUserDays = (
  userDays: UserDay[],
  filterOptions: FilterOptions
) => {
  const filteredDays = useMemo(() => {
    let result = [...userDays];

    // Apply plan filter
    if (filterOptions.planFilter !== 'all') {
      result = result.filter((day) =>
        filterOptions.planFilter === 'planned'
          ? day.plannedOn !== null
          : day.plannedOn === null
      );
    }

    // Apply completion filter
    if (filterOptions.completionFilter !== 'all') {
      result = result.filter((day) =>
        filterOptions.completionFilter === 'completed'
          ? day.isCompleted
          : !day.isCompleted
      );
    }

    // Apply sort
    result.sort((a, b) => {
      const dateA = a.plannedOn ? new Date(a.plannedOn).getTime() : 0;
      const dateB = b.plannedOn ? new Date(b.plannedOn).getTime() : 0;
      return filterOptions.sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [userDays, filterOptions]);

  return filteredDays;
};
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
export default function UserDaysBlock({ userId }: { userId: number }) {
  const [userDays, setUserDays] = useState<UserDay[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    sortOrder: 'newest',
    planFilter: 'all',
    completionFilter: 'all',
  });

  useEffect(() => {
    const fetchUserDays = async () => {
      try {
        const response = await axiosInstance.get(`/api/userdays/all/${userId}`);
        setUserDays(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDays();
  }, []);
  const filteredDays = useFilteredUserDays(userDays, filters);
  const bg = useColorModeValue('white', 'black');
  const clr = useColorModeValue('black', 'white');

  return (
    <VStack maxH="990px">
      {/* Фильтры */}

      <Text fontWeight="700" fontSize="1.2rem" mb={3}>
        Все ваши тренировки:
      </Text>
      {userDays.length > 0 ? (
        <HStack>
          <Collapsible.Root width="100%">
            <Collapsible.Trigger
              width="100%"
              textAlign="center"
              p={2}
              _hover={{
                color: 'yellow.500',
                cursor: 'pointer',
              }}
            >
              <Button
                fontWeight="600"
                color={clr}
                bg={bg}
                p={3}
                w={'auto'}
                transition="all 0.5s"
                borderRadius={'3xl'}
                _hover={{
                  bg: 'yellow.500',
                  color: 'black',
                }}
              >
                <BsSortAlphaUp /> отсортировать <BsSortDownAlt />
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Flex gap={2} justify="center" width="100%">
                <NativeSelectRoot size="xs">
                  <NativeSelectField
                    placeholder="по времени"
                    bg={bg}
                    p={1}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortOrder: e.target.value as SortOrder,
                      }))
                    }
                  >
                    <option value="newest">сначала старые</option>
                    <option value="oldest">сначала новые</option>
                  </NativeSelectField>
                </NativeSelectRoot>

                <NativeSelectRoot size="xs">
                  <NativeSelectField
                    bg={bg}
                    p={1}
                    fontWeight="500"
                    fontSize="0.7rem"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        planFilter: e.target.value as PlanFilter,
                      }))
                    }
                  >
                    <option value="all">все</option>
                    <option value="planned">запланированные</option>
                    <option value="notPlanned">не запланированные</option>
                  </NativeSelectField>
                </NativeSelectRoot>

                <NativeSelectRoot size="xs">
                  <NativeSelectField
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        completionFilter: e.target.value as CompletionFilter,
                      }))
                    }
                    bg={bg}
                    fontSize="0.7rem"
                    p={1}
                    fontWeight="500"
                  >
                    <option value="all">все</option>
                    <option value="completed">завершенные</option>
                    <option value="notCompleted">не завершенные</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Flex>
            </Collapsible.Content>
          </Collapsible.Root>
        </HStack>
      ) : null}

      {/* User Days List */}

      <Box
        maxH="870px"
        overflowY="auto"
        w="100%"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <VStack w="100%" p={2}>
          {filteredDays.length > 0 ? (
            filteredDays.map((day) => (
              <Box
                key={day.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                borderColor={day.isCompleted ? 'green' : 'red'}
                transition="all 0.2s"
                h="200px"
                w="300px"
                display="flex"
                flexDirection="column"
                overflow="hidden"
                justifyContent="space-around"
                _hover={{
                  borderColor: 'yellow.500',
                }}
              >
                <HStack justify="space-between" width="100%">
                  <VStack align="stretch" width="100%">
                    <Text
                      fontWeight="600"
                      transition="all 0.2s"
                      _hover={{
                        color: 'yellow.500',
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
            ))
          ) : (
            <Text opacity={0.7}>Нет тренировок</Text>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}
