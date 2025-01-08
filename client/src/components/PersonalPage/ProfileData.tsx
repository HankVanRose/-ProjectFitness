import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Button, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SideBarComp from './SideBarComp';
import styles from './PersonalPage.module.css';
import { fetchUpdateProfile } from '../../store/thunkActions';

interface FormData {
  id: number;
  age: string;
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
  const { user, error, loading } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    age: '',
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

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || 0,
        age: user.age || '',
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch(
      fetchUpdateProfile({
        age: (formData.get('age') as string) || '',
        gender: (formData.get('gender') as string) || '',
        height: (formData.get('height') as string) || '',
        weight: (formData.get('weight') as string) || '',
        goal: (formData.get('goal') as string) || '',
        equipment: (formData.getAll('equipment') as string[]) || [],
        username: (formData.get('username') as string) || '',
        email: formData.get('email') as string || '',
        password: formData.get('password') as string || '',
      })
    );
  };

  const editableField = (
    field: keyof FormData,
    label: string,
    type = 'text'
  ) => (
    <Row className='mb-3'>
      <InputGroup>
        <InputGroup.Text id={`basic-addon-${field}`}>{label}</InputGroup.Text>
        <Form.Control
          name={field}
          type={type}
          value={formData[field] ?? ''}
          placeholder={label}
          disabled={isEditing !== field}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
        <Button
          variant='outline-secondary'
          onClick={() => setIsEditing((prev) => (prev === field ? '' : field))}
        >
          {isEditing === field ? '✔️' : '✏️'}
        </Button>
      </InputGroup>
    </Row>
  );

  const content = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            {editableField('age', 'Возраст')}

            <Row className='mb-3'>
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
            </Row>

            {editableField('height', 'Рост')}
            {editableField('weight', 'Вес')}

            <Row className='mb-3'>
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
            </Row>

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
            <Row className='mb-3'>
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
            </Row>

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
      <Row>
        <Col sm={4}>
          <SideBarComp activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        <Col sm={8}>
          {content()}
          <Button variant='primary' onClick={handleSave} className='mt-3'>
            Сохранить
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
