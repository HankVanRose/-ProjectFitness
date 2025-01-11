import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import SideBarComp from './SideBarComp';
import { fetchUpdateProfile, userActivePlan } from '../../store/thunkActions';
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Input,
  Stack,
  VStack,
  Text,
  Heading,
  Image,
} from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { FiEdit, FiCheck } from 'react-icons/fi';
import { useColorModeValue } from '../ui/color-mode';
import { createListCollection } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Field } from '@/components/ui/field';
import { setLoading } from '@/store/appSlice';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: number;
  age: number;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  username: string;
  email: string;
  password: string;
}

export default function ProfileData() {
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const { userplan } = useAppSelector((store) => store.appSlice);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isFormModified, setIsFormModified] = useState(false); //изменение формы

  useEffect(() => {
    if (user) {
      dispatch(userActivePlan(user?.id));
    } else {
      setLoading(true);
    }
  }, [user?.id]);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    age: 0,
    gender: '',
    height: '',
    weight: '',
    goal: '',
    username: '',
    email: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState<string>('');

  // const focusBg = useColorModeValue('blue.500', 'blue.900'); // фон при фокусе
  const editingBg = useColorModeValue('green.50', 'green.900'); // фон при изменении
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || 0,
        age: user.age || 0,
        gender: user.gender || '',
        height: user.height || '',
        weight: user.weight || '',
        goal: user.goal || '',
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  // изменение значений в полях
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsFormModified(true);
  };

  // редирект на страницу планов, при их отсуствии в ЛК

  const redirectPlanHandlet = () => {
    navigate('/card')
  }

  // переключение изменения полей
  const handleEditing = (field: string) => {
    setIsEditing((prev) => (prev === field ? '' : field));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchUpdateProfile({
        id: user!.id,
        age: Number(formData.age),
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
        goal: formData.goal,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
    setIsFormModified(false);
    setIsEditing('');
  };

  const editableField = (
    field: keyof FormData,
    label: string,
    type = 'text'
  ) => {
    const isEditingField = isEditing === field;

    return (
      <Stack>
        <Field label={label} mb={4}>
          <InputGroup
            endElement={
              <IconButton
                h='1.75rem'
                size='sm'
                aria-label={isEditingField ? 'Save' : 'Edit'}
                onClick={() => handleEditing(field)}
                variant='ghost'
              >
                {isEditingField ? <FiCheck /> : <FiEdit />}
              </IconButton>
            }
          >
            <Input
              type={type}
              placeholder={label}
              _placeholder={{
                color: 'inherit',
                opacity: 1,
              }}
              value={formData[field] ?? ''}
              name={field}
              onChange={(e) => handleInputChange(field, e.target.value)}
              disabled={!isEditingField}
              _disabled={{
                opacity: 1,
                cursor: 'not-allowed',
                color: 'inherit',
              }}
              bg={isEditingField ? editingBg : undefined}
              // _focus={{ bg: focusBg }}
              onClick={() => !isEditingField && handleEditing(field)}
              pl={4}
            />
          </InputGroup>
        </Field>
      </Stack>
    );
  };

  const frameworks = createListCollection({
    items: [
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
    ],
  });

  const goals = createListCollection({
    items: [
      { value: 'Сбросить вес', label: 'Сбросить вес' },
      { value: 'Стать сильнее', label: 'Стать сильнее' },
      { value: 'Уменьшить стресс', label: 'Уменьшить стресс' },
      { value: 'Повысить выносливость', label: 'Повысить выносливость' },
    ],
  });

  const content = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            {editableField('age', 'Возраст', 'number')}

            <Stack>
              <Text textStyle='sm' mb={0}>Пол</Text>
              <SelectRoot
                mb={4}
                collection={frameworks}
                value={formData.gender ?? ''}
                onValueChange={(value: ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange('gender', e.target.value)
                }
                disabled={isEditing !== 'gender'}
                bg={isEditing === 'gender' ? editingBg : undefined}
                onClick={() => !isEditing && handleEditing('gender')}
              >
                <SelectTrigger>
                  <SelectValueText placeholder='Выберите пол'></SelectValueText>
                </SelectTrigger>
                <SelectContent>
                  {frameworks.items.map((framework) => (
                    <SelectItem item={framework} key={framework.value}>
                      {framework.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Stack>

            {editableField('height', 'Рост')}
            {editableField('weight', 'Вес')}

            <Stack>
              <SelectRoot
                color={{ base: 'black', _dark: 'white' }}
                mb={6}
                collection={goals}
                value={formData.goal || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange('goal', e.target.value)
                }
                disabled={isEditing !== 'goal'}
                bg={isEditing === 'goal' ? editingBg : undefined}
                onClick={() => !isEditing && handleEditing('goal')}
              >
                <SelectLabel>Моя цель</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder='Выберите цель'></SelectValueText>
                </SelectTrigger>
                <SelectContent color={{ base: 'black', _dark: 'white' }}>
                  {goals.items.map((one) => (
                    <SelectItem item={one} key={one.value}>
                      {one.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Stack>

            {/* <Form className={styles.form}> */}
            {/* <Form.Label>Выберите оборудование</Form.Label>
            {['Коврик', 'Гантели', 'Резинки', 'Утяжелители'].map((item) => (
              <Form.Check
                key={item}
                type='checkbox'
                id={`checkbox-${item}`}
                label={item}
                checked={formData.equipment.includes(item)}
                onChange={(e) => {
                  const updatedEquipment = e.target.checked
                    ? [...formData.equipment, item]
                    : formData.equipment.filter((equip) => equip !== item);
                  handleFieldChange('equipment', updatedEquipment);
                }}
              />
            ))} */}
            {/* </Form> */}
          </>
        );

      case 1:
        return (
          <>
            <Stack>
              <Field
                label='ID'
                mb={4}
                color={{ base: 'black', _dark: 'white' }}
              >
                <Input
                  color={{ base: 'black', _dark: 'white' }}
                  type='text'
                  value={user ? `${user?.id}` : 'ID пользователя'}
                  name='id'
                  disabled
                  pl={4}
                  aria-label='ID пользователя'
                  aria-describedby='basic-addon3'
                />
              </Field>
            </Stack>

            {editableField('username', 'Имя пользователя')}
            {editableField('email', 'Email', 'email')}
            {editableField('password', 'Пароль', 'password')}
          </>
        );

      case 2:
        return (
          <>
            {userplan?.length === 0 ? (
              <Text color={{ base: 'black', _dark: 'white' }}>
                Нет тренировок
                <Button minW='10ch'
            variant='surface'
            colorPalette='green'
            borderRadius='sm'
            onClick={redirectPlanHandlet}
            className='mt-3'> ДОБАВИТЬ ПЛАН </Button>
              </Text>
            ) : (
              <VStack gap={4} align='start'>
                {userplan?.map((plan) => (
                  <Box
                  key={plan.planId}
                  p={4}
                  borderWidth='1px'
                  borderRadius='md'
                  w='full'>
                    <Text fontWeight='bold'>Название плана: {plan.Plan?.name || "Не указано"}</Text>
                    <Text>Статус: {plan.isCompleted ? 'Завершен' : 'В процессе'}</Text>
                    {plan.Plan?.image && (
                      <Image
                      src={plan.Plan.image}
                      alt={plan.Plan.name || 'План'}
                      maxW='100%' borderRadius='8px' />
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </>
        );
      default:
        return (
          <Text color={{ base: 'black', _dark: 'white' }}>
            Выберите вкладку.{' '}
          </Text>
        );
    }
  };

  return (
    <Container>
      <HStack alignItems='flex-start'>
        <VStack mx={10} mt={90}>
          <SideBarComp activeTab={activeTab} setActiveTab={setActiveTab} />
        </VStack>
        <Box flex={1} mr={10}>
          <Heading mb={7}>Профиль атлета</Heading>
          {content()}
          <Button
            minW='10ch'
            variant='surface'
            colorPalette='green'
            borderRadius='sm'
            onClick={handleSave}
            className='mt-3'
          >
            Сохранить
          </Button>
        </Box>
      </HStack>
    </Container>
  );
}
