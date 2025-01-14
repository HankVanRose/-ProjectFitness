import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserLogout } from '@/store/thunkActions';
import { Button, Flex, Image, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';

export default function AuthenticatedNav() {
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(fetchUserLogout());
    navigate('/');
  };
  const textColor = useColorModeValue('black', 'white');
  const { VITE_TARGET } = import.meta.env;

  return (
    <Flex align="center" gap={8}>
       <Link
        color={textColor}
        textDecoration="none"
        _hover={{
          textDecoration: 'none',
          color: 'gray.300',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={() => navigate(`/${user?.id}/userplans`)}
      >
        МОИ ПЛАНЫ
      </Link>
      <Link
        color={textColor}
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
        color={textColor}
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
        color={textColor}
        textDecoration="none"
        _hover={{
          textDecoration: 'none',
          color: 'gray.300',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={() => navigate('/account')}
      >
        {user?.username ? user?.username.toUpperCase() : 'Профиль'}
      </Link>
      {user?.avatar && (
        <Image
          src={`${VITE_TARGET}${user.avatar}`}
          alt="User avatar"
          boxSize="40px"
          borderRadius="full"
          objectFit="cover"
        />
      )}
      <Button
        variant="ghost"
        color={textColor}
        onClick={handleLogOut}
        _hover={{ bg: 'whiteAlpha.100' }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
      >
        ВЫЙТИ
      </Button>
    </Flex>
  );
}
