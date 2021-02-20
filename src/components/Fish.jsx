import {
    Avatar,
    Box,
    Heading,
    HStack, 
    Text, 
    VStack
} from "@chakra-ui/react";
import moment from "moment";
import { capitalize, toSentenceSerial, numberFormat, toNumber, isBlank, words } from "underscore.string";
import 'moment/locale/id';

export default function Fish({ name, province, city, price, timestamp, isActive = false }) {
    // Function
    const caps = (value) => {
        if( !isBlank(value) && value != null && value !== undefined) {
            let w = words( value.toLowerCase() );
            let i = [];
            w.forEach( item => {
                i.push( capitalize( item ) );
            });
            return toSentenceSerial( i, " ", " " );
        }

        return value;
    }
    // Setup 3rd party
    moment.locale('id');
    
    // Variable
    const areaFormatted = toSentenceSerial([caps(province), caps(city)], " - ", " - ")
    const priceFormatted = numberFormat( toNumber( price ), ",", "." );
    const dateFormatted = timestamp !== undefined ? moment( toNumber(timestamp) ).fromNow() : "";

    // JSX Element
    return <Box 
    borderRadius="lg" 
    p={ 4 } 
    background={ isActive ? "brand.500" : "white" }
    boxShadow={ isActive ? "2xl" : "none" }
    _hover={{ boxShadow: "xl", zIndex: 1 }}
    transition="all .3s ease-in-out" 
    cursor="pointer"
    zIndex={ isActive ? 2 : 0 }>
        <HStack spacing={4} align="stretch">
            <Avatar name={ name } src="https://bit.ly/broken-link" size="lg" colorScheme="teal" />
            <VStack spacing={ 1 } align="flex-start" justify="flex-start" w="full" h="full">
                <HStack spacing={4} justify="space-between" w="full">
                    <Heading as="h5" size="sm" color={ isActive ? "white" : "gray.600" } isTruncated>{ name }</Heading>
                    <Text fontSize="sm" color={ isActive ? "brand.100" : "brand.500" } fontWeight="bold">Rp { priceFormatted }</Text>
                </HStack>
                <Text fontSize="sm" color={ isActive ? "white" : "gray.400" } isTruncated>{ areaFormatted }</Text>
                <Text fontSize="xs" color={ isActive ? "white" : "gray.300" }>{ dateFormatted }</Text>
            </VStack>
        </HStack>
    </Box>;
}