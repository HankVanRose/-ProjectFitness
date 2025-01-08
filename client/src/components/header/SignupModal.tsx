import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Text, Input, Button, Flex, VStack } from '@chakra-ui/react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import PasswordInput from './PasswordInput';
import { useAppSelector } from '@/store/hooks/hooks';
import { useAuth } from '@/hooks/useAuth';

interface SignUpModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function SignupModal({ show, handleClose }: SignUpModalProps) {
  const { signup } = useAuth();
  const { error } = useAppSelector((store) => store.appSlice);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signup(formData);

      if (response.success) {
        setFormData({
          email: '',
          password: '',
          username: '',
        });
        handleClose();
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DialogRoot open={show} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2}>Username</Text>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Box>

              <Box w="100%">
                <Text mb={2}>Email address</Text>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box w="100%">
                <Text mb={2}>Password</Text>
                <PasswordInput
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>

              <Flex w="100%" justify="flex-end" mt={2}>
                <Button variant="outline" type="submit">
                  Register
                </Button>
              </Flex>
            </VStack>
          </form>

          {error && (
            <Box
              mt={4}
              p={3}
              bg="red.50"
              border="1px"
              borderColor="red.500"
              borderRadius="md"
            >
              <Text color="red.500">{error}</Text>
            </Box>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
