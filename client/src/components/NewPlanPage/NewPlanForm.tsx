import {
  Box,
  Button,
  createListCollection,
  Fieldset,
  Flex,
  Grid,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Field } from '@/components/ui/field';
import axiosInstance from '@/axiosInstance';
import { setError, setLoading } from '@/store/appSlice';
import { DayExercise, ExerciseType, PlanType } from '@/types';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useColorModeValue } from '../ui/color-mode';

export default function NewPlanForm() {
  const { VITE_API } = import.meta.env;
  const [plan, setPlan] = useState<PlanType>({
    name: '',
    shortDescription: '',
    equipment: '',
    difficulty: '',
    image: '',
    slogan: '',
    numOfTrainings: 0,
    longDescription: '',
    weeksDescription: '',
  });

  const [days, setDays] = useState<Omit<DayExercise[], 'planId'>>([]);
  const [allExercises, setAllExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/exercise`);
        console.log(res.data);
        setAllExercises(res.data);
      } catch (error) {
        setError('Ошибка при загрузке упражнений');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleChange = (field: keyof PlanType, value: string | number) => {
    setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  };

  const addDay = () => {
    setDays((prevDays) => [
      ...prevDays,
      {
        points: 0,
        description: '',
        title: '',
        type: '',
        target: '',
        rounds: 0,
        Exercises: [] as ExerciseType[],
      } as DayExercise,
    ]);
  };

  const addExercise = (dayIndex: number) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].Exercises.push({} as ExerciseType);
      return updatedDays;
    });
  };

  const handleSubmit = async () => {
    try {
      const resp = await axiosInstance.post(
        `${VITE_API}/days/newPlan/day/exercises`,
        { ...plan, days }
      );
      console.log(resp.data);
      setPlan({
        name: '',
        shortDescription: '',
        equipment: '',
        difficulty: '',
        image: '',
        slogan: '',
        numOfTrainings: 0,
        longDescription: '',
        weeksDescription: '',
      });
      setDays([]);
    } catch (error) {
      setError('Ошибка при добавлении дня');
      console.error(error);
    }
  };
  const difficultyOptions = createListCollection({
    items: [
      { value: 'easy', label: 'Низкая' },
      { value: 'medium', label: 'Средняя' },
      { value: 'hard', label: 'Высокая' },
    ],
  });

  const exercisesOptions = createListCollection({
    items: allExercises.map((exercise) => ({
      value: exercise.id,
      points: +exercise.points,
      label: exercise.name,
    })),
  });
  const textColor = useColorModeValue('black', 'white');
  const updatePoints = (dayIndex: number, field: string, value: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      [field]: value,
    };
    setDays(updatedDays);
  };
  const updateExercises = (dayIndex: number, exercises: ExerciseType[]) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].Exercises = exercises;
    setDays(updatedDays);
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" p={10}>
        <Box display="flex" p={5}>
          <Fieldset.Root size="lg">
            <Stack>
              <Fieldset.Legend fontWeight={600}>
                Создать новый план тренировок
              </Fieldset.Legend>
              <Fieldset.HelperText mb={5}>
                Здесь вы можете создать новый план тренировок
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Field label="Название">
                  <Input
                    p={2}
                    placeholder="Название плана"
                    name={plan.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Field>

                <Field label="URL картинки">
                  <Input
                    p={2}
                    placeholder="URL картинки"
                    name={plan.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                  />
                </Field>

                <Field label="Краткое описание">
                  <Input
                    p={2}
                    placeholder="Краткое описание"
                    name={plan.shortDescription}
                    onChange={(e) =>
                      handleChange('shortDescription', e.target.value)
                    }
                  />
                </Field>

                <Field label="Необходимое оборудование">
                  <Input
                    p={2}
                    placeholder="Укажите оборудование"
                    name={plan.equipment}
                    onChange={(e) => handleChange('equipment', e.target.value)}
                  />
                </Field>

                <Field label="Сложность">
                  <SelectRoot mb={4} collection={difficultyOptions}>
                    <SelectTrigger>
                      <SelectValueText placeholder="Выберите сложность"></SelectValueText>
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.items.map((option) => (
                        <SelectItem item={option} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label="Количество тренировок">
                  <Input
                    p={2}
                    type="number"
                    placeholder="Количество недель"
                    name={plan.numOfTrainings.toString()}
                    onChange={(e) =>
                      handleChange('numOfTrainings', e.target.value)
                    }
                    min={1}
                  />
                </Field>

                <Box gridColumn="span 2">
                  <Field label="Описание">
                    <Textarea
                      p={2}
                      rows={2}
                      placeholder="Детальное описание"
                      name={plan.longDescription}
                      onChange={(e) =>
                        handleChange('longDescription', e.target.value)
                      }
                    />
                  </Field>
                </Box>

                <Box gridColumn="span 2">
                  <Field label="Weeks Description">
                    <Textarea
                      p={2}
                      rows={2}
                      placeholder="weeksDescription"
                      name={plan.weeksDescription}
                      onChange={(e) =>
                        handleChange('weeksDescription', e.target.value)
                      }
                    />
                  </Field>
                </Box>
              </Grid>
            </Fieldset.Content>

            <Fieldset.HelperText mt={5}>
              * Нажмите на эту кнопку только после добавления всех дней
            </Fieldset.HelperText>
            <Button
              type="submit"
              width={200}
              alignSelf="flex-center"
              borderRadius={10}
              mt={4}
              onClick={handleSubmit}
            >
              Создать план <MdOutlineCreateNewFolder />
            </Button>
          </Fieldset.Root>
        </Box>
        <Box p={5}>
          <Heading fontSize="1.6rem" fontWeight={600}>
            Дни
          </Heading>
          {days.map((day, dayIndex) => (
            <Box
              key={dayIndex}
              p={3}
              borderWidth={1}
              borderRadius="lg"
              mb={6}
              w="full"
              boxShadow="sm"
            >
              <Flex direction="column" gap={4}>
                <Field label="Очки за день">
                  <Input
                    type="number"
                    placeholder="Очки"
                    value={day.points}
                    p={3}
                    disabled
                    borderRadius="xl"
                    onChange={(e) =>
                      updatePoints(dayIndex, 'points', Number(e.target.value))
                    }
                  />
                </Field>

                <Box fontSize="0.7rem">
                  <Text fontSize="1.2rem" fontWeight={600}>
                    Упражнения
                  </Text>
                  <Stack>
                    {day.Exercises.map((exercise, exerciseIndex) => (
                      <Field
                        fontWeight={300}
                        key={exerciseIndex}
                        label="Выберите упражнение"
                      >
                        <SelectRoot
                          color="gray.600"
                          collection={exercisesOptions}
                          onValueChange={(ValueChangeDetails) => {
                            const updatedExercises = [...day.Exercises];

                            // Update the exercise
                            updatedExercises[exerciseIndex] = {
                              id: Number(ValueChangeDetails.value),
                            } as ExerciseType;

                            // Calculate total points for the day
                            const totalPoints = updatedExercises.reduce(
                              (sum, exercise) => {
                                const exerciseDetails =
                                  exercisesOptions.items.find(
                                    (item) => item.value === exercise.id // Convert to string for comparison
                                  );
                                return (
                                  sum +
                                  (exerciseDetails?.points
                                    ? Number(exerciseDetails.points)
                                    : 0)
                                ); // Ensure points are converted to numbers
                              },
                              0
                            );

                            // Update exercises and points separately
                            updateExercises(dayIndex, updatedExercises);
                            updatePoints(dayIndex, 'points', totalPoints);
                          }}
                        >
                          <SelectTrigger p={2} borderRadius={5}>
                            <SelectValueText placeholder="Выберите упражнение">
                              {exercise
                                ? exercisesOptions.items.find(
                                    (item) => item.value === exercise.id
                                  )?.label
                                : ''}
                            </SelectValueText>
                          </SelectTrigger>
                          <SelectContent color={textColor}>
                            {exercisesOptions.items.map((option) => (
                              <SelectItem item={option} key={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectRoot>
                      </Field>
                    ))}
                  </Stack>
                </Box>

                <Button
                  size="md"
                  variant="outline"
                  borderRadius="xl"
                  onClick={() => addExercise(dayIndex)}
                >
                  <IoAddCircleOutline />
                  Добавить упражнение
                </Button>
              </Flex>
            </Box>
          ))}

          <Button p={3} borderRadius="md" onClick={addDay}>
            Добавить день <IoAddCircleOutline />
          </Button>
        </Box>
      </Grid>
    </>
  );
}
