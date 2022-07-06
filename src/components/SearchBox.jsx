import React, { useState } from 'react';
import { Box, Button, Input, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [searchQuery, setSearchQuery] = useState('');

    function handleChange(event) {
        setSearchQuery(event.target.value);
        console.log(searchQuery);
    };

    const isError = searchQuery === '';

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/search", { replace: false, state: { 'searchQuery': searchQuery } })
    }

    return (
        <Box bg='white' p={4} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel htmlFor="searchQuery">
                        Номер транзакции
                    </FormLabel>
                    <Flex gap={2}>
                        <Input
                            id="searchQuery"
                            type="search"
                            placeholder="Введите номер транзакции"
                            size="lg"
                            value={searchQuery}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" size="lg" colorScheme='green'>Поиск</Button>
                    </Flex>
                    {!isError ? (
                        <FormHelperText>
                            Введите номер транзакции. Для получения доступа может понадобиться пароль.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Поле не может быть пустым</FormErrorMessage>
                    )}
                </FormControl>
            </form>
        </Box>
    );
};

export default SearchBox;