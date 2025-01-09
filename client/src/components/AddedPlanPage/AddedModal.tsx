import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddedModal({ show, handleClose, activeStep, singlePlan }) {
  
    if(!singlePlan) {
        return `is loading`
    }
  

  return (
    <DialogRoot open={show}  size="full" placement="center"  >
      <DialogTrigger asChild>
        <Button  visibility={'none'}>
         
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Шаг ${activeStep + 1}`}</DialogTitle>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogHeader>
        <DialogBody>
          {singlePlan[activeStep] || 'Описание не доступно.'}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}