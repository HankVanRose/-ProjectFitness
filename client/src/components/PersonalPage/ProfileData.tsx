import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import SideBarComp from './SideBarComp';
import styles from './PersonalPage.module.css';
import { fetchUpdateProfile } from '../../store/thunkActions';
import {
  Box,
  Button,
  Container,
  Group,
  HStack,
  IconButton,
  Input,
  InputElement,
  VStack,
} from '@chakra-ui/react';
// import { InputGroup } from '@/components/ui/input-group';
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
      // <Row className='mb-3'>
      //   <InputGroup>
      //     <InputGroup.Text id={`basic-addon-${field}`}>{label}</InputGroup.Text>
      //     <Form.Control
      //       name={field}
      //       type={type}
      //       value={formData[field] ?? ''}
      //       placeholder={label}
      //       disabled={isEditing !== field}
      //       onChange={(e) => handleInputChange(field, e.target.value)}
      //     />
      //     <Button
      //       variant='outline-secondary'
      //       onClick={() => setIsEditing((prev) => (prev === field ? '' : field))}
      //     >
      //       {isEditing === field ? '✔️' : '✏️'}
      //     </Button>
      //   </InputGroup>
      // </Row>
      <Group size='lg'>
        {/* <Group>
          <InputAddon fontWeight='bold' mb={2}>
            {label}
          </InputAddon>
          <HStack> */}
        <Input
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
        <InputElement width='4.5rem'>
          <IconButton
            h='1.75rem'
            size='sm'
            aria-label={isEditingField ? 'Save' : 'Edit'}
            icon={isEditingField ? <FiCheck /> : <FiEdit />}
            onClick={() => handleEditing(field)}
            colorScheme={isEditingField ? 'green' : 'gray'}
          />
        </InputElement>
        {/* {isEditing === field ? 'V' : '✏️'}
          </HStack>
        </Group>
        <Button
          ml={2}
          size='sm'
          onClick={() => setIsEditing((prev) => (prev === field ? '' : field))}
        >
          {isEditing === field ? '✔️' : '✏️'}
        </Button> */}
      </Group>
    );
  };

  const frameworks = createListCollection({
    items: [
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
    ],
  });

  const content = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            {editableField('age', 'Возраст', 'number')}

            {/* <Row className='mb-3'>
              <InputGroup>
                <InputGroup.Text id='basic-addon1'>Пол</InputGroup.Text>
                <Form.Select
                  name='gender'
                  value={formData.gender ?? ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={isEditing !== 'gender'}
                >
                  <option value=''>Укажите ваш пол</option>
                  <option value='male'>Мужской</option>
                  <option value='female'>Женский</option>
                </Form.Select>
                <Button
                  variant='outline-secondary'
                  onClick={() =>
                    setIsEditing((prev) => (prev === 'gender' ? '' : 'gender'))
                  }
                  className='mt-2'
                >
                  {isEditing === 'gender' ? '✔️' : '✏️'}
                </Button>
              </InputGroup>
            </Row> */}

            <SelectRoot
              mb={6}
              collection={frameworks}
              value={formData.gender ?? ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleInputChange('gender', e.target.value)
              }
            >
              <SelectTrigger>
                <SelectValueText
                  placeholder='Выберите пол'
                  size='lg'
                  isDisabled={isEditing !== 'gender'}
                  bg={isEditing === 'gender' ? editingBg : undefined}
                  onClick={() => !isEditing && handleEditing('gender')}
                ></SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((framework) => (
                  <SelectItem item={framework} key={framework.value}>
                    {framework.label}
                  </SelectItem>
                ))}
              </SelectContent>
              <Button
                mt={2}
                size='sm'
                onClick={() => handleEditing('gender')}
                colorScheme={isEditing === 'gender' ? 'green' : 'gray'}
              >
                {isEditing === 'gender' ? '✔️' : '✏️'}
              </Button>
            </SelectRoot>

            {editableField('height', 'Рост')}
            {editableField('weight', 'Вес')}

            {/* <Row className='mb-3'>
              <InputGroup>
                <InputGroup.Text id='basic-addon2'>Цели</InputGroup.Text>
                <Form.Select
                  name='goal'
                  value={formData.goal ?? ''}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  disabled={isEditing !== 'goal'}
                >
                  <option value=''>Выберите цель тренировок</option>
                  <option value='Сбросить вес'>Сбросить вес</option>
                  <option value='Стать сильнее'>Стать сильнее</option>
                  <option value='Уменьшить стресс'>Уменьшить стресс</option>
                  <option value='Повысить выносливость'>
                    Повысить выносливость
                  </option>
                </Form.Select>
                <Button
                  variant='outline-secondary'
                  onClick={() =>
                    setIsEditing((prev) => (prev === 'goal' ? '' : 'goal'))
                  }
                  className='mt-2'
                >
                  {isEditing === 'goal' ? '🟢' : '✏️'}
                </Button>
              </InputGroup>
            </Row> */}

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
            {/* <Row className='mb-3'>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='basic-addon3'>ID</InputGroup.Text>
                <Form.Control
                  name='id'
                  disabled
                  value={user ? `${user?.id}` : 'ID пользователя'}
                  aria-label='ID пользователя'
                  aria-describedby='basic-addon3'
                />
              </InputGroup>
            </Row> */}

            {editableField('username', 'Имя пользователя')}
            {editableField('email', 'Email', 'email')}
            {editableField('password', 'Пароль', 'password')}
          </>
        );

      case 2:
        return <p className={styles.form}>У вас пока нет плана тренировок.</p>;
      default:
        return <p>Выберите вкладку.</p>;
    }
  };

  return (
    <Container>
      <HStack>
        <VStack sm={4}>
          <SideBarComp activeTab={activeTab} setActiveTab={setActiveTab} />
        </VStack>
        <Box flex={1}>
          {content()}
          <Button variant='primary' onClick={handleSave} className='mt-3'>
            Сохранить
          </Button>
        </Box>
      </HStack>
    </Container>
  );
}
