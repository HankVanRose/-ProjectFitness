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
import './A.css';

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
        // const res = await axiosInstance.get<DayExercise[]>(`${VITE_API}/days`);
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

  console.log(dayExercises);

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
      <DialogContent style={{ width: '90%', maxWidth: '90%' }}>
        <DialogHeader>
          <DialogTitle>{`ДЕНЬ ${activeStep + 1}`}</DialogTitle>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogHeader>
        <DialogBody>
          {currentPlan.map((exercise) => (
            <div key={exercise.id} style={{ marginBottom: '20px' }}>
              <h3>{exercise.name}</h3>
              <img
                src={exercise.image}
                alt={exercise.name}
                style={{ width: '100px', height: '100px' }}
              />
              <p>{exercise.shortDescription}</p>
            </div>
          ))}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
