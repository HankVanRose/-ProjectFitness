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


  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className={className}>
      <Flex borderRadius="md">
        <Input
          p={2}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Введите ваш пароль"
          value={value}
          onChange={onChange}
          borderRight="none"
          roundedRight="none"
        />
        <Box>
          <Button
            border="1px solid rgba(146, 146, 146, 0.3)"
            borderRadius="0 5px 5px 0"
            h="100%"
            onClick={() => setShowPassword(!showPassword)}
            variant="ghost"
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
