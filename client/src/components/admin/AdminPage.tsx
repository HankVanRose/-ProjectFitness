import React from 'react';
import PlanForm from './PlanForm';
import ExerciseForm from './ExerciseForm';
import { Tabs } from '@chakra-ui/react';
import { LuDumbbell, LuClipboardList } from 'react-icons/lu';

export default function AdminPage() {
  return (
    <Tabs.Root defaultValue="plans" >
      <Tabs.List p={4}>
        <Tabs.Trigger value="plans" p={2}>
          <LuClipboardList />
          Планы тренировок
        </Tabs.Trigger>
        <Tabs.Trigger value="exercises" p={2}>
          <LuDumbbell />
          Упражнения
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="plans">
        <PlanForm />
      </Tabs.Content>

      <Tabs.Content value="exercises">
        <ExerciseForm />
      </Tabs.Content>
    </Tabs.Root>
  );
}
