import { Box, Button, Input, Table, Text, HStack } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import axiosInstance from '@/axiosInstance';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { InputGroup } from '../ui/input-group';
import { useColorModeValue } from '../ui/color-mode';

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  points: number;
  calories: number;
  goal: string;
  isAdmin: boolean;
}

interface PaginatedResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  const fetchUsers = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<PaginatedResponse>(
        `/api/users?page=${page}&limit=${limit}&search=${search}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const lupacolor = useColorModeValue('rgba(57, 57, 57, 0.6)', 'white');
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers(1, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers(currentPage, searchQuery);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          bg={bgColor}
          color={textColor}
          variant={currentPage === i ? 'solid' : 'outline'}
          onClick={() => handlePageChange(i)}
          mx={1}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };
  const handleBlockUser = async (userId: number) => {
    try {
      //! пока нет ендпоинта
      await axiosInstance.put(`/api/users/${userId}/block`);
      fetchUsers(currentPage, searchQuery);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  return (
    <Box>
      <Box m={4}>
        <InputGroup
          flex="1"
          startElement={
            <Box pl={2}>
              <IoSearch color={lupacolor} size={30} />
            </Box>
          }
        >
          <Input
            pl={12}
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Box>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Table.Root size="md" interactive stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader p={3}>Аватар</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Username</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Роль</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Почта</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Пол</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Возраст</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Рост</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Вес</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Баллы</Table.ColumnHeader>
                <Table.ColumnHeader p={3}>
                  Сожженные <br /> калории
                </Table.ColumnHeader>
                <Table.ColumnHeader p={3}>Цель</Table.ColumnHeader>
                <Table.ColumnHeader>Блок</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell p={3}>
                    <Avatar
                      variant="outline"
                      name={user.username}
                      src={user?.avatar}
                    />
                  </Table.Cell>
                  <Table.Cell p={3}>{user?.username}</Table.Cell>
                  <Table.Cell p={3}>
                    {user?.isAdmin ? 'admin' : 'basic baby'}
                  </Table.Cell>
                  <Table.Cell p={3}>{user.email}</Table.Cell>
                  <Table.Cell p={3}>{user?.gender}</Table.Cell>
                  <Table.Cell p={3}>{user?.age}</Table.Cell>
                  <Table.Cell p={3}>{user?.height}</Table.Cell>
                  <Table.Cell p={3}>{user?.weight}</Table.Cell>
                  <Table.Cell p={3}>{user?.points}</Table.Cell>
                  <Table.Cell p={3}>{user?.calories}</Table.Cell>
                  <Table.Cell p={3}>
                    <Tooltip
                      content={user?.goal}
                      positioning={{ placement: 'top' }}
                      openDelay={300}
                      closeDelay={100}
                      contentProps={{
                        css: {
                          backgroundColor: 'rgba(2, 149, 7, 0.8)',
                          padding: 2,
                        },
                      }}
                    >
                      <Text cursor="pointer">
                        {user?.goal.length > 15
                          ? user?.goal.slice(0, 15) + '...'
                          : user?.goal}
                      </Text>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorPalette="green"
                      variant="outline"
                      borderRadius={10}
                      p={2}
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block User
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Box mt={4} p={5}>
            <HStack justify="space-between" align="center">
              <Text>
                Количество найденных всех пользователей: <b>{totalUsers} </b>
              </Text>
              <HStack>
                <Button
                  bg={bgColor}
                  color={textColor}
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {renderPagination()}
                <Button
                  bg={bgColor}
                  color={textColor}
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </HStack>
            </HStack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserTable;
