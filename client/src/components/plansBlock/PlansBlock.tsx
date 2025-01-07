import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PlanCard from '../planCard/PlanCard';

export default function PlansBlock({ plans }) {
  return (
    <>
      <Container fluid>
        <Row>
          {plans.map((plan) => (
            <Col
              style={{ marginBottom: '30px'}}
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
