import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchUserLogout } from '@/store/thunkActions';
import { Button, Flex, HStack, Link } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '../ui/color-mode';
import { IoCalendarOutline } from 'react-icons/io5';

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
        onClick={() => navigate('/plans')}
      >
        ПЛАНЫ ТРЕНИРОВОК
      </Link>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'gray.300',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={() => navigate('/calendar')}
      >
        <IoCalendarOutline size={30} />
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
      <HStack>
        <Avatar
          name={user?.username}
          src={`${VITE_TARGET}${user?.avatar}`}
          colorPalette="green"
        />
      </HStack>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'gray.500',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={handleLogOut}
      >
        ВЫЙТИ
      </Link>
    </Flex>
  );
}
