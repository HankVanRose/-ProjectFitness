import React from 'react';
import { PlansType } from '../../types';
import { Card, Carousel } from 'react-bootstrap';

export default function Slides({ plans }: { plans: PlansType }) {
  return (
    <Carousel>
      {plans.map((plan) => (
        <Carousel.Item
          style={{ minHeight: '500px', position: 'relative' }}
          key={plan.id}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              backgroundImage: `url(${plan.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.5) blur(2px)',
              zIndex: 1,
            }}
          />
          <Carousel.Caption
            style={{
              zIndex: 2,
            }}
          >
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
