import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { Box, Flex, Container, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useCallback, useState } from 'react';
import SignupModal from './SignupModal';
import SigninModal from './SigninModal';
import { setError } from '@/store/appSlice';
import { ColorModeButton, useColorModeValue } from '../ui/color-mode';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';
import { GrUserAdmin } from "react-icons/gr";

export default function Header() {
  const { user } = useAppSelector((state) => state.appSlice);
  const dispatch = useAppDispatch();
  const textColor = useColorModeValue('black', 'white');

  const [modals, setModals] = useState({
    signUp: false,
    signIn: false,
  });

  const navigate = useNavigate()

  const toggleModal = useCallback(
    (modalName: 'signUp' | 'signIn') => {
      setModals((prev) => ({
        ...prev,
        [modalName]: !prev[modalName],
      }));
      dispatch(setError(null));
    },
    [dispatch]
  );


  return (
    <>
      <Box py={2} width="100%">
        <Container px={6} mx="auto">
          <Flex align="center" justify="space-between">
            <Link
              color={textColor}
              fontSize="xl"
              fontWeight="700"
              textDecoration="none"
              onClick={() => navigate('/')}
            >
              BE FIT
            </Link>

            <Flex gap={4}>
              {user ? (
                <AuthenticatedNav />
              ) : (
                <UnauthenticatedNav toggleModal={toggleModal} />
              )}
            

              <ColorModeButton borderRadius="50%" />
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
