import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from '@/components/ui/progress';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/axiosInstance';
import { fetchUserCheck } from '@/store/thunkActions';

export default function ProgressBarComp() {
  const now = 60;
  const { user } = useAppSelector((state) => state.appSlice);
  
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const { VITE_API } = import.meta.env;
  const { VITE_TARGET } = import.meta.env;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Пожалуйста, загрузите изображение');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user?.id.toString() || '');

    try {
      const response = await axiosInstance.post(
        `${VITE_API}/users/upload-avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAvatarPreview(response.data.avatrUrl);
      dispatch(fetchUserCheck());
      console.log('avatar url:', user?.avatar)
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      alert('Ошибка при загрузке файла');
    }
  };

   
 

  return (
    <Container maxW='container.xl' py={6}>
      <HStack align='center'>
        <Box
          mx={10}
          position='relative'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          cursor='pointer'
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={avatarPreview || `${VITE_TARGET}${user?.avatar}`}
            borderRadius='full'
            boxSize='200px'
            objectFit='cover'
          />
          {isHovered && (
            <Box
              position='absolute'
              top='0'
              left='0'
              right='0'
              bottom='0'
              borderRadius='full'
              bg='blackAlpha.600'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Text color='white' fontWeight='bold'>
                Сменить фото
              </Text>
            </Box>
          )}
          <Input
            type='file'
            name='avatar'
            ref={fileInputRef}
            display='none'
            accept='image/*'
            onChange={handleFileUpload}
          />
        </Box>
        <VStack align='stretch' flex={1} mr={10}>
          <ProgressRoot value={now} size='lg' colorPalette='green' striped>
            <ProgressLabel justifyContent='space-between'>
              <Flex gap={10}>
                <Text fontSize='xl' fontWeight='bold'>
                  {user?.username?.toUpperCase()}
                </Text>
                <Text fontSize='xl'>{user?.points} баллов</Text>
              </Flex>
            </ProgressLabel>
            <ProgressBar />
          </ProgressRoot>
          <Text textAlign='right'>{`${now}%`}</Text>
        </VStack>
      </HStack>
    </Container>
  );
}
