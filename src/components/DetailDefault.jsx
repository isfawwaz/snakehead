import { Heading, Text, VStack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { formatDate, formatNumber, sentenceSerial } from "../utils/ext";
import dataAnimation from './../assets/animation/whale.json';

export default function DetailDefault({ total = 0, start = null, end = null }) {
    return <>
        <VStack w="full" h="full" align="center" justify="center">
            <div className="sh-animation-svg">
                <Lottie animationData={ dataAnimation} autoPlay={ true } loop={ true } />
            </div>
            <VStack spacing={ 1 }>
                <Text fontWeight="600" color="gray.500" fontSize="2xl">Total Data</Text>
                <Heading color="brand.500" size="4xl">{ formatNumber(total) }</Heading>
                <Heading color="gray.300" fontSize="sm">{ sentenceSerial([ formatDate( start, false ), formatDate( end ) ]) }</Heading>
            </VStack>
        </VStack>
    </>
}