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
import { DayExercise, ExercisesType } from '@/types';
import axiosInstance from '@/axiosInstance';
import { useAppSelector } from '@/store/hooks/hooks';
import { setLoading } from '@/store/appSlice';

export default function AddedModal({
  show,
  handleClose,
  activeStep,
  singlePlan,
}) {
  const { VITE_API } = import.meta.env;

  const [dayExercises, setDayExercises] = useState<DayExercise>({});

  useEffect(() => {
    const dayExr = async () => {
      try {
        const res = await axiosInstance.get(`${VITE_API}/days`);
        setDayExercises(res.data);
      } catch (error) {
        console.error(error, 'error');
      } finally {
        setLoading(false);
      }
    };
    dayExr();
  }, []);

  console.log(dayExercises);

  if (!singlePlan) {
    return `is loading`;
  }

  return (
    <DialogRoot
      open={show}
      size="full"
      placement="center"
      scrollBehavior="outside"
    >
      <DialogTrigger asChild>
        <Button visibility={'none'}></Button>
      </DialogTrigger>
      <DialogContent style={{ width: '50%', maxWidth: '80%' }}>
        <DialogHeader>
          <DialogTitle>{`ДЕНЬ ${activeStep + 1}`}</DialogTitle>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogHeader>
        <DialogBody>{singlePlan?.shortDescription}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
