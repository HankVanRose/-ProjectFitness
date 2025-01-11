import { Box, Collapsible, Container, Text } from '@chakra-ui/react';
import { Group, Stack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsRoot,
} from '@/components/ui/steps';
import { useEffect, useState } from 'react';
import { PlanType } from '@/types';
import axiosInstance from '@/axiosInstance';
import { useParams } from 'react-router-dom';
import AddedModal from './AddedModal';

export default function AddedPlanPage() {
  const { VITE_API } = import.meta.env;
  const { id } = useParams();
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
    const planToShow = async (id: number) => {
      try {
        const result = await axiosInstance.get(`${VITE_API}/plans/${id}`);
        setSinglePlan(result.data);
      } catch (error) {
        console.error(error, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    planToShow(id);
  }, [id]);

  console.log(singlePlan.numOfTrainings);
  return (
    <>
      <Box
        padding="20px"
        display="flex"
        alignItems="start"
        justifyContent="center"
        minHeight="100vh"
      >
        <Container maxW="container.lg">
          <Container style={{ padding: 0, marginTop: 100 }}>
            <Text>{singlePlan.weeksDescription}</Text>
          </Container>
          <Stack spacing={4}>
            <Collapsible.Root>
              <Collapsible.Trigger
                paddingY="3"
                paddingX="4"
                backgroundColor="teal.500"
                color="white"
                borderRadius="md"
                style={{ width: '100%', textAlign: 'center' }}
                _hover={{ backgroundColor: 'teal.600' }}
              >
                {`ТВОЯ ПРОГРАММА ТРЕНИРОВОК`}
              </Collapsible.Trigger>

              <Collapsible.Content>
                <Box
                  padding="2"
                  borderWidth="22px"
                  borderColor="gray.300"
                  borderRadius="md"
                  boxShadow="md"
                  marginTop="2"
                  backgroundColor="white"
                >
                  <Stack gap="10" width="full">
                    <StepsRoot
                      defaultValue={1}
                      count={singlePlan.numOfTrainings}
                      colorPalette="green"
                    >
                      <StepsList >
                        {[...Array(singlePlan.numOfTrainings)].map(
                          (_, stepIndex) => (
                            <StepsItem
                              onClick={() => handleOpen(stepIndex)}
                              key={stepIndex}
                              index={stepIndex}
                            />
                          )
                        )}
                      </StepsList>
                      {[...Array(singlePlan.numOfTrainings)].map(
                        (_, contentIndex) => (
                          <StepsContent key={contentIndex} index={contentIndex}>
                            {`ДЕНЬ ${contentIndex + 1}`}
                          </StepsContent>
                        )
                      )}
                      <StepsCompletedContent>
                        ПОЗДРАВЛЯЕМ ТЫ ЗАКОНЧИЛ НЕДЕЛЮ
                      </StepsCompletedContent>
                      <Group>
                        <StepsNextTrigger asChild>
                          <Button variant="outline" size="sm">
                            СЛЕДУЮЩИЙ ДЕНЬ
                          </Button>
                        </StepsNextTrigger>
                      </Group>
                    </StepsRoot>
                  </Stack>
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </Stack>
        </Container>
      </Box>
      <AddedModal
        show={showModal}
        handleClose={handleClose}
        activeStep={activeStep}
        singlePlan={singlePlan.id}
      />
    </>
  );
}
