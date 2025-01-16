import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from '@/components/ui/progress';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserProgress } from '@/store/thunkActions';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

export default function ProgressBarOnly() {
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const { sessions, userDays } = useAppSelector((state) => state.appSlice);

  const { totalDays, completedDays, progressPercent } = useMemo(() => {
    const total = sessions.reduce((sum, session) => {
      return sum + (session.Plan?.numOfTrainings || 0);
    }, 0);

    const completed = userDays.filter((day) => day.isCompleted).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      totalDays: total,
      completedDays: completed,
      progressPercent: percentage,
    };
  }, [sessions, userDays]);

  useEffect(() => {
    dispatch(fetchUserProgress(user?.id ?? 0));
  }, [dispatch, user]);

  return (
    <>
      <ProgressRoot
        value={progressPercent}
        size='lg'
        colorPalette='green'
        striped
      >
        <ProgressLabel justifyContent='space-between'>
          <Flex gap={20}>
            <Text fontSize='xl' fontWeight='bold' pb={8}>
              {user?.username?.toUpperCase()}
            </Text>
            <Text fontSize='xl'>{user?.points} баллов</Text>
            <Text fontSize='xl'>
              Завершено {completedDays} из {totalDays} дней
            </Text>
          </Flex>
        </ProgressLabel>
        <ProgressBar />
      </ProgressRoot>
      <Text textAlign='right'>{`${progressPercent}%`}</Text>
    </>
  );
}
