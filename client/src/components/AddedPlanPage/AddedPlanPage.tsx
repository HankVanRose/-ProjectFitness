import { Box, Collapsible, Container, Text, Stack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { StepsCompletedContent, StepsContent, StepsItem, StepsList, StepsRoot } from '@/components/ui/steps';
import { useEffect, useState } from 'react';
import { PlanType } from '@/types';
import axiosInstance from '@/axiosInstance';
import { useParams } from 'react-router-dom';
import AddedModal from './AddedModal';

export default function AddedPlanPage() {
  const { VITE_API } = import.meta.env;
  const { id } = useParams<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [singlePlan, setSinglePlan] = useState<PlanType>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const handleClose = () => setShowModal(false);
  const handleOpen = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchSinglePlan = async (id: string) => {
      try {
        const result = await axiosInstance.get(`${VITE_API}/days/${id}`);
        setSinglePlan(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchSinglePlan(id);
  }, [id]);
  console.log('singe', singlePlan);

  return (
    <>
      <Box padding="20px" display="flex" alignItems="start" justifyContent="center" minHeight="100vh">
        <Container maxW="container.lg">
          <Text>{singlePlan.weeksDescription}</Text>
          <Stack spacing={4}>
            <Collapsible.Root>
              <Collapsible.Trigger paddingY="3" paddingX="4" backgroundColor="teal.500" color="white" borderRadius="md">
                ТВОЯ ПРОГРАММА ТРЕНИРОВОК
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Box padding="2" borderWidth="22px" borderColor="gray.300" borderRadius="md" boxShadow="md" marginTop="2" backgroundColor="white">
                  <StepsRoot defaultValue={1} count={singlePlan.numOfTrainings} colorPalette="green">
                    <StepsList>
                      {[...Array(singlePlan.numOfTrainings)].map((_, stepIndex) => (
                        <StepsItem key={stepIndex} onClick={() => handleOpen(stepIndex)} index={stepIndex} />
                      ))}
                    </StepsList>
                    {[...Array(singlePlan.numOfTrainings)].map((_, contentIndex) => (
                      <StepsContent key={contentIndex} index={contentIndex}>
                        {`ДЕНЬ ${contentIndex + 1}`}
                      </StepsContent>
                    ))}
                    <StepsCompletedContent>
                      ПОЗДРАВЛЯЕМ ТЫ ЗАКОНЧИЛ НЕДЕЛЮ
                    </StepsCompletedContent>
                    <Button variant="outline" size="sm">СЛЕДУЮЩИЙ ДЕНЬ</Button>
                  </StepsRoot>
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </Stack>
        </Container>
      </Box>
      <AddedModal show={showModal} handleClose={handleClose} activeStep={activeStep} singlePlan={singlePlan.id} />
    </>
  );
}