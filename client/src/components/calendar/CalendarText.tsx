import { Blockquote } from '@/components/ui/blockquote';
import { Float } from '@chakra-ui/react';
import React from 'react';
import { ImQuotesLeft } from 'react-icons/im';

export default function CalendarText() {
  return (
    <Blockquote
      variant="subtle"
      showDash
      cite="Мухаммед Али"
      color={'white.700'}
      m={10}
      p={8}
      icon={
        <Float placement="top-start" offsetY="3" offsetX='10'>
          <ImQuotesLeft />
        </Float>
      }
    >
      «Чемпионами становятся не в тренажёрных залах. Чемпиона рождает то, что у
      человека внутри — желания, мечты, цели» <br />
    </Blockquote>
  );
}
