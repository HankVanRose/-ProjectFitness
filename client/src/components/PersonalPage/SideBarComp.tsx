import { Button, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}
export default function SideBarComp({ activeTab, setActiveTab }: SideBarProps) {
  const tabs = ['Мой профиль', 'Учетная запись', 'Мои планы'];
  // const activeBg = useColorModeValue('#16a34a', '#16a34a'); // фон активной кнопки (светлая/темная темы)
  // const inactiveBg = useColorModeValue('gray.100', 'undefined'); // фон неактивной кнопки
  const activeColor = useColorModeValue('27272A', '27272A'); // цвет текста активной кнопки
  const navigate = useNavigate();

  // const handleTabClick = (index: number) => {
  //   if (activeTab === 3) {
  //     navigate('/calendar');
  //   } else {
  //     setActiveTab(index);
  //   }
  // };

  return (
    <VStack gap={4} align='stretch' w='full' minW='200px'>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          size='lg'
          variant='surface'
          colorPalette={activeTab === index ? 'green' : undefined}
          borderRadius='sm'
          // variant={activeTab === index ? 'solid' : 'ghost'}
          // bg={activeTab === index ? activeBg : undefined}
          // _hover={{ bg: activeTab === index ? activeBg : 'gray.200' }}
          color={activeTab === index ? activeColor : undefined}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </Button>
      ))}
      <Button
        size='lg'
        variant='surface'
        colorPalette={activeTab === 3 ? 'green' : undefined}
        borderRadius='sm'
        color={activeTab === 3 ? activeColor : undefined}
        onClick={() => navigate('/calendar')}
      >
        Календарь
      </Button>
    </VStack>
  );
}
