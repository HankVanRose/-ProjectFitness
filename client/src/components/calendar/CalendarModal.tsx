import React, { useState, useEffect } from 'react';
import { Button, Text, VStack, HStack, Box, Spinner } from '@chakra-ui/react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { useColorModeValue } from '../ui/color-mode';
import { userDaysService } from '@/services/userDays.service';
import { Checkbox } from '@/components/ui/checkbox';

interface UserDay {
  id: number;
  userId: number;
  dayId: number;
  isCompleted: boolean;
  plannedOn: string | null;
  Day?: {
    id: number;
    name: string;
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

interface CalendarModalProps {
  selectedDate: Date | null;
  bgColor: string;
  children: React.ReactNode;
  formatDate: (date: Date) => string;
  onUpdateTraining: () => void;
  userId: number;
}

export function CalendarModal({
  selectedDate,
  bgColor,
  children,
  formatDate,
  onUpdateTraining,
  userId,
}: CalendarModalProps) {
  const [unplannedDays, setUnplannedDays] = useState<UserDay[]>([]);
  const [plannedDays, setPlannedDays] = useState<UserDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPlanned, setIsLoadingPlanned] = useState(false);
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    if (selectedDate && userId) {
      fetchUnplannedDays();
      fetchPlannedDays();
    }
  }, [selectedDate, userId]);

  const fetchUnplannedDays = async () => {
    try {
      setIsLoading(true);
      const data = await userDaysService.getUnplannedDays(userId);
      setUnplannedDays(data);
      console.log(unplannedDays, 'unplannedDays');
    } catch (error) {
      console.error('Error fetching unplanned days:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlannedDays = async () => {
    if (!selectedDate) return;

    try {
      setIsLoadingPlanned(true);
      const date = selectedDate.toISOString().split('T')[0];
      const data = await userDaysService.getDayTrainings(userId, date);
      setPlannedDays(data);
    } catch (error) {
      console.error('Error fetching planned days:', error);
    } finally {
      setIsLoadingPlanned(false);
    }
  };

  const handlePlanDay = async (userDayId: number) => {
    if (!selectedDate) return;

    try {
      await userDaysService.updatePlannedDate(
        userDayId,
        selectedDate.toISOString().split('T')[0]
      );
      onUpdateTraining();
      // Refresh both lists
      fetchUnplannedDays();
      fetchPlannedDays();
    } catch (error) {
      console.error('Error planning day:', error);
    }
  };

  const handleToggleCompletion = async (
    userDayId: number,
    currentStatus: boolean
  ) => {
    try {
      await userDaysService.updateCompletion(userDayId, !currentStatus);
      onUpdateTraining();
      // Refresh planned days to show updated completion status
      fetchPlannedDays();
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  return (
    <DialogRoot size="lg">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        minH="50VH"
        bg={bgColor}
        borderRadius={30}
        p={10}
        color={textColor}
      >
        <DialogHeader>
          <DialogTitle fontWeight="600">
            {selectedDate && formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack align="stretch">
            {isLoadingPlanned ? (
              <Spinner size="md" />
            ) : plannedDays.length > 0 ? (
              <>
                <Text fontSize="lg" fontWeight="600">
                  Запланированные тренировки
                </Text>
                {plannedDays.map((userDay) => (
                  <Box
                    key={userDay.id}
                    p={3}
                    borderWidth={1}
                    borderRadius="md"
                    borderColor="gray.600"
                  >
                    <HStack justify="space-between">
                      <VStack align="start">
                        <Text fontWeight="700">{userDay.Day?.Plan.name}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {userDay.Day?.Exercises.length} упражнений
                        </Text>
                      </VStack>
                      <Checkbox
                        checked={userDay.isCompleted}
                        onChange={() =>
                          handleToggleCompletion(
                            userDay.id,
                            userDay.isCompleted
                          )
                        }
                        colorScheme="green"
                      >
                        
                      </Checkbox>
                    </HStack>
                  </Box>
                ))}
              </>
            ) : (
              <Text color="gray.500">
                Нет запланированных тренировок на этот день
              </Text>
            )}

            <Box mt={6}>
              <Text fontSize="lg" fontWeight="600" mb={3}>
                Доступные тренировки
              </Text>
              {isLoading ? (
                <Spinner size="md" />
              ) : unplannedDays.length > 0 ? (
                <VStack align="stretch">
                  {unplannedDays.map((day) => (
                    <Box
                      key={day.id}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      borderColor="gray.200"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{
                        bg: 'gray.50',
                        borderColor: 'blue.500',
                      }}
                      onClick={() => handlePlanDay(day.id)}
                    >
                      <HStack justify="space-between">
                        <VStack align="start">
                          <Text fontWeight="500">{day.Day?.Plan.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {day.Day?.Exercises.length} упражнений
                          </Text>
                        </VStack>
                        <Button size="sm" colorScheme="blue" variant="ghost">
                          Добавить
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text color="gray.500">Нет доступных тренировок</Text>
              )}
            </Box>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius='md' p={3}>Закрыть</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger borderRadius="10px" m={7} />
      </DialogContent>
    </DialogRoot>
  );
}
