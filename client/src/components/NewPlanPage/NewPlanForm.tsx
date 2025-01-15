import {
  Box,
  Button,
  createListCollection,
  Fieldset,
  Flex,
  Grid,
  IconButton,
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
import { Avatar } from '@/components/ui/avatar';
import axiosInstance from '@/axiosInstance';
import { setError, setLoading } from '@/store/appSlice';
import { DayExercise, ExerciseType, PlanType } from '@/types';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useColorModeValue } from '../ui/color-mode';
import { GrPlan } from 'react-icons/gr';
import { CiCalendar } from 'react-icons/ci';

export default function NewPlanForm() {
  const { VITE_API } = import.meta.env;
  const [plan, setPlan] = useState<PlanType>({
    name: '',
    shortDescription: '',
    longDescription: '',
    equipment: '',
    difficulty: '',
    image: '',
    slogan: '',
    numOfTrainings: 0,
    weeksDescription: '',
    UserDays: [],
  });

  const [days, setDays] = useState<Omit<DayExercise[], 'planId'>>([]);
  const [allExercises, setAllExercises] = useState<ExerciseType[]>([]);
  const [selectDifficulty, setSelectDifficulty] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/exercise`);
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

  const handleChangeDay = (
    field: keyof DayExercise,
    index: number,
    value: string | number
  ) => {
    setDays((prevDays) =>
      prevDays.map((day, ind) =>
        ind === index ? { ...day, [field]: value } : day
      )
    );
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
        calories: 0,
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
  // const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axiosInstance.post(`${VITE_API}/days/newPlan/day/exercises`, {
        ...plan,
        days,
      });
      setPlan({
        name: '',
        shortDescription: '',
        longDescription: '',
        equipment: '',
        difficulty: '',
        image: '',
        slogan: '',
        numOfTrainings: 0,
        weeksDescription: '',
        UserDays: [],
      });

      setSelectDifficulty([]);
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
      points: exercise.points,
      label: exercise.name,
      calories: exercise.calories,
      image: exercise.image,
    })),
  });

  const typeOptions = createListCollection({
    items: [
      { value: 'ASAP', label: 'ASAP - На скорость' },
      { value: 'AMRAP', label: 'AMRAP - На количество' },
      { value: 'No Time', label: 'No Time - Без учета времени' },
    ],
  });

  const targetOptions = createListCollection({
    items: [
      {
        value: 'Закончить задание за минимальное время',
        label: 'Закончить задание за минимальное время',
      },
      {
        value: 'Завершить как можно больше раундов за 20 минут',
        label: 'Завершить как можно больше раундов за 20 минут',
      },
      {
        value: 'Закончить как можно больше раундов за 25 минут',
        label: 'Закончить как можно больше раундов за 25 минут',
      },
      { value: 'грудь + трицепс + дельты', label: 'грудь + трицепс + дельты' },
      { value: 'спина + грудь + дельты', label: 'спина + грудь + дельты' },
    ],
  });

  const textColor = useColorModeValue('black', 'white');

  const updatePoints = (dayIndex: number, field: string, value: number) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        [field]: value,
      };
      return updatedDays;
    });
  };

  const updateExercises = (dayIndex: number, exercises: ExerciseType[]) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].Exercises = exercises;
    setDays(updatedDays);
  };

  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' p={10}>
        <Box display='flex' p={5}>
          <Fieldset.Root size='lg'>
            <Stack>
              <Fieldset.Legend
                fontWeight={600}
                display='flex'
                alignItems='center'
              >
                Создать новый план тренировок{' '}
                <IconButton variant={'ghost'} size='xs' borderRadius={10}>
                  <GrPlan />
                </IconButton>
              </Fieldset.Legend>

              <Fieldset.HelperText mb={5}>
                Здесь вы можете создать новый план тренировок
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                <Field label='Название'>
                  <Input
                    p={2}
                    placeholder='Название плана'
                    value={plan.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Field>

                <Field label='URL картинки'>
                  <Input
                    p={2}
                    placeholder='URL картинки'
                    value={plan.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                  />
                </Field>

                <Field label='Краткое описание'>
                  <Input
                    p={2}
                    placeholder='Краткое описание'
                    value={plan.shortDescription}
                    onChange={(e) =>
                      handleChange('shortDescription', e.target.value)
                    }
                  />
                </Field>

                <Field label='Необходимое оборудование'>
                  <Input
                    p={2}
                    placeholder='Укажите оборудование'
                    value={plan.equipment}
                    onChange={(e) => handleChange('equipment', e.target.value)}
                  />
                </Field>

                <Field label='Сложность'>
                  <SelectRoot
                    collection={difficultyOptions}
                    value={selectDifficulty}
                    onValueChange={(ValueChangeDetails) => {
                      const value = Array.isArray(ValueChangeDetails.value)
                        ? ValueChangeDetails.value
                        : [ValueChangeDetails.value];
                      setSelectDifficulty(value);
                      handleChange('difficulty', value[0]);
                    }}
                  >
                    <SelectTrigger p={2} borderRadius={4}>
                      <SelectValueText placeholder='Выберите сложность'>
                        {selectDifficulty.length > 0
                          ? difficultyOptions.items.find(
                              (item) => item.value === plan.difficulty
                            )?.label
                          : ''}
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent p={4}>
                      {difficultyOptions.items.map((option) => (
                        <SelectItem item={option} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label='Количество тренировок'>
                  <Input
                    p={2}
                    type='number'
                    placeholder='Количество дней'
                    value={plan.numOfTrainings.toString()}
                    onChange={(e) =>
                      handleChange('numOfTrainings', e.target.value)
                    }
                    min={1}
                  />
                </Field>

                <Field label='Девиз плана'>
                  <Input
                    p={2}
                    placeholder='Укажите ваш девиз'
                    value={plan.slogan}
                    onChange={(e) => handleChange('slogan', e.target.value)}
                  />
                </Field>

                <Box gridColumn='span 2'>
                  <Field label='Описание'>
                    <Textarea
                      p={2}
                      rows={2}
                      placeholder='Детальное описание'
                      value={plan.longDescription}
                      onChange={(e) =>
                        handleChange('longDescription', e.target.value)
                      }
                    />
                  </Field>
                </Box>

                {/* <Box gridColumn="span 2">
                  <Field label="Weeks Description">
                    <Textarea
                      p={2}
                      rows={2}
                      placeholder="weeksDescription"
                      value={plan.weeksDescription}
                      onChange={(e) =>
                        handleChange('weeksDescription', e.target.value)
                      }
                    />
                  </Field>
                </Box> */}
              </Grid>
            </Fieldset.Content>

            <Fieldset.HelperText mt={5}>
              * Нажмите на эту кнопку только после добавления всех дней
            </Fieldset.HelperText>
            <Button
              type='submit'
              width={200}
              alignSelf='flex-center'
              borderRadius={10}
              mt={4}
              onClick={handleSubmit}
              minW='10ch'
              variant='surface'
              colorPalette='green'
            >
              Создать план <MdOutlineCreateNewFolder />
            </Button>
          </Fieldset.Root>
        </Box>
        <Box p={5}>
          <Fieldset.Root>
            <Stack>
              <Fieldset.Legend
                fontWeight={600}
                fontSize={16}
                display='flex'
                alignItems='center'
              >
                Добавить дни в мой план
                <IconButton variant={'ghost'} size='xs' borderRadius={10}>
                  <CiCalendar />
                </IconButton>
              </Fieldset.Legend>
              <Fieldset.HelperText mb={5}>
                Здесь вы можете вы можете добавить столько дней, сколько хотите
                в своем плане тренировок
              </Fieldset.HelperText>
            </Stack>
          </Fieldset.Root>
          {days.map((day, dayIndex) => (
            <Box
              key={dayIndex}
              p={3}
              borderWidth={1}
              borderRadius='lg'
              mb={6}
              w='full'
              boxShadow='sm'
            >
              <Flex direction='column' gap={4}>
                <Field label='Название'>
                  <Input
                    p={2}
                    placeholder='Название дня'
                    value={day.title}
                    onChange={(e) =>
                      handleChangeDay('title', dayIndex, e.target.value)
                    }
                  />
                </Field>

                <Field label='Тип'>
                  <SelectRoot
                    collection={typeOptions}
                    onValueChange={(ValueChangeDetails) => {
                      const value = Array.isArray(ValueChangeDetails.value)
                        ? ValueChangeDetails.value[0]
                        : ValueChangeDetails.value;
                      handleChangeDay('type', dayIndex, value);
                    }}
                  >
                    <SelectTrigger p={2} borderRadius={4}>
                      <SelectValueText placeholder='Выберите тип дня'>
                        {
                          typeOptions.items.find(
                            (item) => item.value === day.type
                          )?.label
                        }
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent p={4}>
                      {typeOptions.items.map((type) => (
                        <SelectItem item={type} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label='Задача на день'>
                  <SelectRoot
                    collection={targetOptions}
                    onValueChange={(ValueChangeDetails) => {
                      const value = Array.isArray(ValueChangeDetails.value)
                        ? ValueChangeDetails.value[0]
                        : ValueChangeDetails.value;
                      handleChangeDay('target', dayIndex, value);
                    }}
                  >
                    <SelectTrigger p={2} borderRadius={4}>
                      <SelectValueText placeholder='Выберите задачу на день'>
                        {
                          targetOptions.items.find(
                            (item) => item.value === day.target
                          )?.label
                        }
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent p={4}>
                      {targetOptions.items.map((target) => (
                        <SelectItem item={target} key={target.value}>
                          {target.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>

                <Field label='Рекомендованное количество подходов'>
                  <Input
                    p={2}
                    type='number'
                    placeholder='Количество подходов'
                    value={day.rounds}
                    onChange={(e) =>
                      handleChangeDay('rounds', dayIndex, e.target.value)
                    }
                    min={1}
                  />
                </Field>

                <Box gridColumn='span 2'>
                  <Field label='Описание'>
                    <Textarea
                      p={2}
                      rows={2}
                      placeholder='Описание дня'
                      value={day.description}
                      onChange={(e) =>
                        handleChangeDay('description', dayIndex, e.target.value)
                      }
                    />
                  </Field>
                </Box>

                <Field label='Очки за день'>
                  <Input
                    type='number'
                    placeholder='Очки'
                    value={day.points}
                    p={3}
                    disabled
                    borderRadius='xl'
                    onChange={(e) =>
                      updatePoints(dayIndex, 'points', Number(e.target.value))
                    }
                  />
                </Field>
                <Field label='Калории, сожженные за день'>
                  <Input
                    type='number'
                    placeholder='Калории'
                    value={day.calories}
                    p={3}
                    disabled
                    borderRadius='xl'
                    onChange={(e) =>
                      updatePoints(dayIndex, 'calories', Number(e.target.value))
                    }
                  />
                </Field>

                <Box fontSize='0.7rem'>
                  <Text fontSize='1.2rem' fontWeight={600}>
                    Упражнения
                  </Text>
                  <Stack>
                    {day.Exercises.map((exercise, exerciseIndex) => (
                      <Field
                        fontWeight={300}
                        key={exerciseIndex}
                        label='Выберите упражнение'
                      >
                        <SelectRoot
                          color='gray.600'
                          collection={exercisesOptions}
                          onValueChange={(ValueChangeDetails) => {
                            const selectedExerciseId = Array.isArray(
                              ValueChangeDetails.value
                            )
                              ? ValueChangeDetails.value[0]
                              : ValueChangeDetails.value;

                            const updatedExercises = [...day.Exercises];

                            const exerciseDetails = exercisesOptions.items.find(
                              (item) =>
                                item.value === Number(selectedExerciseId) // Convert to string for comparison
                            );
                            if (!exerciseDetails) {
                              console.error(
                                'Упражнение не найдено',
                                selectedExerciseId
                              );
                            }

                            updatedExercises[exerciseIndex] = {
                              id: Number(selectedExerciseId),
                            } as ExerciseType;

                            const totalPoints = updatedExercises.reduce(
                              (sum, exercise) => {
                                const details = exercisesOptions.items.find(
                                  (item) => item.value === exercise.id // Convert to string for comparison
                                );
                                return (
                                  sum + (details?.points ? details.points : 0)
                                );
                              },
                              0
                            );

                            const totalCalories = updatedExercises.reduce(
                              (sum, exercise) => {
                                const details = exercisesOptions.items.find(
                                  (item) => item.value === exercise.id
                                );
                                return (
                                  sum +
                                  (details?.calories ? details.calories : 0)
                                );
                              },
                              0
                            );

                            updateExercises(dayIndex, updatedExercises);
                            updatePoints(dayIndex, 'points', totalPoints);
                            updatePoints(dayIndex, 'calories', totalCalories);
                          }}
                        >
                          <SelectTrigger p={2} borderRadius={5}>
                            <SelectValueText placeholder='Выберите упражнение'>
                              {exercise
                                ? exercisesOptions.items.find(
                                    (item) => item.value === exercise.id
                                  )?.label
                                : ''}
                            </SelectValueText>
                          </SelectTrigger>
                          <SelectContent p={4} color={textColor}>
                            {exercisesOptions.items.map((option) => (
                              <SelectItem item={option} key={option.value} justifyContent='flex-start' my={1}>
                                <Avatar name={option.label} src={option.image} size='lg' />
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
                  size='md'
                  variant='outline'
                  borderRadius='xl'
                  onClick={() => addExercise(dayIndex)}
                >
                  <IoAddCircleOutline />
                  Добавить упражнение
                </Button>
              </Flex>
            </Box>
          ))}

          <Button
            p={3}
            onClick={addDay}
            width={200}
            alignSelf='flex-center'
            borderRadius={10}
            mt={4}
            minW='10ch'
            variant='surface'
            colorPalette='green'
          >
            Добавить день <IoAddCircleOutline />
          </Button>
        </Box>
      </Grid>
    </>
  );
}
