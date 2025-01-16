import { Flex, Link } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
type UnauthenticatedNavProps = {
  toggleModal: (string: 'signUp' | 'signIn') => void;
};
export default function UnauthenticatedNav({ toggleModal}: UnauthenticatedNavProps) {
    
  const textColor = useColorModeValue('black', 'white');

  return (
    <Flex gap={8}>
      <Link
        color={textColor}
        textDecoration="none"
        _hover={{
          textDecoration: 'none',
          color: 'gray.200',
          cursor: 'pointer',
        }}
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={() => toggleModal('signIn')}
      >
        ВОЙТИ
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
        onClick={() => toggleModal('signUp')}
      >
        РЕГИСТРАЦИЯ
      </Link>
    </Flex>
  );
}
