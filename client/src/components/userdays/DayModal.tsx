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
import { setPoints } from '@/store/appSlice';
import { LuCircleCheck } from 'react-icons/lu';
import { Link } from 'react-router-dom';

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
}: DayModalProps) {
  const descriptionLines = description
    .split(';')
    .map((line) => line.trim())
    .filter((line) => line);

  const { user } = useAppSelector((store) => store.appSlice);
  const dispatch = useAppDispatch();

  const finishDayHandler = async (id) => {
    try {
      await axiosInstance.patch(`api/session/${id}`, {
        isCompleted: true,
        userId: user?.id,
        points: points,
      });
      updatePlanCompletion(planId, id);

      dispatch(setPoints(points));

      setOpen(false);
    } catch (error) {
      console.error('Ошибка при завершении дня:', error);
    }
  };

  return (
    <>
      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        size="xl"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent p={7} maxH="700px" shadow="xl">
          <DialogHeader>
            <DialogTitle
              fontSize={['1.25rem', '1.5rem']}
              fontWeight="800"
              letterSpacing="0.02em"
              textTransform="uppercase"
              position="relative"
            >
              ДОБРО ПОЖАЛОВАТЬ НА {cardNumber}-Й ТРЕНИРОВОЧНЫЙ ДЕНЬ
              <Text fontWeight="700" fontSize="1rem" mb={4} color="gray.700">
                <Link to={`/plans/${planId}`}> {title}</Link>
              </Text>
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Box>
              <Box
                boxShadow="0px 8px 20px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.07)"
                borderRadius="xl"
                p={3}
                overflowY="auto"
                maxH="400px"
                css={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(0, 155, 72, 0.5) transparent',
                }}
              >
                <Text fontWeight="600" mt={1}>
                  {target}
                </Text>
                <Text fontWeight="600" mt={1}>
                  Рекомендованное количество подходов: {rounds}
                </Text>
                <Text fontWeight="600" mt={1}>
                  Тип: {type}
                </Text>
                <List.Root
                  my={2}
                  fontWeight="500"
                  variant="plain"
                  align="center"
                >
                  {descriptionLines.map((line) => (
                    <List.Item key={line} p={1}>
                      <List.Indicator asChild mr={2} color="green">
                        <LuCircleCheck />
                      </List.Indicator>
                      {line}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
              {/* <Box><ExecriseHelpToModal /></Box> */}
            </Box>
            <Box mt={4} display="flex" justifyContent="space-around">
              <Button
                onClick={() => finishDayHandler(dayId)}
                p={3}
                borderRadius="md"
                variant="outline"
                colorPalette={isCompleted ? 'red' : 'green'}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  'День уже завершен'
                ) : (
                  <>
                    Завершить день <LuCircleCheck color="green" />
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
