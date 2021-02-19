import { useState } from 'react';
import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    HStack,
    VStack
} from "@chakra-ui/react";
import Select from 'react-select'
import Icon from './../components/Icon';
import dataSort from './../data/sort';
import Fish from '../components/Fish';

export default function Home() {
    const [ sort, setSort ] = useState();
    const handleChange = (event) => setSort(event.target.value);
    return <div className="sh-content">
        <HStack spacing={ 4 } mb={4}>
            <InputGroup>
                <Input type="search" variant="filled" placeholder="Cari komoditas, area atau lainnya..." />
                <InputRightElement pointerEvents="none" children={ <Icon name="search-2" type="line" /> }/>
            </InputGroup>
            {/* <IconButton aria-label="Refresh data" colorScheme="brand" icon={ <Icon name="refresh" type="line" /> } value={ sort } onChange={ handleChange } /> */}
        </HStack>
        <VStack spacing={4} align="stretch">
            <Fish name="Nila" province="Jawa Barat" city="Cirebon" price={ 30000 } timestamp="1611219068529" isActive={ true } />
            <Fish name="Nila" province="Jawa Barat" city="Cirebon" price={ 30000 } timestamp="1611219068529" />
        </VStack>
    </div>;
}