import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Image,
} from 'react-bootstrap';
import { ExerciseType } from '../../types';

export default function SingleExercisePage() {
  const [singleExercise, setSingleExercise] = useState<ExerciseType>({});
  const { VITE_API } = import.meta.env;
  const { id } = useParams();

  useEffect(() => {
    const getSingleExercise = async (id: number) => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/exercise/${id}`);
        setSingleExercise(res.data);
      } catch (error) {
        console.error(error, 'Ошибка загрузки упражнения');
      }
    };
    getSingleExercise(id);
  }, [id]);
  return (
    <div
      className="FitnessArticle"
      style={{ backgroundColor: '#f9f9f9', padding: '20px' }}
    >
      <Container className="wrap">
        <Row className="mt-4 text-center">
          <Col>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                margin: '20px 0',
              }}
            >
              BE FIT УПРАЖНЕНИЕ: {singleExercise.name?.toUpperCase()}
            </h1>
            <Image
              src={singleExercise.image}
              alt={singleExercise.name?.toUpperCase()}
              fluid
              style={{ marginBottom: '20px', maxHeight: 768, maxWidth: 1024 }}
            />
            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              ЧТО ТАКОЕ: {singleExercise.name?.toUpperCase()}?{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.shortDescription}
            </p>
            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              ЕЩЕ НЕМНОГО О: {singleExercise.name?.toUpperCase()}?{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.longDescription}
            </p>
            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              ОСНОВНЫЕ ГРУППЫ МЫШЦ{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.longMuscleGroup}
            </p>
            <Image
              src={singleExercise.muscleImage}
              alt={singleExercise.name?.toUpperCase()}
              fluid
              style={{ marginBottom: '20px', maxHeight: 768, maxWidth: 1024 }}
            />
            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              НЕОБХОДИМОЕ ОБОРУДОВАНИЕ:{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.equipment?.toUpperCase()}
            </p>

            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              КОЛИЧЕСТВО КАЛЛОРИЙ СЖИГАЕМЫХ ЗА ДЕЙСТВИЕ:{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.calories} кКал.
            </p>

            <h2 style={{ fontSize: '2rem', margin: '0 200px 50px 200px' }}>
              КОЛИЧЕСТВО БАЛЛОВ ЗА ВЫПОЛНЕННОЕ ДЕЙСТВИЕ:{' '}
            </h2>
            <p
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                textAlign: 'justify',
                margin: '0 200px 50px 200px',
              }}
            >
              {singleExercise.points} pts.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
