import { Button, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface SideBarProps {
activeTab: number;
setActiveTab: (index: number) => void;
}
export default function SideBarComp({ activeTab, setActiveTab }: SideBarProps) {
const tabs = ['Мой профиль', 'Учетная запись', 'Мой план'];
// const activeBg = useColorModeValue('#16a34a', '#16a34a'); // фон активной кнопки (светлая/темная темы)
// const inactiveBg = useColorModeValue('gray.100', 'undefined'); // фон неактивной кнопки
const activeColor = useColorModeValue('27272A', '27272A'); // цвет текста активной кнопки

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
    </VStack>
  );
}
