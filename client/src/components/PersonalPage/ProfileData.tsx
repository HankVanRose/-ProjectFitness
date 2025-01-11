import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { useEffect, useState } from 'react';
import SideBarComp from './SideBarComp';
import {
  fetchUpdateProfile,
  fetchUserCheck,
  userActivePlan,
} from '../../store/thunkActions';
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
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/types';

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

  const [activeTab, setActiveTab] = useState<number>(() => {
    const savedTab = localStorage.getItem('activeProfileTab');
    return savedTab ? Number(savedTab) : 0;
  });

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<string>('');

  // const [formData, setFormData] = useState<FormData>({
  //   id: 0,
  //   age: 0,
  //   gender: '',
  //   height: '',
  //   weight: '',
  //   goal: '',
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  const [formData, setFormData] = useState<Partial<UserType>>({});
  const [modifiedFields, setModifiedFields] = useState<Set<keyof UserType>>(
    new Set()
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserCheck());
    }
  }, [dispatch, user]);

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
        // password: '',
      });
      dispatch(userActivePlan(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    localStorage.setItem('activeProfileTab', activeTab.toString());
  }, [activeTab]);

  console.log(formData);
  // const focusBg = useColorModeValue('blue.500', 'blue.900'); // фон при фокусе
  const editingBg = useColorModeValue('green.50', 'green.900'); // фон при изменении

  // изменение значений в полях
  const handleInputChange = (field: keyof UserType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // setIsFormModified(true);
    setModifiedFields((prev) => {
      const newModifiedFields = new Set(prev);
      newModifiedFields.add(field);
      return newModifiedFields;
    });
  };

  const handleGenderChange = (e: { value: string[] }) => {
    const selectedGender = e.value[0];
    setFormData((prev) => ({
      ...prev,
      gender: selectedGender,
    }));
    setModifiedFields((prev) => {
      const newModifiedFields = new Set(prev);
      newModifiedFields.add('gender');
      return newModifiedFields;
    });
  };

  const handleGoalChange = (e: { value: string[] }) => {
    const selectedGoal = e.value[0];
    setFormData((prev) => ({
      ...prev,
      goal: selectedGoal,
    }));
    setModifiedFields((prev) => {
      const newModifiedFields = new Set(prev);
      newModifiedFields.add('goal');
      return newModifiedFields;
    });
  };

  // редирект на страницу планов, при их отсуствии в ЛК
  const redirectPlanHandlet = () => {
    navigate('/card');
  };

  // переключение изменения полей
  const handleEditing = (field: string) => {
    setIsEditing((prev) => (prev === field ? '' : field));
  };

  const handleSave = () => {
    // e.preventDefault();
    const dataToUpdate: Partial<UserType> = {
      id: user?.id,
    };

    modifiedFields.forEach((field) => {
      if (field !== 'id' && formData[field] !== undefined) {
        (dataToUpdate[field as keyof UserType] as string | number) = formData[field];
      }
    });

    dispatch(
      fetchUpdateProfile(dataToUpdate)
      // fetchUpdateProfile({
      //   id: user!.id,
      //   age: Number(formData.age),
      //   gender: formData.gender,
      //   height: formData.height,
      //   weight: formData.weight,
      //   goal: formData.goal,
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password,
      // })
    ).then((result) => {
      if (fetchUpdateProfile.fulfilled.match(result)) {
        setModifiedFields(new Set());
        console.log('Профиль обновлен');
        setIsEditing('');
      } else {
        console.log('Ошибка обновления');
      }
    });
  };

  const isSaveButtonDisabled = modifiedFields.size === 0;

  const editableField = (
    field: keyof FormData,
    label: string,
    type = 'text'
  ) => {
    const isEditingField = isEditing === field;

    return (
      <Stack width='100%' minW='20ch'>
        <Field label={label} mb={4} width='100%' minW='20ch'>
          <InputGroup
            width='100%'
            minW='20ch'
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
              width='500px'
              minWidth='500px'
              minW='20ch'
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

            <Text textStyle='sm' mb={0}>
              Пол
            </Text>
            <SelectRoot
              maxWidth='500px'
              minW='20ch'
              mb={4}
              collection={frameworks}
              value={formData.gender ? [formData.gender] : []}
              // onValueChange={(value) =>
              //   handleInputChange('gender', value)
              // }
              onValueChange={handleGenderChange}
              // disabled={isEditing !== 'gender'}
              // _disabled={{
              //   opacity: 1,
              //   cursor: 'not-allowed',
              //   color: 'inherit',
              // }}
              onClick={() => handleEditing('gender')}
            >
              <SelectTrigger
                bg={isEditing === 'gender' ? editingBg : undefined}
              >
                <SelectValueText placeholder='Выберите пол'>
                  {(items) => {
                    const selectedGender = frameworks.items.find(
                      (framework) => framework.value === formData.gender
                    );
                    return selectedGender
                      ? selectedGender.label
                      : 'Выберите пол';
                  }}
                </SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((framework) => (
                  <SelectItem item={framework} key={framework.value}>
                    {framework.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            {editableField('height', 'Рост')}
            {editableField('weight', 'Вес')}

            <SelectRoot
              mb={6}
              collection={goals}
              value={formData.goal ? [formData.goal] : []}
              onValueChange={handleGoalChange}
              // disabled={isEditing !== 'goal'}
              // bg={isEditing === 'goal' ? editingBg : undefined}
              onClick={() => handleEditing('goal')}
            >
              <SelectLabel>Моя цель</SelectLabel>
              <SelectTrigger bg={isEditing === 'goal' ? editingBg : undefined}>
                <SelectValueText placeholder='Выберите цель'>
                  {(items) => {
                    const selectedGoal = goals.items.find(
                      (goal) => goal.value === formData.goal
                    );
                    return selectedGoal ? selectedGoal.label : 'Выберите цель';
                  }}
                </SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {goals.items.map((one) => (
                  <SelectItem item={one} key={one.value}>
                    {one.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Button
              minW='10ch'
              variant='surface'
              colorPalette='green'
              borderRadius='sm'
              onClick={handleSave}
              className='mt-3'
              disabled={isSaveButtonDisabled}
            >
              Сохранить
            </Button>
          </>
        );

      case 1:
        return (
          <>
            <Stack>
              <Field label='ID' mb={4}>
                <Input
                  type='text'
                  value={user ? `${user?.id}` : 'ID пользователя'}
                  name='id'
                  disabled
                  _disabled={{
                    opacity: 1,
                    cursor: 'not-allowed',
                    color: 'inherit',
                  }}
                  pl={4}
                  aria-label='ID пользователя'
                  aria-describedby='basic-addon3'
                />
              </Field>
            </Stack>

            {editableField('username', 'Имя пользователя')}
            {editableField('email', 'Email', 'email')}
            {editableField('password', 'Пароль', 'password')}
            <Button
              minW='10ch'
              variant='surface'
              colorPalette='green'
              borderRadius='sm'
              onClick={handleSave}
              className='mt-3'
              disabled={isSaveButtonDisabled}
            >
              Сохранить
            </Button>
          </>
        );

      case 2:
        return (
          <>
            {userplan?.length === 0 ? (
              <Stack>
              <Text color={{ base: 'black', _dark: 'white' }}>
                Пока нет выбранных тренировок
              </Text>
                <Button
                  minW='10ch'
                  variant='surface'
                  colorPalette='green'
                  borderRadius='sm'
                  onClick={redirectPlanHandlet}
                  className='mt-3'
                >
                  Добавить план
                </Button>
              </Stack>
            ) : (
              <VStack gap={4} align='start'>
                {userplan?.map((plan) => (
                  <Box
                    key={plan.planId}
                    p={4}
                    borderWidth='1px'
                    borderRadius='md'
                    w='full'
                  >
                    <Text fontWeight='bold'>
                      Название плана: {plan.Plan?.name || 'Не указано'}
                    </Text>
                    <Text>
                      Статус: {plan.isCompleted ? 'Завершен' : 'В процессе'}
                    </Text>
                    {plan.Plan?.image && (
                      <Image
                        src={plan.Plan.image}
                        alt={plan.Plan.name || 'План'}
                        maxW='100%'
                        borderRadius='8px'
                      />
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </>
        );
      default:
        return (
          <Text>
            Выберите вкладку
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
        </Box>
      </HStack>
    </Container>
  );
}
