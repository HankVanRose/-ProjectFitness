import { ChangeEvent, useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  className?: string;
}

const PasswordInput = ({
  value,
  onChange,
  name = 'password',
  placeholder = 'Password',
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className={className}>
      <Flex>
        <Input
          p={2}
          type={showPassword ? 'text' : 'password'}
          border={'1px solid black'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          borderRight="none"
          roundedRight="none"
        />
        <Box
          borderWidth="1px"
          borderLeft="none"
          borderColor="inherit"
          roundedRight="md"
          p={0}
        >
          <Button
            h="100%"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
          >
            {showPassword ? (
              <MdVisibilityOff size={20} />
            ) : (
              <MdVisibility size={20} />
            )}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default PasswordInput;
