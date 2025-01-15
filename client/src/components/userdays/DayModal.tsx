import { Text, Box, Button, List } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
} from '@/components/ui/dialog';
import axiosInstance from '../../axiosInstance';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setCalories, setPoints } from '@/store/appSlice';
import { LuCircleCheck } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { ExercisesType } from '@/types';
import ExecriseHelpToModal from './ExecriseHelpToModal';
import { useColorModeValue } from '../ui/color-mode';
import { FaCheck, FaFlagCheckered } from 'react-icons/fa';

type DayModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  description: string;
  cardNumber: number;
  dayId: number;
  title: string;
  rounds: number;
  type: string;
  target: string;
  updatePlanCompletion: (planId: number, dayId: number) => void;
  planId: number;
  points: number;
  isCompleted: boolean;
  exercises: ExercisesType;
  calories: number;
};
export default function DayModal({
  open,
  setOpen,
  description,
  cardNumber,
  dayId,
  title,
  rounds,
  type,
  target,
    updatePlanCompletion,
  planId,
  points,
  isCompleted,
  exercises,
  calories,
}: DayModalProps) {
  const descriptionLines = description
    .split(';')
    .map((line) => line.trim())
    .filter((line) => line);

  const { user } = useAppSelector((store) => store.appSlice);
  const dispatch = useAppDispatch();

  const finishDayHandler = async (id: number) => {
    try {
      await axiosInstance.patch(`api/session/${id}`, {
        isCompleted: true,
        userId: user?.id,
        points: points,
        calories: calories,
      });
      updatePlanCompletion(planId, id);

      dispatch(setPoints(points));
      dispatch(setCalories(calories));

      setOpen(false);
    } catch (error) {
      console.error('Ошибка при завершении дня:', error);
    }
  };

  const bgColor = useColorModeValue('gray.100', 'rgb(20, 20, 20)');
  const bgImg = useColorModeValue(
    'gray.100',
    `linear-gradient(to bottom right, rgba(20, 40, 20, 0.95), rgba(40, 10, 10, 0.95))`
  );

  return (
    <>
      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        size="xl"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent
          bg={bgColor}
          maxH={800}
          m={2}
          p={10}
          overflow={'hidden'}
          borderRadius="md"
          border="1px"
          borderColor="teal.200"
        >
          <DialogHeader mb={2}>
            <DialogTitle
              fontSize={['1.25rem', '1.5rem']}
              fontWeight="800"
              letterSpacing="0.02em"
              textTransform="uppercase"
              position="relative"
            >
              ДОБРО ПОЖАЛОВАТЬ НА {cardNumber}-Й ТРЕНИРОВОЧНЫЙ ДЕНЬ
              <Text fontWeight="700" fontSize="1rem" color="gray.700">
                <Link to={`/plans/${planId}`}> {title}</Link>
              </Text>
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Box
              borderRadius="xl"
              overflow={'hidden'}
              overflowY="auto"
              maxH={500}
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '1em',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  '&:hover': {
                    background: '#A0AEC0',
                    borderRadius: '1em',
                    border: '2px solid transparent',
                    backgroundClip: 'padding-box',
                  },
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                  borderRadius: '1em',
                  margin: '4px',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 155, 72, 0.5) transparent',
              }}
            >
              <Text fontWeight="600" mt={1}>
                Задача: {target}
              </Text>
              <Text fontWeight="600" mt={1}>
                Рекомендованное количество подходов: {rounds}
              </Text>
              <Text fontWeight="600" mt={1}>
                Тип: {type}
              </Text>
              <List.Root my={2} fontWeight="500" variant="plain" align="center">
                {descriptionLines.map((line) => (
                  <List.Item key={line} p={1}>
                    <List.Indicator asChild mr={2} color="green">
                      <FaCheck />
                    </List.Indicator>
                    {line}
                  </List.Item>
                ))}
              </List.Root>

              <ExecriseHelpToModal
                bgImg={bgImg}
                bgColor={bgColor}
                exercises={exercises}
              />
            </Box>

            <Box mt={5} display="flex" justifyContent="space-around">
              <Button
                onClick={() => finishDayHandler(dayId)}
                p={3}
                borderRadius="md"
                variant="outline"
                //!
                // bg={isCompleted ? 'red' : 'green.200'}
                colorPalette={isCompleted ? 'red' : 'green'}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <>День уже завершен</>
                ) : (
                  <>
                    Завершить день <FaFlagCheckered />
                  </>
                )}
              </Button>
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
