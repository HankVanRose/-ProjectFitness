import {
  Box,
  Button,
  Fieldset,
  Input,
  Stack,
  Textarea,
  Grid,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { useColorModeValue } from '../ui/color-mode';

const ExerciseForm = () => {
  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%" // Changed from maxW="xl" to w="100%"
      p={5}
    >
      <Fieldset.Root size="lg">
        <Stack>
          <Fieldset.Legend fontWeight={600}>
            Создать новое упражнение
          </Fieldset.Legend>
          <Fieldset.HelperText mb={5}>
            Здесь вы можете создать новое упражнение
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            w="100%" // Added full width to grid
          >
            <Field label="Название упражнения">
              <Input name="name" p={2} />
            </Field>

            <Field label="URL картинки">
              <Input name="image" p={2} />
            </Field>

            <Field label="Краткое описание">
              <Input name="shortDescription" p={2} />
            </Field>

            <Field label="Основная группа мышц">
              <Input name="shortMuscleGroup" p={2} />
            </Field>

            <Field label="Тип упражнения">
              <NativeSelectRoot variant="outline">
                <NativeSelectField
                  p={2}
                  name="type"
                  bg={bgColor}
                  items={['Силовое', 'Кардио', 'Растяжка', 'Функциональное']}
                />
              </NativeSelectRoot>
            </Field>

            <Field label="Необходимое оборудование">
              <Input name="equipment" p={2} />
            </Field>

            <Field label="Очки">
              <Input name="points" type="number" p={2} />
            </Field>

            <Field label="Калории">
              <Input name="calories" type="number" p={2} />
            </Field>

            <Field label="URL изображения мышц">
              <Input name="muscleImage" p={2} />
            </Field>

            <Box gridColumn="span 2">
              <Field label="Подробное описание">
                <Textarea name="longDescription" p={2} rows={3} />
              </Field>
            </Box>

            <Box gridColumn="span 2">
              <Field label="Задействованные мышцы">
                <Textarea name="longMuscleGroup" p={2} rows={3} />
              </Field>
            </Box>
          </Grid>
        </Fieldset.Content>

        <Button
          type="submit"
          width={250}
          alignSelf="flex-center"
          borderRadius={10}
          mt={4}
        >
          Создать упражнение
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

export default ExerciseForm;
