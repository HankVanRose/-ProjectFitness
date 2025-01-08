import { FormEvent, useState } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks/hooks';

interface SignInModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function SigninModal({ show, handleClose }: SignInModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { signin } = useAuth();
  const { error } = useAppSelector((store) => store.appSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signin(formData);
      if (response.success) {
        setFormData({
          email: '',
          password: '',
        });
        handleClose();
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <DialogRoot
      size={'md'}
      placement="center"
      open={show}
      onOpenChange={handleClose}
    >
      <DialogContent p={4} backgroundColor={'white'} color={'black'}>
        <DialogHeader>
          <DialogTitle mb={5} fontWeight={600}>
            Sign in
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <VStack>
              <Box w="100%">
                <Text mb={2}>Email address</Text>
                <Input
                  p={2}
                  id="email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  border={'1px solid black'}
                />
              </Box>

              <Box w="100%">
                <Text mb={2}>Password</Text>
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>

              <Box w="100%" mt={4}>
                <Flex justify="space-between" align="center">
                  <Button
                    onClick={() => {
                      /* Handle forgot password */
                    }}
                  >
                    Forgot Password?
                  </Button>
                  <Button
                    p={3}
                    borderRadius="md"
                    color={'black'}
                    variant="outline"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </form>

          {error && (
            <Box
              mt={4}
              p={3}
              bgColor="red.500/20"
              border="1px"
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
