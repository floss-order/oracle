import React, { useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, IconButton, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';

function BlockCard({ transNumber, type, source, date, time }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSumbit(event, transNumber) {
        event.preventDefault();
        navigate(`/transactions/${transNumber}`, { replace: true });
    };

    return (
        <>
            <Box bg='white' p={4} borderWidth='1px' borderRadius='lg' overflow='hidden' maxW="md">
                <IconButton onClick={onOpen} icon={<FiExternalLink />} />
                <Box mt={4}>
                    <Text color="gray.400">номер транзакции</Text>
                    <Text fontWeight="semibold" fontSize='lg'>{transNumber}</Text>
                </Box>
                <Box mt={4}>
                    <Text color="gray.400">тип данных</Text>
                    <Text fontWeight="semibold" fontSize='lg'>{type}</Text>
                </Box>
                <Box mt={4}>
                    <Text color="gray.400">источник данных</Text>
                    <Text fontWeight="semibold" fontSize='lg'>{source}</Text>
                </Box>
                <Box mt={4}>
                    <Text color="gray.400">дата создания</Text>
                    <Text fontWeight="semibold" fontSize='lg'>{date}</Text>
                </Box>
                <Box mt={4}>
                    <Text color="gray.400">время создания</Text>
                    <Text fontWeight="semibold" fontSize='lg'>{time}</Text>
                </Box>
            </Box>
            <AlertDialog
                isOpen={isOpen}
                isCentered
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                motionPreset="scale"
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Введите пароль
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text fontSize='lg'>
                            Для просмотра информации о транзакции необходимо ввести пароль.
                            </Text>

                            <form onSubmit={(event) => handleSumbit(event, transNumber)} id="password-confirmation">
                                <FormControl
                                    mt={4}
                                    >
                                    <FormLabel htmlFor='password'>Пароль</FormLabel>
                                    <Input id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} isRequired/>
                                </FormControl>
                            </form>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} type="submit" form="password-confirmation">
                                Отправить
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Отмена
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default BlockCard;