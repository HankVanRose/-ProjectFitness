import { Button } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import { useAppSelector } from '@/store/hooks/hooks';

const DownloadButton = () => {
  const { user } = useAppSelector((store) => store.appSlice);
  const { VITE_API } = import.meta.env;

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `${VITE_API}/download/excel/user/${user?.id}`,
        {
          responseType: 'blob',
        }
      );
      console.log(user?.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    }
  };

  return (
    <Button
      minW='10ch'
      variant='surface'
      colorPalette='green'
      borderRadius='sm'
      className='mt-3'
      px={2}
      onClick={handleDownload}
    >
      Скачать Excel
    </Button>
  );
};

export default DownloadButton;
