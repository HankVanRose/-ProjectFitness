import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CalendarModal } from './CalendarModal';
import { userDaysService } from '@/services/userDays.service';
import { useAppSelector } from '@/store/hooks/hooks';
import UserDaysBlock from './UserDaysBlock';

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
  };
}

export default function FitnessCalendar() {
  const { user } = useAppSelector((store) => store.appSlice);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const [calendarData, setCalendarData] = useState<{
    [key: string]: UserDay[];
  }>({});

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const bgColor = useColorModeValue('white', 'black');
  const dayColor = useColorModeValue('gray.600', 'gray.400');

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setSelectedDay(null);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setSelectedDay(null);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const fetchCalendarData = useCallback(async () => {
    try {
      setIsLoading(true);
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const data = await userDaysService.getCalendarDays(
        user!.id,
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );

      const transformedData: { [key: string]: UserDay[] } = {};

      for (let d = 1; d <= days; d++) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          d
        );
        const dateString = date.toISOString().split('T')[0];
        transformedData[dateString] = [];
      }

      Object.keys(data).forEach((date) => {
        transformedData[date] = data[date];
      });

      setCalendarData(transformedData);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate, days, user]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if (user) {
      fetchCalendarData();
    }
  }, [currentDate, user, fetchCalendarData]);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDay(day);
    setSelectedDate(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  if (!user) {
    return (
      <Box p={6} textAlign="center">
        <Text>Please log in to view your calendar</Text>
      </Box>
    );
  }
  
  
  return (
    <>
      <Box
        p={6}
        maxW="1000px"
        mx="auto"
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
      >
        <VStack>
          {/* Calendar Header */}
          <HStack w="full" justify="space-between" align="center">
            <Button onClick={previousMonth} variant="ghost" borderRadius="xl">
              <MdChevronLeft size="24px" />
            </Button>
            <Heading size="md" fontWeight="600">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Heading>
            <Button onClick={nextMonth} variant="ghost" borderRadius="xl">
              <MdChevronRight size="24px" />
            </Button>
          </HStack>

          {/* Days of Week */}
          <Grid templateColumns="repeat(7, 1fr)" gap={2} w="full">
            {daysOfWeek.map((day) => (
              <Text
                key={day}
                textAlign="center"
                fontWeight="bold"
                color={dayColor}
              >
                {day}
              </Text>
            ))}
          </Grid>

          {/* Calendar Days */}
          <Grid templateColumns="repeat(7, 1fr)" gap={2} w="full">
            {[...Array(firstDay)].map((_, index) => (
              <Box key={`empty-${index}`} />
            ))}
            {[...Array(days)].map((_, index) => {
              const day = index + 1;
              const isSelected = selectedDay === day;
              const currentDateString = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              )
                .toISOString()
                .split('T')[0];

              console.log(currentDateString);// 2025-01-15

              const dayTrainings = calendarData[currentDateString] || []; // has array
              console.log('dayTrainings', dayTrainings);

              const hasTrainingDot = dayTrainings.length > 0;

              return (
                <CalendarModal
                  key={day}
                  selectedDate={selectedDate}
                  bgColor={bgColor}
                  formatDate={formatDate}
                  userId={user.id}
                  onUpdateTraining={fetchCalendarData}
                >
                  <VStack position="relative">
                    <Button
                      onClick={() => handleDateSelect(day)}
                      variant={isSelected ? 'solid' : 'outline'}
                      colorScheme={isSelected ? 'blue' : 'gray'}
                      color={isToday(day) ? 'yellow.500' : undefined}
                      size="sm"
                      h="60px"
                      w="full"
                      borderRadius="md"
                      fontWeight="600"
                      _hover={{
                        bg: isSelected ? 'yellow.500' : 'gray.100',
                      }}
                    >
                      {day}
                    </Button>
                    {hasTrainingDot && (
                      <Box
                        position="absolute"
                        bottom="0"
                        w="4px"
                        h="4px"
                        borderRadius="full"
                        bg="yellow.500"
                        transform="translateY(-8px)"
                      />
                    )}
                  </VStack>
                </CalendarModal>
              );
            })}
          </Grid>
        </VStack>
      </Box>
    </>
  );
}
