import { Box, Container, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from '@/components/ui/progress';
import { useAppSelector } from '../../store/hooks/hooks';

export default function ProgressBarComp() {
  const now = 60;
  const { user } = useAppSelector((state) => state.appSlice);

  return (
    <Container maxW='container.xl' py={6}>
      <HStack align='center'>
        <Box mx={10}>
          <Image
            src={user?.avatar}
            borderRadius='full'
            boxSize='200px'
            objectFit='cover'
          />
        </Box>
        <VStack align='stretch' flex={1} mr={10}>
          <ProgressRoot value={now} size='lg' colorPalette='green' striped>
            <ProgressLabel justifyContent='space-between'>
              <Flex gap={10}>
              <Text fontSize='xl' fontWeight='bold'>
                {user?.username?.toUpperCase()}
              </Text>
              <Text fontSize='xl' >{user?.points} баллов</Text>
              </Flex>
            </ProgressLabel>
            <ProgressBar />
          </ProgressRoot>
          <Text textAlign='right'>{`${now}%`}</Text>
        </VStack>
      </HStack>
    </Container>
  );
}
