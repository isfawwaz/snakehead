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
import Filter from '../components/Filter';
import { withRouter } from 'react-router-dom';

function Home() {
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
        </HStack>
        <Filter />
        <VStack spacing={4} align="stretch">
            { data.map( (fish, indx) => <Fish key={ indx } name={ fish.komoditas } province={ fish.area_provinsi } city={ fish.area_kota } price={ fish.price } timestamp={ fish.timestamp } /> ) }
        </VStack>
    </div>;
}

export default withRouter(Home);