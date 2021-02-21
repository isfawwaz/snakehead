import {
    Avatar,
    Box,
    Heading,
    HStack,
    IconButton, 
    Text, 
    useMediaQuery, 
    VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFishes } from "../stores/hooks";
import { formatDate, formatDateHuman, formatNumber, isDesktop, sentenceSerial } from "../utils/ext";
import FishImage from "./FishImage";
import Icon from "./Icon";

export default function Fish({ id, name, province, city, price, timestamp, onEditClick, onDeleteClick, onClick }) {
    // Variable
    const areaFormatted = sentenceSerial([ province, city ]);
    const priceFormatted = formatNumber( price );
    const dateFormatted = formatDateHuman( timestamp );

    const [ isMediaLarge ] = useMediaQuery( isDesktop() );

    const [ hover, setHover ] = useState(false);
    
    const { detail } = useFishes();
    const [ isActive, setIsActive ] = useState(false);

    useEffect( () => {
        if( detail.uuid == id ) {
            setIsActive( true );
        } else {
            setIsActive( false );
        }
    }, [detail]);

    // JSX Element
    return <Box 
    pos="relative"
    borderRadius="lg" 
    p={ 4 } 
    background={ isActive ? "brand.500" : "white" }
    boxShadow={ isActive ? "2xl" : "none" }
    _hover={{ boxShadow: "xl", zIndex: 1 }}
    transition="all .3s ease-in-out" 
    cursor="pointer"
    zIndex={ isActive ? 2 : 0 }
    onMouseEnter={ () => setHover(true) }
    onMouseLeave={ () => setHover(false) }
    onClick={ onClick }>
        <HStack spacing={4} align="stretch">
            {/* <Avatar name={ name } src="https://bit.ly/broken-link" size="lg" colorScheme="teal" /> */}
            <FishImage name={ name } inverted={ isActive } />
            <VStack spacing={ 1 } align="flex-start" justify="flex-start" w="full" h="full">
                <HStack spacing={4} justify="space-between" w="full">
                    <Heading as="h5" size="sm" color={ isActive ? "white" : "gray.600" } isTruncated>{ name }</Heading>
                    <Text fontSize="xs" color={ isActive ? "white" : "gray.300" }>{ dateFormatted }</Text>
                </HStack>
                <Text fontSize="sm" color={ isActive ? "white" : "gray.400" } isTruncated>{ areaFormatted }</Text>
                <Text fontSize="sm" color={ isActive ? "brand.100" : "brand.500" } fontWeight="bold">Rp { priceFormatted }</Text>
            </VStack>
        </HStack>
        <Box pos="absolute" top=".5rem" right="1rem" bg={ isActive ? "brand.500" : "white" } pl={ 4 } display={ hover && isMediaLarge ? "block" : "none" }>
            <HStack>
                <IconButton onClick={ onEditClick } color={ isActive ? "white" : "gray.400" } colorScheme={ isActive ? "blackAlpha" : "gray" } fontWeight="normal" variant="ghost" size="sm" isRound icon={ <Icon name="edit" type="line" /> } />
                <IconButton onClick={ onDeleteClick } color={ isActive ? "white" : "red.400" } colorScheme={ isActive ? "blackAlpha" : "gray" } fontWeight="normal" variant="ghost" size="sm" isRound icon={ <Icon name="delete-bin-7" type="line" /> } />
            </HStack>
        </Box>
    </Box>;
}