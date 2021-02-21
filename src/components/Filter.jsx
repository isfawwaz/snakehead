import { HStack, Text, IconButton, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, useMediaQuery, Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import Select from 'react-select';
import sort from "../data/sort";
import { isDesktop } from "../utils/ext";
import Form from "./Form";
import Icon from "./Icon";

const Filter = ({ onSortChanged, onFilterChanged }) => {
    const [ isMediaLarge ] = useMediaQuery( isDesktop() );
    const options = sort;
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
            options: [
                {
                    "value": "1",
                    "label": "item 1"
                },
                {
                    "value": "2",
                    "label": "item 2"
                }
            ]
        },
        city: {
            type: "select",
            label: "Kota",
            placeholder: "Filter kota",
            options: [
                {
                    "value": "1",
                    "label": "item 1"
                },
                {
                    "value": "2",
                    "label": "item 2"
                }
            ]
        },
        size: {
            type: "select",
            label: "Ukuran",
            placeholder: "Filter ukuran",
            options: [
                {
                    "value": "1",
                    "label": "item 1"
                },
                {
                    "value": "2",
                    "label": "item 2"
                }
            ]
        },
        filter: {
            type: "submit",
            label: "Filter"
        }
    };

    const onFormSubmit = ( values, setSubmitting ) => {
        setSubmitting(false);
        onFilterChanged( values );
    }

    return <>
        <HStack justify="space-between" mb={ 4 }>
            <Text mr={2}>Urutkan</Text>
            <Select options={ options } defaultValue="default" onChange={ onSortChanged } styles={ selectStyles } />
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
                                <Form model={ model } onSubmit={ onFormSubmit } />
                            </VStack>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    </>;
}

export default Filter;