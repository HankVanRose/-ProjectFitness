import { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { ExerciseType } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function ExerciseCard({
  image,
  id,
  name,
  description,
  equipment,
  muscleGroup,
  type,
  points,
  calories,
}: ExerciseType) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/exercises/${id}`);
  }, [navigate, id]);
  return (
    <>
      <Card
        style={{
          border: 'none',
          margin: '10px',
          backgroundImage: `url(${image})`,
          backgroundColor: 'black',
          color: 'white',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        <Card.Body
          className="text-white"
          style={{ backdropFilter: 'blur(1px) brightness(0.7)' }}
        >
          <Card.Text onClick={handleNavigate}>
            <b>{name}</b>
          </Card.Text>

          <Card.Text>Необходимое снаряжение: {equipment}</Card.Text>
          <Card.Text> {muscleGroup}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{type}</Card.Text>
          <Card.Text>{points}</Card.Text>
          <Card.Text>{calories}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
