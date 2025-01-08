import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { PlanType } from '../../types';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';

export default function PlanPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanType | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchPlan = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/plans/${id}`
        );
        setPlan(response.data);
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!plan) {
    return <div>Plan not found</div>;
  }
  // const plan = {
  //   id: 3,
  //   name: 'Силовые тренировки',
  //   description:
  //     'Наращивание мышечной массы и силы через различные упражнения.',
  //   equipment: 'Штанга, Гантели, Скамья',
  //   difficulty: 'Продвинутый',
  //   image:
  //     'https://thebasefitness.ru/upload/iblock/42e/42ebdfcd49515c9ae499d88d03e00726.jpg', // Измените на новое изображение
  // };
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col md={6}>
          <div>
            <img src={plan.image} alt={plan.name} />
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h1>{plan.name}</h1>
            <h5 className="mb-3">Уровень: {plan.difficulty}</h5>
            <Card className="mb-4">
              <Card.Body>
                <section>
                  <h5 className="mb-3">Необходимое оборудование</h5>
                  <p>{plan.equipment}</p>
                </section>
                <section>
                  <h5 className="mb-3">Описание</h5>
                  <p>{plan.description}</p>
                </section>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      {/* //! тут остальное  */}
    </Container>
  );
}
