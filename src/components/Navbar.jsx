import { Box, HStack, IconButton, Image } from "@chakra-ui/react";
import Icon from "./Icon";
import Logo from './../assets/logo.svg';

export default function Navbar({ onMenuClicked = () => {}, onAddClicked = () => {} }) {
    return <Box p={3} bgColor="white" boxShadow="lg" zIndex="3" className="sh-navbar">
        <HStack spacing={4} justify="space-between">
            <IconButton variant="outline" icon={ <Icon name="menu-2" type="line" /> } onClick={ onMenuClicked } />
            <div className="sh-logo">
                <Image src={ Logo } alt="eFishery" />
            </div>
            <IconButton colorScheme="brand" variant="solid" icon={ <Icon name="add" type="line" /> } onClick={ onAddClicked } />
        </HStack>
    </Box>
}