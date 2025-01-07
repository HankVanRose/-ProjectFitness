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
    navigate(`/plan/${id}`);
  }, [navigate, id]);

  return (
    <>
      <Card>
        <img src={image} alt={name} className="card-img-top" />
        <Card.Body>
          <Card.Text onClick={handleNavigate}>{name}</Card.Text>
          <Card.Text>{difficulty}</Card.Text>
          <Card.Text>{equipment}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default memo(PlanCard);
