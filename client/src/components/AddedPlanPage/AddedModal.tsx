import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DayExercise } from '@/types';
import axiosInstance from '@/axiosInstance';
import { setLoading } from '@/store/appSlice';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface AddedModalProps {
  show: boolean;
  handleClose: () => void;
  activeStep: number;
  singlePlan: number;
}

export default function AddedModal({
  show,
  handleClose,
  activeStep,
  singlePlan,
}: AddedModalProps): JSX.Element {
  const { VITE_API } = import.meta.env;

  const [dayExercises, setDayExercises] = useState<DayExercise[]>([]);

  useEffect(() => {
    const dayExr = async () => {
      try {
        const res = await axiosInstance.get<DayExercise[]>(
          `${VITE_API}/days/${singlePlan}`
        );
        setDayExercises(res.data);
      } catch (error) {
        console.error(error, 'error');
      } finally {
        setLoading(false);
      }
    };
    dayExr();
  }, [singlePlan]);

  const { id } = useParams();
  const finishDayHandler = async (id) => {
    try {
      const response = await axiosInstance.patch(`${VITE_API}/days/${id}`, {
        isCompleted: true,
      });
      console.log('День завершен:', response.data);
      handleClose();
    } catch (error) {
      console.error('Ошибка при завершении дня:', error);
    }
  };

  console.log(id);

  const descr = dayExercises.map((exercise) => exercise.description);
  const exercisesArray = descr[0]?.split('; ').map((item) => item.trim());

  const currentPlan = dayExercises[activeStep]?.Exercises || [];

  return (
    <DialogRoot
      open={show}
      size="cover"
      placement="bottom"
      scrollBehavior="outside"
    >
      <DialogTrigger asChild>
        <Button visibility={'none'}></Button>
      </DialogTrigger>
      <DialogContent
        style={{
          width: '90%',
          maxWidth: '90%',
          scrollbarColor: 'blue',
          overflow: 'scroll',
          display: 'flex',
        }}
      >
        <DialogHeader>
          <DialogTitle>{`ДЕНЬ ${activeStep + 1}`}</DialogTitle>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogHeader>
        <DialogBody>
          <Box as="ul" listStylePosition="inside" padding={4}>
            {exercisesArray?.map((exerciselist, index) => (
              <Box
                as="li"
                key={index}
                padding={2}
                borderRadius="md"
                backgroundColor="gray.100"
                borderWidth="1px"
                borderColor="green.300"
                _hover={{
                  backgroundColor: 'green.200',
                  transition: 'transform 0.2s',
                }}
              >
                <Text fontWeight="bold">{exerciselist.toUpperCase()}</Text>
              </Box>
            ))}
            <Text paddingY={1} fontSize="sm" color="gray.600">
              * Во всех комплексах свободные веса указаны для мужчин. Для
              девушек вес = 2/3 от мужского.
            </Text>
            <Button
              variant="surface"
              colorPalette="green"
              onClick={finishDayHandler}
            >
              ЗАВЕРШИТЬ ДЕНЬ
            </Button>
          </Box>

          <Text fontSize="lg" fontWeight="semibold" marginBottom={4}>
            ССЫЛКИ НА УПРАЖНЕНИЕ С ТЕХНИКОЙ ВЫПОЛНЕНИЯ
          </Text>

          <Box
            style={{
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            }}
          >
            {currentPlan.map((exercise) => (
              <Box
                key={exercise.id}
                margin={2}
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
              >
                <Image
                  src={exercise?.image}
                  alt={exercise.name}
                  style={{ width: 300, height: 300 }}
                />
              </Box>
            ))}
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
