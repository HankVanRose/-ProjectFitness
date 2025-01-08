import { Col, Container, Row } from 'react-bootstrap';
import PlanCard from '../planCard/PlanCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

export default function PlansBlock() {
  const { VITE_API } = import.meta.env;

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const allPlans = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/plans`);
        setPlans(res.data);
      } catch (error) {
        console.error(error, 'Ошибка');
      }
    };
    allPlans();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          {plans.map((plan) => (
            <Col
              style={{ marginBottom: '30px' }}
              xs={12}
              md={6}
              lg={4}
              key={plan.id}
            >
              <PlanCard
                image={plan.image}
                id={plan.id}
                name={plan.name}
                description={plan.description}
                equipment={plan.equipment}
                difficulty={plan.difficulty}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
