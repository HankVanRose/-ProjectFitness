import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
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

interface Day {
    id: number;
  planId: number;
  points: number;
}

export default function NewPlanForm() {
  const { VITE_API } = import.meta.env;

  const [days, setDays] = useState<Day[]>([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const allExercises = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/exercise`);
        setExercises(res.data);
      } catch (error) {
        setError('Ошибка при загрузке упражнений');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    allExercises();
  }, [VITE_API]);

  const addDay = () => {
      setDays((prevDays) => [...prevDays, { exercises: [], points: 0 },]);
  }

  const difficultyOptions = createListCollection({
    items: [
      { value: 'easy', label: 'Низкая' },
      { value: 'medium', label: 'Средняя' },
      { value: 'hard', label: 'Высокая' },
    ],
  });

  const exercisesOptions = createListCollection({
    items: [
      { value: 'easy', label: 'Низкая' },
      { value: 'medium', label: 'Средняя' },
      { value: 'hard', label: 'Высокая' },
    ],
  });

  return (
    <Box maxW='container.md' mx='auto' py={8}>
      <Heading mb={6}>Создать новый план</Heading>
      <VStack gap={6} as='form'>
        <Field label='Название'>
          <Input placeholder='Название плана' name='name' />
        </Field>

        <Field label='Краткое описание'>
          <Input placeholder='Краткое описание' name='shortDescription' />
        </Field>

        <Field label='Детальное описание'>
          <Input placeholder='Детальное описание' name='longDescription' />
        </Field>

        <Field label='Оборудование'>
          <Input placeholder='Укажите оборудование' name='equipment' />
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
            name='weeksDuration'
            min={1}
          />
        </Field>

        <Field label='Тренировки в неделю'>
          <Input
            type='number'
            placeholder='Количество тренировок в неделю'
            name='sessionsPerWeek'
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
                onChange={(e) => handleInputChange(e, dayIndex, 'points')}
              />
            </Field>

            <Heading size='sm' mt={4}>
              Упражнения
            </Heading>
            {day.exercises.map((_, exerciseIndex: number) => (
              <Field key={exerciseIndex} mt={2} label='Выберите упражнение'>
                <SelectRoot mb={4} collection={exercisesOptions}>
                  <SelectTrigger>
                    <SelectValueText placeholder='Выберите упражнение'></SelectValueText>
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

            <Button mt={4} colorScheme='green' onClick={() => addExercise(dayIndex)}>
                Добавить упражнение
            </Button>
          </Box>
        ))}

        <Button mt={4} colorScheme='green' onClick={addDay}> 
            Добавить день
        </Button>

        <Button type='submit' colorScheme='teal' size='lg' mt={6}>
            Создать план
        </Button>
      </VStack>
    </Box>
  );
}
