import { 
    HStack, 
    Text, 
    IconButton, 
    Drawer, 
    useDisclosure, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    DrawerBody, 
    VStack,
    useMediaQuery, 
    Box, 
    Button, 
    InputGroup,
    Input,
    InputRightElement
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import Select from 'react-select';
import sort from "../data/sort";
import { ACTIONS, snakeHead, useFetchArea, useFetchSizes } from "../stores/hooks";
import { isDesktop } from "../utils/ext";
import Form from "./Form";
import Icon from "./Icon";

const Filter = ({ onFilterChanged }) => {
    const options = sort;
    const { provinces, cities } = useFetchArea();
    const { sizes, filter, loading } = useFetchSizes();

    const [ isMediaLarge ] = useMediaQuery( isDesktop() );
    const [ selectedSort, setSelectedSort ] = useState([ options[0]]);
    const selectStyles = {
        container: provided => ({
            ...provided,
            width: "100%"
        })
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    
    const model = {
        province: {
            type: "select",
            label: "Provinsi",
            placeholder: "Filter provinsi",
            defaultValue: filter.area_provinsi,
            options: provinces,
            loading: loading
        },
        city: {
            type: "select",
            label: "Kota",
            placeholder: "Filter kota",
            defaultValue: filter.area_kota,
            options: cities,
            loading: loading
        },
        size: {
            type: "select",
            label: "Ukuran",
            placeholder: "Filter ukuran",
            defaultValue: filter.size,
            options: sizes,
            loading: loading
        },
        filter: {
            type: "submit",
            label: "Filter",
            loading: loading
        }
    };

    const onFormSubmit = ( values, setSubmitting, isClearClicked ) => {
        if( isClearClicked ) {
            onClose();
        }
        // setSubmitting( loading );
        dispatch({
            type: ACTIONS.FISH_FILTER,
            province: values.province,
            city: values.city,
            size: values.size
        });
    }

    const globalState = useContext(snakeHead);
    const { state, dispatch } = globalState;
    const onSortChanged = (value) => {
        dispatch({
            type: ACTIONS.FISH_SORT,
            sort: value.value,
            payload: state.fishes
        });
    }

    const [ searchState, setSearchState ] = useState({
        value: null,
        typing: false,
        typingTimeout: 0
    });
    const onSearchInputChange = (event) => {
        if( searchState.typingTimeout ) {
            clearTimeout( searchState.typingTimeout );
        }

        setSearchState({
            value: event.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                dispatch({
                    type: ACTIONS.FISH_FILTER,
                    search: event.target.value
                });
            }, 300)
        })
    }

    return <>
        <HStack spacing={ 4 } mb={4}>
            <InputGroup>
                <Input type="search" variant="filled" placeholder="Cari komoditas, area atau lainnya..." onChange={ onSearchInputChange } />
                <InputRightElement pointerEvents="none" children={ <Icon name="search-2" type="line" /> }/>
            </InputGroup>
        </HStack>
        <HStack justify="space-between" mb={ 4 }>
            <Text mr={2}>Urutkan</Text>
            <Select options={ options } defaultValue={ selectedSort } onChange={ onSortChanged } styles={ selectStyles } />
            { isMediaLarge 
            ? <IconButton ref={ btnRef } onClick={ onOpen } fontWeight="normal" variant="outline" fontSize="xl" icon={ <Icon name="filter-3" type="line" /> } /> 
            : <Box pos="fixed" left={0} bottom={0} zIndex={ 10 } p={5} w="full">
                <VStack justify="center">
                    <Button colorScheme="brand" shadow="lg" rounded="full" px={ 6 } leftIcon={ <Icon name="filter-3" type="line" /> } onClick={ onOpen }>Filter</Button>
                </VStack>
            </Box> }
        </HStack>
        <Drawer isOpen={ isOpen } placement="right" onClose={ onClose } finalFocusRef={btnRef} id="ASD" closeOnEsc={ true } closeOnOverlayClick={ true }>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Filter Data</DrawerHeader>
                    <DrawerBody>
                        <div className="sh-filter">
                            <VStack>
                                <Form model={ model } onSubmit={ onFormSubmit } clear />
                            </VStack>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    </>;
}

export default Filter;