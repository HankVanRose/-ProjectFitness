import React from 'react';
import FitnessCalendar from './FitnessCalendar';
import { useAppSelector } from '@/store/hooks/hooks';
import UserDaysBlock from './UserDaysBlock';
import { Grid, GridItem } from '@chakra-ui/react';
import SoonestList from './SoonestList';
import CalendarText from './CalendarText';

export default function CalendarPage() {
  const { user } = useAppSelector((state) => state.appSlice);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Grid m={5} gap={4} templateColumns="repeat(5, 1fr)" >
        <GridItem colSpan={3}>
          <FitnessCalendar />
        </GridItem>
        <GridItem rowSpan={3}>
          <SoonestList userId={user!.id}></SoonestList>
        </GridItem>
        <GridItem rowSpan={3}>
          <UserDaysBlock userId={user!.id}></UserDaysBlock>
        </GridItem>
        <GridItem colSpan={3}>
          <CalendarText></CalendarText>
        </GridItem>
      </Grid>
    </>
  );
}
