import {
  Box,
  Button,
  createListCollection,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Field } from '@/components/ui/field';
import axiosInstance from '@/axiosInstance';
import { setError, setLoading } from '@/store/appSlice';
import { DayExercise, ExerciseType, PlanType } from '@/types';

export default function NewPlanForm() {
  const { VITE_API } = import.meta.env;
  const [plan, setPlan] = useState<PlanType>({
    id: 0,
    name: '',
    shortDescription: '',
    equipment: '',
    difficulty: '',
    image: '',
    slogan: '',
    weeksDuration: 0,
    numOfSessions: 0,
    longDescription: '',
    weeksDescription: '',
    sessionsPerWeek: 0,
  });
  const [days, setDays] = useState<DayExercise[]>([]);
  const [allExercises, setAllExercises] = useState<ExerciseType[]>([]);

  useEffect(() => {
    const allExercises = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${VITE_API}/exercise`);
        setAllExercises(res.data);
      } catch (error) {
        setError('Ошибка при загрузке упражнений');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    allExercises();
  }, [VITE_API]);

  const handleChange = (field: keyof PlanType, value: string | number) => {
    setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  }

  const addDay = () => {
    setDays((prevDays) => [...prevDays, { points: 0, Exercises: [] }]);
  };

  const removeDay = (index: number) => {
    setDays((prevDays) => prevDays.filter((_, ind) => ind !== index));
  };
  
  const addExercise = (dayIndex: number) => {
      setDays((prevDays) => {
          const updatedDays = [...prevDays];
          updatedDays[dayIndex].Exercises.push(null); //! почему строка? 
          return updatedDays;
        })  
    };

      const updateDay = (
        dayIndex: number,
        field: string,
        value: string | number
      ) => {
        setDays((prevDays) => 
          prevDays.map((day, index) =>
            index === dayIndex ? { ...day, [field]: value } : day
          )
        );
      };
    
  const handleSubmit = async () => {
    try {
      const resp = await axiosInstance.post(
        `${VITE_API}/days/newPlan/day/exercises`,
        { ...plan,
            days,
        }
      );
      console.log(resp.data);
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
      value: exercise.id.toString(),
      label: exercise.name,
    })),
  });

  return (
    <Box maxW='container.md' mx='auto' py={8}>
      <Heading mb={6}>Создать новый план</Heading>
      <VStack gap={6} as='form'>
        <Field label='Название'>
          <Input
            placeholder='Название плана'
            name={plan.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Field>

        <Field label='Краткое описание'>
          <Input
            placeholder='Краткое описание'
            name={plan.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
          />
        </Field>

        <Field label='Детальное описание'>
          <Input
            placeholder='Детальное описание'
            name={plan.longDescription}
            onChange={(e) => handleChange('longDescription', e.target.value)}
          />
        </Field>

        <Field label='Оборудование'>
          <Input
            placeholder='Укажите оборудование'
            name={plan.equipment}
            onChange={(e) => handleChange('equipment', e.target.value)}
          />
        </Field>

        <Field label='Сложность'>
          <SelectRoot mb={4} collection={difficultyOptions}>
            <SelectTrigger>
              <SelectValueText placeholder='Выберите сложность'></SelectValueText>
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

        <Field label='Продолжительность (в неделях)'>
          <Input
            type='number'
            placeholder='Количество недель'
            name={plan.weeksDuration.toString()}
            onChange={(e) => handleChange('weeksDuration', e.target.value)}
            min={1}
          />
        </Field>

        <Field label='Тренировки в неделю'>
          <Input
            type='number'
            placeholder='Количество тренировок в неделю'
            name={plan.sessionsPerWeek.toString()}
            onChange={(e) => handleChange('sessionsPerWeek', e.target.value)}
            min={1}
          />
        </Field>

        <Heading size='md' mt={8}>
          Дни
        </Heading>
        {days.map((day, dayIndex) => (
          <Box
            key={dayIndex}
            p={4}
            borderWidth={1}
            borderRadius='md'
            mb={4}
            w='full'
          >
            <Field label='Очки за день'>
              <Input
                type='number'
                placeholder='Очки'
                value={day.points}
                onChange={(e) =>
                  updateDay(dayIndex, 'points', Number(e.target.value))
                }
              />
            </Field>

            <Heading size='sm' mt={4}>
              Упражнения
            </Heading>
            {day.Exercises.map((exerciseId, exerciseIndex: number) => (
              <Field key={exerciseIndex} mt={2} label='Выберите упражнение'>
                <SelectRoot
                  mb={4}
                  collection={exercisesOptions}
                  onValueChange={(value) => {
                    const updatedExercises = [...day.Exercises];
                    updatedExercises[exerciseIndex] = Number(value);
                    updateDay(dayIndex, 'Exercises', updatedExercises);
                  }}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder='Выберите упражнение'>
                      {exerciseId
                        ? exercisesOptions.items.find(
                            (item) => item.value === exerciseId.toString()
                          )?.label
                        : ''}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent>
                    {exercisesOptions.items.map((option) => (
                      <SelectItem item={option} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            ))}

            <Button
              mt={4}
              colorScheme='green'
              onClick={() => addExercise(dayIndex)}
            >
              Добавить упражнение
            </Button>
          </Box>
        ))}

        <Button mt={4} colorScheme='green' onClick={addDay}>
          Добавить день
        </Button>

        <Button
          type='submit'
          colorScheme='teal'
          size='lg'
          mt={6}
          onClick={handleSubmit}
        >
          Создать план
        </Button>
      </VStack>
    </Box>
  );
}
