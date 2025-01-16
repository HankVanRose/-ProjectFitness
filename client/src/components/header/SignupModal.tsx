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
import { useColorModeValue } from '../ui/color-mode';

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
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

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
    <>

    <DialogRoot
      size={'md'}
      placement="center"
      open={show}
      onOpenChange={handleClose}
    >
      <DialogContent p={3} backgroundColor={bgColor} color={textColor}>
        <DialogHeader>
          <DialogTitle mb={5} fontWeight={600}>
            Регистрация
          </DialogTitle>
          <DialogCloseTrigger borderRadius="md" />
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <VStack>
              <Box w="100%">
                <Text mb={2}>Имя пользователя</Text>
                <Input
                  p={2}
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Введите ваш имя пользователя"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Box>

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
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>

              <Flex w="100%" justify="flex-end" mt={2}>
                <Button
                  p={3}
                  borderRadius="md"
                  color={textColor}
                  variant="outline"
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </Flex>
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
         <Text color="red.500" textAlign="center">{error}</Text>
       </Box>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
    </>
  );
}
