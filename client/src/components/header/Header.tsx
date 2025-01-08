import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserLogout } from '@/store/thunkActions';
import { Box, Flex, Container, Link, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import SignupModal from './SignupModal'; // Adjust the import path as needed
import SigninModal from './SigninModal'; // You'll need to create this component
import { setError } from '@/store/appSlice';

export default function Header() {
  const { user } = useAppSelector((state) => state.appSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modals, setModals] = useState({
    signUp: false,
    signIn: false,
  });

  const handleLogOut = () => {
    dispatch(fetchUserLogout());
    navigate('/');
  };

  const toggleModal = (modalName: 'signUp' | 'signIn') => {
    setModals((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
    dispatch(setError(null));

  };

  return (
    <>
      <Box bg="#000000" py={4}>
        <Container maxW="container.lg" px={8}>
          <Flex align="center" justify="space-between">
            <Link
              color="white"
              fontSize="xl"
              fontWeight="bold"
              textDecoration="none"
              _hover={{ textDecoration: 'none', cursor: 'pointer' }}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              onClick={() => navigate('/')}
            >
              BE FIT
            </Link>

            {!user ? (
              <Flex gap={8}>
                <Link
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none', color: 'gray.300', cursor: 'pointer' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => toggleModal('signIn')}
                >
                  ВОЙТИ
                </Link>
                <Link
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none', color: 'gray.300', cursor: 'pointer' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => toggleModal('signUp')}
                >
                  РЕГИСТРАЦИЯ
                </Link>
              </Flex>
            ) : (
              <Flex align="center" gap={8}>
                <Link
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none', color: 'gray.300', cursor: 'pointer' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => navigate('/exercises')}
                >
                  УПРАЖНЕНИЯ
                </Link>
                <Link
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none', color: 'gray.300', cursor: 'pointer' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => navigate('/account')}
                >
                  {user.username.toUpperCase()}
                </Link>
                <Image
                  src={user.avatar}
                  alt="User avatar"
                  boxSize="40px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <Button
                  variant="ghost"
                  color="white"
                  onClick={handleLogOut}
                  _hover={{ bg: 'whiteAlpha.100' }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                >
                  ВЫЙТИ
                </Button>
              </Flex>
            )}
          </Flex>
        </Container>
      </Box>

      <SignupModal 
        show={modals.signUp} 
        handleClose={() => toggleModal('signUp')} 
      />
      <SigninModal 
        show={modals.signIn} 
        handleClose={() => toggleModal('signIn')} 
      />
    </>
  );
}
