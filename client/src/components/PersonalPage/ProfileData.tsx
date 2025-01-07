import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppSelector } from '../../store/hooks/hooks';
import { Col, Container, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import SideBarComp from './SideBarComp';
import styles from './PersonalPage.module.css';

export default function ProfileData() {
  const { user, loading, error } = useAppSelector((state) => state.appSlice);

  const [activeTab, setActiveTab] = useState(0);

  const content = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <FloatingLabel
              controlId='floatingInput1'
              label='Возраст'
              className='mb-3'
            >
              <Form.Control type='text' placeholder='Возраст' />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingSelect1'
              label='Пол'
              className='mb-3'
            >
              <Form.Select>
                <option>Укажите ваш пол</option>
                <option>Мужской</option>
                <option>Женский</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput2'
              label='Рост'
              className='mb-3'
            >
              <Form.Control type='text' placeholder='Рост' />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput3'
              label='Вес'
              className='mb-3'
            >
              <Form.Control type='text' placeholder='Вес' />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingSelect2'
              label='Цели'
              className='mb-3'
            >
              <Form.Select>
                <option>Выберите цель тренировок</option>
                <option>Сбросить вес</option>
                <option>Стать сильнее</option>
                <option>Уменьшить стресс</option>
                <option>Повысить выносливость</option>
              </Form.Select>
            </FloatingLabel>
            <Form className={styles.form}>
              <Form.Label>Выберите оборудование</Form.Label>
              <Form.Check
                type='checkbox'
                id='inline-checkbox-1'
                label='Коврик'
              />
              <Form.Check
                type='checkbox'
                id='inline-checkbox-2'
                label='Гантели'
              />
              <Form.Check
                type='checkbox'
                id='inline-checkbox-3'
                label='Резинки'
              />
              <Form.Check
                type='checkbox'
                id='inline-checkbox-4'
                label='Утяжелители'
              />
            </Form>
          </>
        );

      case 1:
        return (
          <>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='basic-addon1'>ID</InputGroup.Text>
              <Form.Control
                disabled
                placeholder={user ? `${user?.id}` : 'ID пользователя'}
                aria-label='ID пользователя'
                aria-describedby='basic-addon1'
              />
            </InputGroup>

            <FloatingLabel
              controlId='floatingInput4'
              label='Имя пользователя'
              className='mb-3'
            >
              <Form.Control type='text' placeholder='Имя пользователя' />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput5'
              label='Email'
              className='mb-3'
            >
              <Form.Control type='email' placeholder='name@example.com' />
            </FloatingLabel>
            <FloatingLabel controlId='floatingPassword' label='Пароль'>
              <Form.Control type='password' placeholder='Пароль' />
            </FloatingLabel>
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
        <Col sm={8}>{content()}</Col>
      </Row>
    </Container>
  );
}
