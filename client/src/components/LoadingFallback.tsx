// components/LoadingFallback.tsx
import { Box, Spinner, Text } from '@chakra-ui/react';

export const LoadingFallback = () => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minH="100vh"
    gap={4}
  >
    <Spinner 
      color="blue.500"
      size="xl"
    />
    <Text>Loading...</Text>
  </Box>
);
