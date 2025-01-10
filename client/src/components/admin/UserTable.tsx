import { Button, Table, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';

const users = [
  {
    id: 1,
    username: 'JohnDoe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar1.jpg',
    gender: 'Male',
    age: 25,
    height: '175cm',
    weight: '70kg',
    points: 100,
    calories: 2000,
    goal: 'Weight Loss',
  },
  {
    id: 2,
    username: 'SarahSmith',
    email: 'sarah@example.com',
    avatar: 'https://example.com/avatar2.jpg',
    gender: 'Female',
    age: 30,
    height: '165cm',
    weight: '58kg',
    points: 150,
    calories: 1800,
    goal: 'Muscle Gain',
  },
  {
    id: 3,
    username: 'MikeJohnson',
    email: 'mike@example.com',
    avatar: 'https://example.com/avatar3.jpg',
    gender: 'Male',
    age: 35,
    height: '182cm',
    weight: '85kg',
    points: 75,
    calories: 2500,
    goal: 'Maintenance',
  },
  {
    id: 4,
    username: 'EmilyDavis',
    email: 'emily@example.com',
    avatar: 'https://example.com/avatar4.jpg',
    gender: 'Female',
    age: 28,
    height: '170cm',
    weight: '63kg',
    points: 200,
    calories: 1900,
    goal: 'Weight Loss',
  },
  {
    id: 5,
    username: 'AlexWilson',
    email: 'alex@example.com',
    avatar: 'https://example.com/avatar5.jpg',
    gender: 'Male',
    age: 42,
    height: '178cm',
    weight: '78kg',
    points: 180,
    calories: 2200,
    goal: 'Muscle Gain',
  },
  {
    id: 6,
    username: 'LisaBrown',
    email: 'lisa@example.com',
    avatar: 'https://example.com/avatar6.jpg',
    gender: 'Female',
    age: 32,
    height: '168cm',
    weight: '61kg',
    points: 120,
    calories: 1750,
    goal: 'Maintenance',
  },
  {
    id: 7,
    username: 'DavidLee',
    email: 'david@example.com',
    avatar: 'https://example.com/avatar7.jpg',
    gender: 'Male',
    age: 29,
    height: '173cm',
    weight: '72kg',
    points: 90,
    calories: 2300,
    goal: 'Weight Loss',
  },
  {
    id: 8,
    username: 'AmyTaylor',
    email: 'amy@example.com',
    avatar: 'https://example.com/avatar8.jpg',
    gender: 'Female',
    age: 27,
    height: '163cm',
    weight: '55kg',
    points: 160,
    calories: 1600,
    goal: 'Muscle Gainфацсцццццццццццццццццццццццццццццццццццццццццццццццццццццццццццц',
  },
  {
    id: 9,
    username: 'RobertClark',
    email: 'robert@example.com',
    avatar: 'https://example.com/avatar9.jpg',
    gender: 'Male',
    age: 38,
    height: '180cm',
    weight: '82kg',
    points: 140,
    calories: 2400,
    goal: 'Maintenance',
  },
  {
    id: 10,
    username: 'JennaWhite',
    email: 'jenna@example.com',
    avatar: 'https://example.com/avatar10.jpg',
    gender: 'Female',
    age: 31,
    height: '167cm',
    weight: '59kg',
    points: 170,
    calories: 1850,
    goal: 'Weight Loss',
  },
];
const handleBlockUser = (userId) => {
  // Add your blocking logic here
  console.log(`Blocking user with ID: ${userId}`);
};

const UserTable = ({ users1 }) => {
  return (
    <Table.Root size="sm" interactive stickyHeader>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader p={3}>Аватар</Table.ColumnHeader>
          <Table.ColumnHeader p={3}>Username</Table.ColumnHeader>
          {/* <Table.ColumnHeader p={3}>Роль</Table.ColumnHeader> */}
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
            {/* <Table.Cell p={3}>{user?.role}</Table.Cell> */}
            <Table.Cell p={3}>{user .email}</Table.Cell>
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
                  css: { backgroundColor: 'rgba(2, 149, 7, 0.5)', padding: 2 },
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
  );
};

export default UserTable;
