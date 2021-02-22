import { Divider, HStack, IconButton, Table, Tbody, Td, Text, Th, Tr, useMediaQuery, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ACTIONS, deleteFish, loadFish, snakeHead, SortFilter, useFishes } from "../stores/hooks";
import { caps, formatDate, formatNumber, isDesktop } from "../utils/ext";
import AlertConfirmation from "./AlertConfimation";
import FishImage from "./FishImage"
import Icon from "./Icon";

const _ = require('lodash');

const Detail = ({ id, name, onBackClick, province = null, city = null, price = 0, size = 0, date = null, timestamp = null }) => {
    const [ isMediaLarge ] = useMediaQuery( isDesktop() );
    const [ isDelete, setIsDelete ] = useState(false);
    const onClose = () => setIsDelete(false)

    const history = useHistory();

    const globalState = useContext(snakeHead);

    const { deleteSuccess, detail, fishes } = useFishes();

    // const indexData = fishes.indexOf( detail );
    // const [ indexData, setIndexData ] = useState(-1);
    const onEditClick = () => history.push("/edit/" + id);
    const onDeleteClick = () => {
        deleteFish( globalState, id );
    }

    useEffect( () => {
        if( deleteSuccess ) {
            loadFish( globalState );
        }
    }, [deleteSuccess, fishes, detail]);
    
    return <div className="sh-fish-detail">
        <AlertConfirmation id={ id } name={ name } onDelete={ onDeleteClick } isOpen={ isDelete } onClose={ onClose } />
        <HStack p={ 4 } justify="space-between">
            <HStack>
                { !isMediaLarge ? <IconButton color="gray.600" size="lg" fontSize="4xl" fontWeight="normal" variant="ghost" onClick={ onBackClick } icon={ <Icon name="arrow-left-s" type="line" /> } /> : false }
                <Text fontSize="lg" color="gray.500" fontWeight="500">Detail Ikan: { name }</Text>
            </HStack>
            <HStack>
                <IconButton onClick={ onEditClick } color="gray.400" size="lg" fontSize="2xl" fontWeight="normal" variant="ghost" icon={ <Icon name="edit" type="line" /> } />
                <IconButton onClick={ () => setIsDelete(true) }color="red.400" size="lg" fontSize="2xl" fontWeight="normal" variant="ghost" icon={ <Icon name="delete-bin-7" type="line" /> } />
            </HStack>
        </HStack>
        <Divider />
        <VStack spacing={ 4 } py={ 8 }>
            <FishImage name={ name } big />
            <Text color="gray.500" fontSize="4xl" fontWeight="600">{ name }</Text>
            <Table>
                <Tbody>
                    <Tr>
                        <Th color="gray.400">Provinsi:</Th>
                        <Td color="gray.600">{ caps( province ) }</Td>
                    </Tr>
                    <Tr>
                        <Th color="gray.400">Kota:</Th>
                        <Td color="gray.600">{ caps( city ) }</Td>
                    </Tr>
                    <Tr>
                        <Th color="gray.400">Harga:</Th>
                        <Td>
                            <Text color="brand.500" fontWeight="600">Rp { formatNumber(price) }</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Th color="gray.400">Ukuran:</Th>
                        <Td color="gray.600">{ formatNumber(size) }</Td>
                    </Tr>
                    <Tr>
                        <Th color="gray.400">Tanggal Diparsed</Th>
                        <Td color="gray.600">{ formatDate( date, false ) }</Td>
                    </Tr>
                    <Tr>
                        <Th color="gray.400">Tanggal Dibuat</Th>
                        <Td color="gray.600">{ formatDate( timestamp, false ) }</Td>
                    </Tr>
                </Tbody>
            </Table>
        </VStack>
    </div>;
}

export default Detail;
