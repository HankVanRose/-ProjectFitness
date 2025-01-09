import { Box, Container, HStack, Image, Text, VStack } from '@chakra-ui/react';
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from '@/components/ui/progress';
import { useAppSelector } from '../../store/hooks/hooks';

export default function ProgressBarComp() {
  const now = 60;
  const { user, loading, error } = useAppSelector((state) => state.appSlice);

  return (
    <Container maxW='container.xl' py={6}>
      <HStack spacing={8} align='start'>
        <Box>
          <Image
            src={user?.avatar}
            borderRadius='full'
            boxSize='200px'
            objectFit='cover'
          />
        </Box>
        <VStack align='stretch' flex={1} spacing={4} >
          <ProgressRoot value={now} size='lg' colorPalette='green' striped>
            <ProgressLabel color={{ base: 'black', _dark: 'white' }} justify='space-between'>
              <Text fontSize='xl' fontWeight='bold'>
                {user?.username?.toUpperCase()}
              </Text>
              <Text fontSize='xl' >{user?.points} баллов</Text>
            </ProgressLabel>
            <ProgressBar />
          </ProgressRoot>
          <Text textAlign='right'>{`${now}%`}</Text>
        </VStack>
      </HStack>
    </Container>
  );
}
