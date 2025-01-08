import { useCallback } from 'react';
import { Button, Card } from 'react-bootstrap';
import { ExerciseType } from '../../types';
import { useNavigate } from 'react-router-dom';
import './ExerciseCard.css';

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

  const handleNavigate = () => {
    navigate(`/exercises/${id}`);
  };

  return (
    <>
      <Card
        className="Card1"
        onClick={handleNavigate}
        style={{
          border: 'none',
          margin: '10px',
          backgroundImage: `url(${image})`,
          backgroundColor: 'white',
          color: 'white',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: 500,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <Card.Body
          className="text-white"
          style={{ backdropFilter: 'blur(1px) brightness(0.7)' }}
        >
          <Card.Text className="Cardnametext" style={{ fontSize: 40 }}>
            <b>{name.slice(0, 22)}...</b>
          </Card.Text>

          <div className="button-container">
            <Button
              style={{
                position: 'relative',
                marginTop: 350,
                backgroundColor: 'green',
                borderColor: 'green',
              }}
            >
              + ДОБАВИТЬ В МОЙ ПЛАН
            </Button>
            <Button
              onClick={handleNavigate}
              style={{
                position: 'relative',
                marginTop: 350,

                backgroundColor: 'green',
                borderColor: 'green',
              }}
            >
              ПОДРОБНЕЕ
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
