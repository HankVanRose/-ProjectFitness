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
import { useColorModeValue } from '../ui/color-mode';

interface SignInModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function SigninModal({ show, handleClose }: SignInModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

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
      <DialogContent p={2} backgroundColor={bgColor} color={textColor}>
        <DialogHeader>
          <DialogTitle mb={5} fontWeight={600}>
          Вход
          </DialogTitle>
          <DialogCloseTrigger borderRadius='md' />
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <VStack>
              <Box w="100%">
                <Text mb={2}>Электронная почта</Text>
                <Input
                  p={2}
                  id="email"
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Введите вашу почту"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box w="100%">
                <Text mb={2}>Пароль</Text>
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
                      //!
                    }}
                    variant="ghost"
                    p={3}
                    borderRadius="md"
                  >
                    Забыли пароль?
                  </Button>
                  <Button
                    p={3}
                    borderRadius="md"
                    color={textColor}
                    variant="outline"
                    type="submit"
                  >
                    Войти
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
