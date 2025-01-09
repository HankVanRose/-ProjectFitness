import { Box, Collapsible, Container, Text  } from '@chakra-ui/react';
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

export default function AddedPlanPage() {
  const { VITE_API } = import.meta.env;
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singlePlan, setSinglePlan] = useState<PlanType>({});

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

 

  return (
    <Box
      backgroundColor="#f9f9f9"
      padding="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxW="container.lg">
        <Stack spacing={4}>
          {[...Array(singlePlan.weeksDuration)].map((_, index) => (
            <Collapsible.Root key={index}>
              <Collapsible.Trigger
                paddingY="3"
                paddingX="4"
                backgroundColor="teal.500"
                color="white"
                borderRadius="md"
                style={{ width: '100%', textAlign: 'start' }}
                _hover={{ backgroundColor: 'teal.600' }}
              >
                {`НЕДЕЛЯ ${index + 1}`}
              </Collapsible.Trigger>
             
              <Collapsible.Content>
                <Box
                  padding="4"
                  borderWidth="2px"
                  borderColor="gray.300"
                  borderRadius="md"
                  boxShadow="md"
                  marginTop="2"
                  backgroundColor="white"
                >
                  <Stack gap="10" width="full">
                    <StepsRoot defaultValue={1} count={singlePlan.sessionsPerWeek} colorPalette="green">
                      <StepsList>
                        {[...Array(singlePlan.sessionsPerWeek)].map((_, stepIndex) => (
                          <StepsItem key={stepIndex} index={stepIndex} title={`Step ${stepIndex + 1}`} />
                        ))}
                      </StepsList>
                      {[...Array(singlePlan.sessionsPerWeek)].map((_, contentIndex) => (
                        <StepsContent key={contentIndex} index={contentIndex}>
                          {`ДЕНЬ ${contentIndex + 1}`}
                        </StepsContent>
                      ))}
                      <StepsCompletedContent>
                        ТЫ ЗАКОНЧИЛ НЕДЕЛЮ
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
                  {[...Array(singlePlan.weeksDescription)].map((_, index) => (
                  <Text key={index} >
                    {singlePlan.weeksDescription}

                  </Text>
                    ))}
                  
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}