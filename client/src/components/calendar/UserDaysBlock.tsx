import axiosInstance from '@/axiosInstance';
import {
  Box,
  HStack,
  List,
  NativeSelectField,
  NativeSelectRoot,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import {  Link } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';

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
// Component implementation
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
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <VStack>
      {/* Filter Controls */}
      <HStack>
        <NativeSelectRoot
          value={filters.sortOrder}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sortOrder: e.target.value as SortOrder,
            }))
          }
        >
          <NativeSelectField placeholder="новые/старые" bg={bg} p={2}>
            <option value="newest">Сначала старые</option>
            <option value="oldest">Сначала новые</option>
          </NativeSelectField>
        </NativeSelectRoot>

        <NativeSelectRoot
          value={filters.planFilter}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              planFilter: e.target.value as PlanFilter,
            }))
          }
        >
          <NativeSelectField placeholder="По плану" bg={bg} p={3}>
            <option value="all">Все</option>
            <option value="planned">Запланированные</option>
            <option value="notPlanned">Не запланированные</option>
          </NativeSelectField>
        </NativeSelectRoot>

        <NativeSelectRoot
          value={filters.completionFilter}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              completionFilter: e.target.value as CompletionFilter,
            }))
          }
        >
          <NativeSelectField placeholder="Статус" bg={bg} p={2}>
            <option value="all">Все</option>
            <option value="completed">Завершенные</option>
            <option value="notCompleted">Не завершенные</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </HStack>

      {/* User Days List */}
      {filteredDays.map((day) => (
        <Box
          draggable
          key={day.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          borderColor={day.isCompleted ? 'green' : 'red'}
          transition="all 0.2s"
          my={2}
          _hover={{
            borderColor: 'yellow.300',
          }}
        >
          <HStack justify="space-between">
            <VStack>
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
                </Link>{' '}
                <Text fontSize="sm" color="gray.600">
                  Количество упражнений: {day.Day?.Exercises.length}
                </Text>
                <List.Root
                  variant="plain"
                  fontSize="0.7rem"
                  color="gray.700"
                  lineHeight="0.9rem"
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
                {day.plannedOn && (
                  <Text fontSize="sm" color="gray.600">
                    Запланировано на:{' '}
                    {day.plannedOn.split('-').reverse().join(', ')}
                  </Text>
                )}
              </Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
