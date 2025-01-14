import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Spinner,
  List,
} from '@chakra-ui/react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { useColorModeValue } from '../ui/color-mode';
import { userDaysService } from '@/services/userDays.service';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';

interface UserDay {
  id: number;
  userId: number;
  dayId: number;
  isCompleted: boolean;
  plannedOn: string | null;
  Day?: {
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
  const navigate = useNavigate();

  const fetchUnplannedDays = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userDaysService.getUnplannedDays(userId);
      setUnplannedDays(data);
    } catch (error) {
      console.error('Error fetching unplanned days:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchPlannedDays = useCallback(async () => {
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
  }, [userId, selectedDate]);

  useEffect(() => {
    let isSubscribed = true;

    if (selectedDate && userId) {
      const loadData = async () => {
        if (isSubscribed) {
          await fetchUnplannedDays();
          await fetchPlannedDays();
        }
      };
      loadData();
    }

    return () => {
      isSubscribed = false;
    };
  }, [selectedDate, userId, fetchUnplannedDays, fetchPlannedDays]);

  const handlePlanDay = async (userDayId: number) => {
    if (!selectedDate) return;

    try {
      await userDaysService.updatePlannedDate(
        userDayId,
        selectedDate.toISOString().split('T')[0]
      );

      const plannedDay = unplannedDays.find((day) => day.id === userDayId);
      if (plannedDay) {
        setUnplannedDays((prevDays) =>
          prevDays.filter((day) => day.id !== userDayId)
        );

        setPlannedDays((prevDays) => [
          ...prevDays,
          {
            ...plannedDay,
            plannedOn: selectedDate.toISOString().split('T')[0],
          },
        ]);
      }

      onUpdateTraining();
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
      setPlannedDays((prevDays) =>
        prevDays.map((day) =>
          day.id === userDayId ? { ...day, isCompleted: !currentStatus } : day
        )
      );
      onUpdateTraining();
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
          <DialogTitle fontWeight="600" fontSize="1.5rem">
            {selectedDate && formatDate(selectedDate)}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack align="stretch" mt={2}>
            {isLoadingPlanned ? (
              <Spinner size="md" />
            ) : plannedDays.length > 0 ? (
              <>
                <Text fontSize="lg" fontWeight="500">
                  Запланированные тренировки
                </Text>
                {plannedDays.map((day) => (
                  <Box
                    key={day.id}
                    p={5}
                    borderWidth={1}
                    borderRadius="md"
                    borderColor="gray.600"
                    my={1}
                  >
                    <HStack justify="space-between">
                      <VStack align="start">
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
                              _hover={{
                                color: 'yellow.300',
                                cursor: 'pointer',
                              }}
                              key={exercise.id}
                            >
                              <Link to={`/exercises/${exercise.id}`}>
                                {exercise.name}
                              </Link>
                            </List.Item>
                          ))}
                        </List.Root>
                      </VStack>
                      <Checkbox
                        _hover={{ cursor: 'pointer' }}
                        checked={day.isCompleted}
                        onChange={() =>
                          handleToggleCompletion(day.id, day.isCompleted)
                        }
                      ></Checkbox>
                    </HStack>
                  </Box>
                ))}
              </>
            ) : (
              <Text color="gray.500" fontSize={'1rem'}>
                Нет запланированных тренировок на этот день
              </Text>
            )}

            <Box mt={3}>
              <Text fontSize="lg" fontWeight="600">
                Доступные тренировки
              </Text>
              {isLoading ? (
                <Spinner size="md" />
              ) : unplannedDays.length > 0 ? (
                <VStack align="stretch" mt={4}>
                  {unplannedDays.map((day) => (
                    <Box
                      draggable
                      key={day.id}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      borderColor="gray.100"
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
                          </Text>
                        </VStack>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          p={8}
                          borderRadius="md"
                          onClick={() => handlePlanDay(day.id)}
                          textAlign="center"
                        >
                          Запланировать на <br />
                          {selectedDate && formatDate(selectedDate)}
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <>
                  <Text color="gray.500" mt={2} fontSize={'1rem'}>
                    {'К сожалению, у вас нет доступных тренировок :('}
                  </Text>

                  <Text mt={4} fontSize="lg" fontWeight="600">
                    Хотите добавить новый план?
                  </Text>
                  <Button
                    colorPalette="yellow"
                    variant="outline"
                    p={2}
                    mt={4}
                    onClick={() => navigate('/plans')}
                  >
                    да, хочу! <IoIosAddCircleOutline />
                  </Button>
                </>
              )}
            </Box>
          </VStack>
        </DialogBody>

        <DialogCloseTrigger borderRadius="10px" m={7} />
      </DialogContent>
    </DialogRoot>
  );
}
