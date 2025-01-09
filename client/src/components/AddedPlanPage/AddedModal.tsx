import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AddedModal({
  show,
  handleClose,
  activeStep,
  singlePlan,
}) {
  console.log(singlePlan?.shortDescription);
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
