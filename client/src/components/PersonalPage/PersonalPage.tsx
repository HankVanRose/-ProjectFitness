import { Container, HStack, VStack } from '@chakra-ui/react';
import ProgressBarComp from './ProgressBarComp';
import ProfileData from './ProfileData';

export default function PersonalPage() {
  return (
    <Container mx='auto'>
      <ProgressBarComp />
      <Container>
        <HStack>
          <VStack>
            <ProfileData />
          </VStack>
        </HStack>
      </Container>
    </Container>
  );
}
