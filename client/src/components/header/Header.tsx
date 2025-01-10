import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserLogout, userActivePlan } from '@/store/thunkActions';
import { Box, Flex, Container, Link, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import SignupModal from './SignupModal';
import SigninModal from './SigninModal';
import { setError } from '@/store/appSlice';
import { ColorModeButton } from '../ui/color-mode';

export default function Header() {
  const { user } = useAppSelector((state) => state.appSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modals, setModals] = useState({
    signUp: false,
    signIn: false,
  });

  // useEffect(() => {
  //   dispatch(userActivePlan(user?.id))
  // }, [user?.id])

  // const {userplan} = useAppSelector((store)=> store.appSlice)

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
      <Box bg={{ base: 'white', _dark: 'black' }} py={4} width="100%">
        <Container px={8} mx="auto">

          <Flex align="center" justify="space-between">
            <Link
              color={{ base: 'black', _dark: 'white' }}
              fontSize="xl"
              fontWeight="bold"
              textDecoration="none"
              _hover={{ textDecoration: 'none', cursor: 'pointer' }}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              onClick={() => navigate('/')}
            >
              BE FIT
            </Link>

            {/* {userplan} */}
            <Flex gap={4}>
              {!user ? (
                <Flex gap={8}>
                  <Link
                    color={{ base: 'black', _dark: 'white' }}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.300',
                      cursor: 'pointer',
                    }}
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => toggleModal('signIn')}
                  >
                    ВОЙТИ
                  </Link>
                  <Link
                    color={{ base: 'black', _dark: 'white' }}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.300',
                      cursor: 'pointer',
                    }}
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => toggleModal('signUp')}
                  >
                    РЕГИСТРАЦИЯ
                  </Link>
                </Flex>
              ) : (
                <Flex align="center" gap={8}>
                  <Link
                    color={{ base: 'black', _dark: 'white' }}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.300',
                      cursor: 'pointer',
                    }}
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => navigate('/exercises')}
                  >
                    УПРАЖНЕНИЯ
                  </Link>
                  <Link
                    color={{ base: 'black', _dark: 'white' }}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.300',
                      cursor: 'pointer',
                    }}
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => navigate('/card')}
                  >
                    ПЛАНЫ ТРЕНИРОВОК
                  </Link>
                  <Link
                    color={{ base: 'black', _dark: 'white' }}
                    textDecoration="none"
                    _hover={{
                      textDecoration: 'none',
                      color: 'gray.300',
                      cursor: 'pointer',
                    }}
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
                    color={{ base: 'black', _dark: 'white' }}
                    onClick={handleLogOut}
                    _hover={{ bg: 'whiteAlpha.100' }}
                    _focus={{ outline: 'none', boxShadow: 'none' }}
                  >
                    ВЫЙТИ
                  </Button>
                </Flex>
              )}
              <ColorModeButton />
            </Flex>
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
