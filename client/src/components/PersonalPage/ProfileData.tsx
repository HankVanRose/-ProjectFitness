import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { FiEdit, FiCheck, FiEyeOff, FiEye } from 'react-icons/fi';
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
import axiosInstance from '@/axiosInstance';

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
  const { VITE_API } = import.meta.env;
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const { userplan } = useAppSelector((store) => store.appSlice);

  const [activeTab, setActiveTab] = useState<number>(() => {
    const savedTab = localStorage.getItem('activeProfileTab');
    return savedTab ? Number(savedTab) : 0;
  });

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<string>('');
  const [formData, setFormData] = useState<Partial<UserType>>({});
  const [modifiedFields, setModifiedFields] = useState<Set<keyof UserType>>(
    new Set()
  );

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordErrors, setPasswordErrors] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

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
      });
      dispatch(userActivePlan(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    localStorage.setItem('activeProfileTab', activeTab.toString());
  }, [activeTab]);

  // const focusBg = useColorModeValue('blue.500', 'blue.900'); // фон при фокусе
  const editingBg = useColorModeValue('green.50', 'green.900'); // фон при изменении

  // изменение значений в полях
  const handleInputChange = useCallback(
    (field: keyof UserType, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setModifiedFields((prev) => {
        const newModifiedFields = new Set(prev);
        newModifiedFields.add(field);
        return newModifiedFields;
      });
    },
    []
  );

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

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(formData.email)) {
      setEmailError('Некорректный формат email');
      return false;
    }
    setEmailError(null);
    return true;
  }, []);

  const handleEmailChange = useCallback(
    (email: string) => {
      handleInputChange('email', email);
      validateEmail(email);
    },
    [handleInputChange, validateEmail]
  );

  const checkCurrentPassword = useCallback(async () => {
    try {
      const response = await axiosInstance.post(`${VITE_API}/auth/check-password`, {
        userId: user?.id,
        password: passwordData.currentPassword,
      });
      return response.data.isMatch;
    } catch (error) {
      console.error('Ошибка прокерки пароля', error);
      return false;
    }
  }, [user?.id, passwordData.currentPassword, VITE_API]);

  const validatePassword = useCallback(() => {
    const errors: string[] = [];

    if (passwordData.newPassword.length < 8) {
      errors.push('Пароль должен содержать не менее 8 символов');
    }
    if (passwordData.confirmPassword !== passwordData.newPassword) {
      errors.push('Пароли не совпадают');
    }
    const errorMessage = errors.length > 0 ? errors.join('. ') : null;
    setPasswordErrors(errorMessage);
    return errors.length === 0;
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  const handlePasswordChange = useCallback(
    (field: keyof typeof passwordData, value: string) => {
      setPasswordData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };
        setPasswordErrors(null);
        if (field === 'newPassword' && value.length > 0 && value.length < 8) {
          setPasswordErrors('Пароль должен содержать не менее 8 символов');
        }

        if (field === 'confirmPassword' && newData.newPassword !== value) {
          setPasswordErrors('Пароли не совпадают');
        }
        return newData;
      });
    },
    []
  );

  // редирект на страницу планов, при их отсуствии в ЛК
  const redirectPlanHandlet = () => {
    navigate('/card');
  };

  // переключение изменения полей
  const handleEditing = (field: string) => {
    setIsEditing((prev) => (prev === field ? '' : field));
  };

  const handleSave = useCallback(async () => {
    // e.preventDefault();
    const dataToUpdate: Partial<UserType> = {
      id: user?.id,
    };

    const updateModifiedFields = new Set(modifiedFields);

    if (formData.email && !validateEmail(formData.email)) {
      return;
    }

    if (passwordData.newPassword) {
      const isCurrentPasswordCorrect = await checkCurrentPassword();
      if (!isCurrentPasswordCorrect) {
        setPasswordErrors('Неверный текущий пароль');
        return;
      }
      if (!validatePassword()) return;
      dataToUpdate.password = passwordData.newPassword;
      updateModifiedFields.add('password');
    }

    updateModifiedFields.forEach((field) => {
      if (field !== 'id' && formData[field] !== undefined) {
        (dataToUpdate[field as keyof UserType] as string | number | undefined) =
          formData[field];
      }
    });

    // if (passwordData.newPassword) {
    //   modifiedFields.add('password');
    // }

    dispatch(fetchUpdateProfile(dataToUpdate)).then((result) => {
      if (fetchUpdateProfile.fulfilled.match(result)) {
        setModifiedFields(new Set());
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        console.log('Профиль обновлен');
        setIsEditing('');
      } else {
        console.log('Ошибка обновления');
      }
    });
  }, [
    user?.id,
    modifiedFields,
    formData,
    passwordData,
    validateEmail,
    checkCurrentPassword,
    validatePassword,
    dispatch,
  ]);

  const isSaveButtonDisabled = useMemo(() => {
    return (
      modifiedFields.size === 0 &&
      (!passwordData.newPassword || !validatePassword())
    );
  }, [modifiedFields, passwordData.newPassword, validatePassword]);

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
            {emailError && <Text color='red.500'>{emailError}</Text>}

            {editableField('password', 'Пароль', 'password')}
            {isEditing === 'password' && (
              <VStack gap={4} align='stretch' width='100%'>
                <InputGroup
                  width='100%'
                  minW='20ch'
                  endElement={
                    <IconButton
                      variant='ghost'
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          currentPassword: !prev.currentPassword,
                        }))
                      }
                    >
                      {showPassword.currentPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  }
                >
                  <Input
                    width='500px'
                    minWidth='500px'
                    minW='20ch'
                    type={showPassword.currentPassword ? 'text' : 'password'}
                    placeholder='Текущий пароль'
                    value={passwordData.currentPassword}
                    onChange={(e) => {
                      handlePasswordChange('currentPassword', e.target.value);
                      setPasswordErrors(null);
                    }}
                  />
                </InputGroup>

                <InputGroup
                  width='100%'
                  minW='20ch'
                  endElement={
                    <IconButton
                      variant='ghost'
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    >
                      {showPassword.newPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  }
                >
                  <Input
                    width='500px'
                    minWidth='500px'
                    minW='20ch'
                    type={showPassword.newPassword ? 'text' : 'password'}
                    placeholder='Новый пароль'
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange('newPassword', e.target.value)
                    }
                  />
                </InputGroup>

                <InputGroup
                  width='100%'
                  minW='20ch'
                  endElement={
                    <IconButton
                      variant='ghost'
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    >
                      {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  }
                >
                  <Input
                    width='500px'
                    minWidth='500px'
                    minW='20ch'
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    placeholder='Подтвердите новый пароль'
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange('confirmPassword', e.target.value)
                    }
                  />
                </InputGroup>

                {passwordErrors && (
                  <Text color='red.500'>{passwordErrors}</Text>
                )}
              </VStack>
            )}
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
        return <Text>Выберите вкладку</Text>;
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
