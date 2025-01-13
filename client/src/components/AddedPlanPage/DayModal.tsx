import { Text, Box, Button } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
} from '@/components/ui/dialog';
import ExecriseHelpToModal from './ExecriseHelpToModal';

import axiosInstance from '../../axiosInstance';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserCheck } from '@/store/thunkActions';
import { setPoints } from '@/store/appSlice';

export default function DayModal({
  open,
  setOpen,
  description,
  cardNumber,
  id,
  title,
  rounds,
  type,
  target,
  updatePlanCompletion,
  planId,
  points,
}) {
  const descriptionLines = description
    .split(';')
    .map((line) => line.trim())
    .filter((line) => line);

  const { user } = useAppSelector((store) => store.appSlice);
  const { VITE_API } = import.meta.env;
  const dispatch = useAppDispatch();

  const finishDayHandler = async (id) => {
    try {
      const response = await axiosInstance.patch(`${VITE_API}/session/${id}`, {
        isCompleted: true,
        userId: user?.id,
        points: points,
      });
      updatePlanCompletion(planId, id);
      dispatch(setPoints(points));
      console.log('paaaa', planId);
      console.log(id);
      console.log('День завершен:', response.data);
      setOpen();

      window.location.reload();
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
        <DialogContent
          bg="gray.50"
          borderRadius="md"
          boxShadow="lg"
          p={6}
          border="1px"
          borderColor="teal.200"
        >
          <DialogHeader>
            <DialogTitle
              fontSize="2xl"
              fontWeight="bold"
              color="teal.500"
              textAlign="center"
            >
              ДОБРО ПОЖАЛОВАТЬ В {cardNumber}-Й ТРЕНИРОВОЧНЫЙ ДЕНЬ
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Box marginBottom={4}>
              <Text
                fontSize="lg"
                color="gray.700"
                marginBottom={4}
                marginTop={4}
              >
                Название: {title}
              </Text>
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={4}
                paddingLeft={6}
                paddingRight={6}
                maxHeight="300px"
                overflowY="auto"
              >
                <Text
                  fontSize="sm"
                  color="gray.700"
                  marginBottom={2}
                  style={{ fontWeight: 500 }}
                >
                  {target}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.700"
                  marginBottom={2}
                  style={{ fontWeight: 500 }}
                >
                  ТИП: {type}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.700"
                  marginBottom={2}
                  style={{ fontWeight: 500 }}
                >
                  Выполнить подходов: {rounds}
                </Text>
                <ul
                  style={{
                    listStyleType: 'disc',
                    paddingLeft: '1.5rem',
                    fontWeight: 500,
                  }}
                >
                  {descriptionLines.map((line, index) => (
                    <li
                      key={index}
                      style={{ marginBottom: '0.5rem', color: 'gray.600' }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={4}
                paddingLeft={6}
                paddingRight={6}
                mt={10}
                maxHeight="300px"
                overflowY="auto"
              >
                <ExecriseHelpToModal />
              </Box>
            </Box>
            <Box marginBottom={4} display="flex" justifyContent="space-around">
              <Button
                variant="surface"
                colorPalette="red"
                onClick={() => setOpen(false)}
                mt={4}
                borderRadius="10px"
              >
                ВЫЙТИ
              </Button>
              <Button
                variant="surface"
                colorPalette="teal"
                onClick={() => finishDayHandler(id)}
                mt={4}
                borderRadius="10px"
              >
                ЗАВЕРШИТЬ ДЕНЬ
              </Button>
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
