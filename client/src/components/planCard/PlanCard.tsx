import { memo, useCallback } from 'react';
import { PlanType } from '../../types';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PlanCard({
  id,
  name,
  description,
  equipment,
  difficulty,
  image,
}: PlanType) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/plans/${id}`);
  }, [navigate, id]);

  return (
    <>
      <Card
        style={{
          border: 'none',
          margin: '10px',
          backgroundImage: `url(${image})`,
          backgroundColor: 'black',
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
          <Card.Text>Сложность: {difficulty}</Card.Text>
          <Card.Text>Необходимое снаряжение: {equipment}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default memo(PlanCard);
