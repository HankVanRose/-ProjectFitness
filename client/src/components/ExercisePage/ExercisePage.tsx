import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Col, Container, Row } from 'react-bootstrap';
import ExerciseCard from './ExerciseCard';

export default function ExercisePage() {
  const { VITE_API } = import.meta.env;

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const allExercises = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/exercise`);
        setExercises(res.data);
      } catch (error) {
        console.error(error, 'Ошибка');
      }
    };
    allExercises();
  }, []);

  return (
    <Container fluid>
      <Row>
        {exercises.map((exercise) => (
          <Col
            style={{ marginBottom: '30px' }}
            xs={12}
            md={6}
            lg={4}
            key={exercise.id}
          >
            <ExerciseCard
              image={exercise.image}
              id={exercise.id}
              name={exercise.name}
              description={exercise.description}
              equipment={exercise.equipment}
              muscleGroup={exercise.muscleGroup}
              type={exercise.type}
              points={exercise.points}
              calories={exercise.calories}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
