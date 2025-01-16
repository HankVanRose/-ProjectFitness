import {
  Box,
  Button,
  Fieldset,
  Input,
  Stack,
  Textarea,
  Grid,
  IconButton,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from '@chakra-ui/react';
import { LiaDumbbellSolid } from 'react-icons/lia';
import { MdSportsGymnastics } from 'react-icons/md';
import { Field } from '@/components/ui/field';
import { useColorModeValue } from '../ui/color-mode';
import { Toaster, toaster } from '@/components/ui/toaster';
import { ExerciseType } from '@/types';
import { useState } from 'react';
import axiosInstance from '@/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setError } from '@/store/appSlice';

const ExerciseForm = () => {
  const bgColor = useColorModeValue('white', 'black');
  const { VITE_API } = import.meta.env;
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState<string[]>([]);
  const [exercise, setExercise] = useState<ExerciseType>({
    name: '',
    shortDescription: '',
    longDescription: '',
    shortMuscleGroup: '',
    longMuscleGroup: '',
    calories: 3,
    type: '',
    points: 3,
    equipment: '',
    image: '',
    muscleImage: '',
  });

  const handleChange = (field: keyof ExerciseType, value: string | number) => {
    setExercise((prevExercise) => ({ ...prevExercise, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const create = await axiosInstance.post(`${VITE_API}/exercise`, {
        ...exercise,
      });
      setExercise({
        name: '',
        shortDescription: '',
        longDescription: '',
        shortMuscleGroup: '',
        longMuscleGroup: '',
        calories: 3,
        type: '',
        points: 3,
        equipment: '',
        image: '',
        muscleImage: '',
      });

      setSelectType([]);
      if (create) {
        toaster.create({
          title: 'Новое упражнение создано',
          description: 'Новое упражнение было успешно создано!',
          type: 'success',
          duration: 5000,
        });
        setTimeout(function () {
          navigate(`/exercises`);
        }, 2000);
      } else {
        toaster.create({
          title: 'Ошибка.',
          description:
            'Произошла ошибка при создании упражнения. Пожалуйста, попробуйте еще раз.',
          type: 'warning',
          duration: 5000,
        });
      }
    } catch (error) {
      setError('Ошибка при создании упражнения');
      console.error(error);
    }
  };

  const exerciseTypeOptions = createListCollection({
    items: [
      { value: 'Силовое', label: 'Силовое' },
      { value: 'Кардио', label: 'Кардио' },
      { value: 'Растяжка', label: 'Растяжка' },
      { value: 'Функциональное', label: 'Функциональное' },
    ],
  });

  return (
    <>
      <Toaster />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        w='100%'
        p={5}
      >
        <Fieldset.Root size='lg'>
          <Stack>
            <Fieldset.Legend fontWeight={600}>
              Создать новое упражнение
              <IconButton variant={'ghost'} size='lg' borderRadius={10}>
                <LiaDumbbellSolid />
              </IconButton>
            </Fieldset.Legend>
            <Fieldset.HelperText mb={5}>
              Здесь вы можете создать новое упражнение
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Grid
              templateColumns='repeat(3, 1fr)'
              gap={4}
              w='100%' // Added full width to grid
            >
              <Field label='Название упражнения'>
                <Input
                  name='name'
                  placeholder='Название упражнения'
                  p={2}
                  value={exercise.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </Field>

              <Field label='URL картинки'>
                <Input
                  name='image'
                  p={2}
                  placeholder='https://...'
                  value={exercise.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
              </Field>

              <Field label='Краткое описание'>
                <Input
                  name='shortDescription'
                  p={2}
                  placeholder='Кратко опишите упражнение'
                  value={exercise.shortDescription}
                  onChange={(e) =>
                    handleChange('shortDescription', e.target.value)
                  }
                />
              </Field>

              <Field label='Основная группа мышц'>
                <Input
                  name='shortMuscleGroup'
                  p={2}
                  placeholder='Укажите группу мышц'
                  value={exercise.shortMuscleGroup}
                  onChange={(e) =>
                    handleChange('shortMuscleGroup', e.target.value)
                  }
                />
              </Field>

              <Field label='URL изображения мышц'>
                <Input
                  name='muscleImage'
                  p={2}
                  placeholder='https://...'
                  value={exercise.muscleImage}
                  onChange={(e) => handleChange('muscleImage', e.target.value)}
                />
              </Field>

              <Field label='Необходимое оборудование'>
                <Input
                  name='equipment'
                  p={2}
                  placeholder='коврик, гиря'
                  value={exercise.equipment}
                  onChange={(e) => handleChange('equipment', e.target.value)}
                />
              </Field>

              <Field label='Очки'>
                <Input
                  name='points'
                  type='number'
                  min={3}
                  max={20}
                  p={2}
                  value={exercise.points}
                  onChange={(e) => handleChange('points', e.target.value)}
                />
              </Field>

              <Field label='Калории'>
                <Input
                  name='calories'
                  type='number'
                  min={3}
                  max={18}
                  p={2}
                  value={exercise.calories}
                  onChange={(e) => handleChange('calories', e.target.value)}
                />
              </Field>

              <Field label='Тип упражнения'>
                <SelectRoot
                  collection={exerciseTypeOptions}
                  value={selectType}
                  onValueChange={(ValueChangeDetails) => {
                    const value = Array.isArray(ValueChangeDetails.value)
                      ? ValueChangeDetails.value
                      : [ValueChangeDetails.value];
                    setSelectType(value);
                    handleChange('type', value[0]);
                  }}
                >
                  <SelectTrigger p={2} borderRadius={4}>
                    <SelectValueText placeholder='Выберите тип упражнения'>
                      {selectType.length > 0
                        ? exerciseTypeOptions.items.find(
                            (item) => item.value === exercise.type
                          )?.label
                        : ''}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent p={4}>
                    {exerciseTypeOptions.items.map((type) => (
                      <SelectItem item={type} key={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>

              <Box gridColumn='span 2'>
                <Field label='Подробное описание'>
                  <Textarea
                    name='longDescription'
                    p={2}
                    rows={3}
                    placeholder='Подробно опишите упражнение'
                    value={exercise.longDescription}
                    onChange={(e) =>
                      handleChange('longDescription', e.target.value)
                    }
                  />
                </Field>
              </Box>

              <Box gridColumn='span 2'>
                <Field label='Задействованные мышцы'>
                  <Textarea
                    name='longMuscleGroup'
                    p={2}
                    rows={3}
                    placeholder='Подробно опишите задействованные мышцы'
                    value={exercise.longMuscleGroup}
                    onChange={(e) =>
                      handleChange('longMuscleGroup', e.target.value)
                    }
                  />
                </Field>
              </Box>
            </Grid>
          </Fieldset.Content>

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
            Создать упражнение <MdSportsGymnastics />
          </Button>
        </Fieldset.Root>
      </Box>
    </>
  );
};

export default ExerciseForm;
