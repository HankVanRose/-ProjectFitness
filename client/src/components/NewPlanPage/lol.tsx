import { ExerciseType } from '@/types';
import { Field, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '@ark-ui/react';
import { createListCollection, Stack } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Split into a separate component
const DifficultySelect = React.memo(({ value, onChange }) => {
  const difficultyOptions = useMemo(() => createListCollection({
    items: [
      { value: 'easy', label: 'Низкая' },
      { value: 'medium', label: 'Средняя' },
      { value: 'hard', label: 'Высокая' },
    ],
  }), []);

  return (
    <Field label='Сложность'>
      <SelectRoot
        collection={difficultyOptions}
        value={value}
        onValueChange={(ValueChangeDetails) => {
          const newValue = Array.isArray(ValueChangeDetails.value)
            ? ValueChangeDetails.value[0]
            : ValueChangeDetails.value;
          onChange(newValue);
        }}
      >
        <SelectTrigger p={2} borderRadius={4}>
          <SelectValueText placeholder='Выберите сложность'>
            {value ? difficultyOptions.items.find(
              (item) => item.value === value
            )?.label : ''}
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
  );
});

// Split day management into a separate component
const DayManager = React.memo(({ days, onDayChange, exercises }) => {
  const handleExerciseChange = useCallback((dayIndex: number, exercises: ExerciseType[]) => {
    onDayChange(dayIndex, 'Exercises', exercises);
  }, [onDayChange]);

  return (
    <Stack spacing={4}>
      {days.map((day, index) => (
        <DayExercises 
          key={index}
          day={day}
          dayIndex={index}
          exercises={exercises}
          onExerciseChange={(exercises) => handleExerciseChange(index, exercises)}
        />
      ))}
    </Stack>
  );
});

export default function NewPlanForm() {
  const { VITE_API } = import.meta.env;
  
  // Use React Hook Form instead of multiple useState
  const { control, handleSubmit, reset } = useForm<PlanType>({
    defaultValues: {
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
    }
  });

  const [days, setDays] = useState<Omit<DayExercise[], 'planId'>>([]);
  const [allExercises, setAllExercises] = useState<ExerciseType[]>([]);

  // Memoize exercises options
  const exercisesOptions = useMemo(() => 
    createListCollection({
      items: allExercises.map((exercise) => ({
        value: exercise.id,
        points: exercise.points,
        label: exercise.name,
        calories: exercise.calories,
        image: exercise.image,
      })),
    }), [allExercises]
  );

  // Memoize fetch exercises function
  const fetchExercises = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  // Memoize handlers
  const handleDayChange = useCallback((
    index: number,
    field: keyof DayExercise,
    value: any
  ) => {
    setDays(prevDays => {
      const newDays = [...prevDays];
      newDays[index] = {
        ...newDays[index],
        [field]: value
      };
      return newDays;
    });
  }, []);

  const addDay = useCallback(() => {
    setDays(prevDays => [...prevDays, {
      points: 0,
      description: '',
      title: '',
      type: '',
      target: '',
      rounds: 0,
      calories: 0,
      Exercises: [],
    } as DayExercise]);
  }, []);

  const onSubmit = useCallback(async (formData: PlanType) => {
    try {
      const create = await axiosInstance.post(
        `${VITE_API}/days/newPlan/day/exercises`,
        {
          ...formData,
          days,
        }
      );

      if (create) {
        reset();
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
      setError('Ошибка при создании плана');
      console.error(error);
      
      toaster.create({
        title: 'Ошибка.',
        description: 'Произошла ошибка при создании плана. Пожалуйста, попробуйте еще раз.',
        type: 'warning',
        duration: 5000,
      });
    }
  }, [days, VITE_API, navigate, reset]);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns='repeat(2, 1fr)' p={10}>
          <Box display='flex' p={5}>
            <Fieldset.Root size='lg'>
              <Stack>
                <Fieldset.Legend fontWeight={600} display='flex' alignItems='center'>
                  Создать новый план тренировок{' '}
                  <IconButton variant='ghost' size='xs' borderRadius={10}>
                    <GrPlan />
                  </IconButton>
                </Fieldset.Legend>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Field label='Название'>
                      <Input
                        p={2}
                        placeholder='Название плана'
                        {...field}
                      />
                    </Field>
                  )}
                />

                {/* Add other form fields using Controller */}
                
                <DayManager 
                  days={days}
                  onDayChange={handleDayChange}
                  exercises={exercisesOptions}
                />

                <Button type="submit">Создать план</Button>
              </Stack>
            </Fieldset.Root>
          </Box>
        </Grid>
      </form>
    </>
  );
}
