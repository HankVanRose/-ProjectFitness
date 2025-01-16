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

const PlanForm = () => {
  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="50vw"
      p={5}
    >
      <Fieldset.Root size="lg" maxW="xl">
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
            <Field label="Название плана">
              <Input name="name" p={2} />
            </Field>

            <Field label="URL картинки">
              <Input name="image" p={2} />
            </Field>

            <Field label="Краткое описание">
              <Input name="shortDescription" p={2} />
            </Field>

            <Field label="Необходимое оборудование">
              <Input name="equipment" p={2} />
            </Field>

            <Field label="Сложность">
              <NativeSelectRoot>
                <NativeSelectField
                  p={2}
                  name="difficulty"
                  items={['Низкая', 'Средняя', 'Высокая']}
                  bg={bgColor}
                />
              </NativeSelectRoot>
            </Field>

            <Field label="Длительность в неделях">
              <Input name="weeksDuration" min={1} p={2} />
            </Field>

            <Field label="Количество дней">
              <Input name="numOfSessions" min={1} p={2} />
            </Field>

            <Field label="Количество дней в неделю">
              <Input name="sessionsPerWeek" min={1} max={7} p={2} />
            </Field>

            <Field label="Слоган">
              <Input name="slogan" p={2} />
            </Field>

            <Box gridColumn="span 2">
              <Field label="Описание">
                <Textarea name="longDescription" rows={2} p={2} />
              </Field>
            </Box>

            <Box gridColumn="span 2">
              <Field label="Weeks Description">
                <Textarea name="weeksDescription" rows={2} p={2} />
              </Field>
            </Box>
          </Grid>
        </Fieldset.Content>

        <Button
          type="submit"
          width={200}
          alignSelf="flex-center"
          borderRadius={10}
          mt={4}
        >
          Создать план
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

export default PlanForm;
