import { Heading, Text, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { toNumber } from "underscore.string";
import { useFetchFishes, useFishes } from "../stores/hooks";
import { formatDate, formatNumber, momment, sentenceSerial } from "../utils/ext";
import dataAnimation from './../assets/animation/whale.json';

export default function DetailDefault() {
    const [ total, setTotal ] = useState(0);
    const [ start, setStart ] = useState(null);
    const [ end, setEnd ] = useState(null);

    const { fishes } = useFishes();
    useEffect( () => {
        if( fishes.length > 0 ) {
            // Set Total
            setTotal(fishes.length);

            // Set start - end
            let data = fishes;
            data.sort( (a,b) => {
                if(a.timestamp < b.timestamp) { return -1; }
                if(a.timestamp > b.timestamp) { return 1; }
                return 0;
            });
            let startData = data[0];
            let endData = data[ data.length - 1 ];

            setStart( startData.timestamp );
            setEnd( endData.timestamp );
        }
    }, [fishes]);

    return <>
        <VStack w="full" h="full" align="center" justify="center">
            <div className="sh-animation-svg">
                <Lottie animationData={ dataAnimation} autoPlay={ true } loop={ true } />
            </div>
            <VStack spacing={ 1 }>
                <Text fontWeight="600" color="gray.500" fontSize="2xl">Total Data</Text>
                <Heading color="brand.500" size="4xl">{ formatNumber(total) }</Heading>
                <Heading color="gray.300" fontSize="sm">{ sentenceSerial([ formatDate( start, false ), formatDate( end, false ) ]) }</Heading>
            </VStack>
        </VStack>
    </>
}