import { useEffect, useState } from 'react';
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
import { useFetchList } from '../stores/reducer';

export default function Home() {
    // const [ sort, setSort ] = useState();
    // const handleChange = (event) => setSort(event.target.value);
    const { fishes, loading, errors } = useFetchList();
    const [ data, setData ] = useState([]);

    useEffect( () => {
        setData([...fishes]);
    }, [fishes]);
    return <div className="sh-content">
        <HStack spacing={ 4 } mb={4}>
            <InputGroup>
                <Input type="search" variant="filled" placeholder="Cari komoditas, area atau lainnya..." />
                <InputRightElement pointerEvents="none" children={ <Icon name="search-2" type="line" /> }/>
            </InputGroup>
            {/* <IconButton aria-label="Refresh data" colorScheme="brand" icon={ <Icon name="refresh" type="line" /> } value={ sort } onChange={ handleChange } /> */}
        </HStack>
        <VStack spacing={4} align="stretch">
            {/* <Fish name="Nila" province="Jawa Barat" city="Cirebon" price={ 30000 } timestamp="1611219068529" isActive={ true } />
            <Fish name="Nila" province="Jawa Barat" city="Cirebon" price={ 30000 } timestamp="1611219068529" /> */}
            { data.map( (fish, indx) => <Fish key={ indx } name={ fish.komoditas } province={ fish.area_provinsi } city={ fish.area_kota } price={ fish.price } timestamp={ fish.timestamp } /> ) }
        </VStack>
    </div>;
}