import axiosInstance from '@/axiosInstance';
import { useState, useRef } from 'react';
import { InputGroup } from '../ui/input-group';
import { PiNotePencilBold } from 'react-icons/pi';
import { Box, Input } from '@chakra-ui/react';
import { MdOutlineDone } from 'react-icons/md';

export default function PatchInput({ day, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(day.note || '');
  const inputRef = useRef(null);

  const handleNoteUpdate = async (newNote: string) => {
    try {
      const response = await axiosInstance.patch(
        `/api/userdays/note/${day.id}`,
        {
          userDayId: day.id,
          note: newNote,
          userId,
        }
      );

      console.log('Response:', response.data);
      setNote(newNote);
      setIsEditing(false);
    } catch (error) {
      console.error('Full error:', error);
    }
  };

  const handleIconClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      handleNoteUpdate(note);
    }
  };

  return (
    <InputGroup
      endElement={
        <Box
          mt={3}
          _hover={{ color: 'yellow.500' }}
          transition="color 0.2s"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isEditing ? (
            <MdOutlineDone
              onClick={() => handleNoteUpdate(note)}
              cursor="pointer"
              size={20}
            />
          ) : (
            <PiNotePencilBold
              onClick={handleIconClick}
              cursor="pointer"
              size={20}
            />
          )}
        </Box>
      }
      flex="1"
    >
      <Input
        ref={inputRef}
        border="none"
        _focus={{
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
        _active={{ border: 'none' }}
        value={note}
        disabled={!isEditing}
        placeholder={day.note ? day.note : 'оставить заметку...'}
        onChange={(e) => setNote(e.target.value)}
        _hover={{
          cursor: 'pointer',
        }}
        size="sm"
        p={0}
        mt={3}
        fontSize="0.8rem"
        width="100%"
      />
    </InputGroup>
  );
}
