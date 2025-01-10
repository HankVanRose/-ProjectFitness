import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import SideBarComp from './SideBarComp';
import styles from './PersonalPage.module.css';
import { fetchUpdateProfile, userActivePlan } from '../../store/thunkActions';
import {
  Box,
  Button,
  Container,
  Group,
  HStack,
  IconButton,
  Input,
  InputElement,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
// import { EditIcon, CheckIcon } from '@chakra-ui/icons';
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

interface FormData {
  id: number;
  age: number;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  equipment: string[];
  username: string;
  email: string;
  password: string;
}

export default function ProfileData() {
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isFormModified, setIsFormModified] = useState(false); //изменение формы

  useEffect(() => {
    dispatch(userActivePlan(user?.id));
  }, [user?.id]);

  const { userplan } = useAppSelector((store) => store.appSlice);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    age: 0,
    gender: '',
    height: '',
    weight: '',
    goal: '',
    equipment: [],
    username: '',
    email: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState<string>('');

  const focusBg = useColorModeValue('blue.500', 'blue.900'); // фон при фокусе
  const editingBg = useColorModeValue('green.50', 'green.900'); // фон при изменении

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || 0,
        age: user.age || 0,
        gender: user.gender || '',
        height: user.height || '',
        weight: user.weight || '',
        goal: user.goal || '',
        equipment: user.equipment || [],
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
        equipment: formData.equipment,
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
        <Field label={label} mb={4} color={{ base: 'black', _dark: 'white' }}>
          <InputGroup
            endElement={
              <IconButton
                h="1.75rem"
                size="sm"
                aria-label={isEditingField ? 'Save' : 'Edit'}
                onClick={() => handleEditing(field)}
                colorScheme={isEditingField ? 'green' : 'gray'}
              >
                {isEditingField ? <FiCheck /> : <FiEdit />}
              </IconButton>
            }
          >
            <Input
              bgColor={{ base: 'black', _dark: 'white' }}
              color={{ base: 'white', _dark: 'black' }}
              type={type}
              placeholder={label}
              value={formData[field] ?? ''}
              name={field}
              onChange={(e) => handleInputChange(field, e.target.value)}
              disabled={!isEditingField}
              bg={isEditingField ? editingBg : undefined}
              _focus={{ bg: focusBg }}
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
              <SelectRoot
                bgColor={{ base: 'black', _dark: 'white' }}
                color={{ base: 'black', _dark: 'black' }}
                mb={4}
                collection={frameworks}
                value={formData.gender || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleInputChange('gender', e.target.value)
                }
                isDisabled={isEditing !== 'gender'}
                bg={isEditing === 'gender' ? editingBg : undefined}
                onClick={() => !isEditing && handleEditing('gender')}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Выберите пол"></SelectValueText>
                </SelectTrigger>
                <SelectContent color={{ base: 'black', _dark: 'white' }}>
                  {frameworks.items.map((framework) => (
                    <SelectItem item={framework} key={framework.value}>
                      {framework.label}
                    </SelectItem>
                  ))}
                </SelectContent>
                {/* <Button
                mt={2}
                size='sm'
                onClick={() => handleEditing('gender')}
                colorScheme={isEditing === 'gender' ? 'green' : 'gray'}
              >
                {isEditing === 'gender' ? '✔️' : '✏️'}
              </Button> */}
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
                isDisabled={isEditing !== 'goal'}
                bg={isEditing === 'goal' ? editingBg : undefined}
                onClick={() => !isEditing && handleEditing('goal')}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Выберите цель"></SelectValueText>
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
                label="ID"
                mb={4}
                color={{ base: 'black', _dark: 'white' }}
              >
                <Input
                  color={{ base: 'black', _dark: 'white' }}
                  type="text"
                  value={user ? `${user?.id}` : 'ID пользователя'}
                  name="id"
                  disabled
                  pl={4}
                  aria-label="ID пользователя"
                  aria-describedby="basic-addon3"
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
              </Text>
            ) : (
              // Здесь вы можете добавить код, чтобы отобразить тренировки, если они есть
              <Text color={{ base: 'black', _dark: 'white' }}>{userplan}</Text>
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
      <HStack>
        <VStack>
          <SideBarComp activeTab={activeTab} setActiveTab={setActiveTab} />
        </VStack>
        <Box flex={1}>
          {content()}
          <Button
            minW="10ch"
            variant="surface"
            colorPalette="green"
            borderRadius="sm"
            onClick={handleSave}
            className="mt-3"
          >
            Сохранить
          </Button>
        </Box>
      </HStack>
    </Container>
  );
}
