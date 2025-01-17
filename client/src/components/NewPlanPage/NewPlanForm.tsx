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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { Toaster, toaster } from '@/components/ui/toaster';

 function NewPlanForm() {
  const { VITE_API } = import.meta.env  
  
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
  const navigate = useNavigate();

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

  const handleChange = useCallback(
    (field: keyof PlanType, value: string | number) => {
      setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
    },
    []
  );

  const handleChangeDay = useCallback(
    (field: keyof DayExercise, index: number, value: string | number) => {
      setDays((prevDays) => {
        const newDays = [...prevDays];
        newDays[index] = { ...newDays[index], [field]: value };
        return newDays;
      });
    },
    []
  );

  const addDay = useCallback(() => {
    setDays((prevDays) => [
      ...prevDays,
      {
        planId: 0,
        points: 0,
        description: '',
        title: '',
        type: '',
        target: '',
        rounds: 0,
        calories: 0,
        Exercises: [],
      } as DayExercise,
    ]);
  }, []);
  const addExercise = (dayIndex: number) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].Exercises.push({} as ExerciseType);
      return updatedDays;
    });
  };
  // const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    try {
      const create = await axiosInstance.post(`${VITE_API}/days/newPlan/day/exercises`, {
        ...plan,
        days,
      });

      if (create) {
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
        
        toaster.create({
          title: 'Новый план создан',
          description: 'Ваш план был успешно добавлен в список планов!',
          type: 'success',
          duration: 5000,
        });

        setTimeout(() => {
          navigate(`/plans`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Ошибка.',
        description: 'Произошла ошибка при создании плана. Пожалуйста, попробуйте еще раз.',
        type: 'warning',
        duration: 5000,
      });
    }
  }, [plan, days, navigate]);



  const difficultyOptions = useMemo(
    () =>
      createListCollection({
        items: [
          { value: 'easy', label: 'Низкая' },
          { value: 'medium', label: 'Средняя' },
          { value: 'hard', label: 'Высокая' },
        ],
      }),
    []
  );

  const exercisesOptions = useMemo(
    () =>
      createListCollection({
        items: allExercises.map((exercise) => ({
          value: exercise.id,
          points: exercise.points,
          label: exercise.name,
          calories: exercise.calories,
          image: exercise.image,
        })),
      }),
    [allExercises]
  );
  const typeOptions = useMemo(
    () =>
      createListCollection({
        items: [
          { value: 'ASAP', label: 'ASAP - На скорость' },
          { value: 'AMRAP', label: 'AMRAP - На количество' },
          { value: 'No Time', label: 'No Time - Без учета времени' },
        ],
      }),
    []
  );

  const targetOptions = useMemo(
    () =>
      createListCollection({
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
          {
            value: 'грудь + трицепс + дельты',
            label: 'грудь + трицепс + дельты',
          },
          { value: 'спина + грудь + дельты', label: 'спина + грудь + дельты' },
        ],
      }),
    []
  );

  const textColor = useColorModeValue('black', 'white');

  const updatePoints = useCallback((dayIndex: number, field: string, value: number) => {
    setDays((prevDays) => {
      const newDays = [...prevDays];
      newDays[dayIndex] = {
        ...newDays[dayIndex],
        [field]: value,
      };
      return newDays;
    });
  }, []);

  const updateExercises = useCallback((dayIndex: number, exercises: ExerciseType[]) => {
    setDays((prevDays) => {
      const newDays = [...prevDays];
      newDays[dayIndex].Exercises = exercises;
      return newDays;
    });
  }, []);

  return (
    <>
      <Toaster />
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
              * Нажмите на эту кнопку только после добавления всех тренировок
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
                Добавить тренировки в мой план
                <IconButton variant={'ghost'} size='xs' borderRadius={10}>
                  <CiCalendar />
                </IconButton>
              </Fieldset.Legend>
              <Fieldset.HelperText mb={5}>
                Здесь вы можете добавить столько тренировок, сколько хотите
                выполнить в рамках своего плана
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
                    placeholder='Название тренировки'
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
                      <SelectValueText placeholder='Выберите тип тренировки'>
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

                <Field label='Задача тренировки'>
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
                      <SelectValueText placeholder='Выберите задачу'>
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
                      placeholder='Описание тренировки'
                      value={day.description}
                      onChange={(e) =>
                        handleChangeDay('description', dayIndex, e.target.value)
                      }
                    />
                  </Field>
                </Box>

                <Field label='Очки за тренировку'>
                  <Input
                    type='number'
                    placeholder='Очки'
                    value={day.points}
                    p={3}
                    disabled
                    _disabled={{ opacity: 1, color: 'inherit' }}
                    borderRadius='xl'
                    onChange={(e) =>
                      updatePoints(dayIndex, 'points', Number(e.target.value))
                    }
                  />
                </Field>
                <Field label='Калории, сожженные за тренировку'>
                  <Input
                    type='number'
                    placeholder='Калории'
                    value={day.calories}
                    p={3}
                    disabled
                    _disabled={{ opacity: 1, color: 'inherit' }}
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
                          opacity={1}
                          color='inherit'
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
                          <SelectTrigger p={2} borderRadius={5} >
                            <SelectValueText placeholder='Выберите упражнение'>
                              {exercise
                                ? exercisesOptions.items.find(
                                    (item) => item.value === exercise.id
                                  )?.label
                                : ''}
                            </SelectValueText>
                          </SelectTrigger>
                          <SelectContent p={4} color={textColor} >
                            {exercisesOptions.items.map((option) => (
                              <SelectItem
                                item={option}
                                key={option.value}
                                justifyContent='flex-start'
                                my={1}
                              >
                                <Avatar
                                  name={option.label}
                                  src={option.image}
                                  size='lg'
                                />
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
            Добавить тренировку <IoAddCircleOutline />
          </Button>
        </Box>
      </Grid>
    </>
  );
}
export default React.memo(NewPlanForm);