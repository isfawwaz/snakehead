import { Box, HStack, IconButton, Image } from "@chakra-ui/react";
import Icon from "./Icon";
import Logo from './../assets/logo.svg';
import { useHistory, useLocation } from "react-router-dom";

const _ = require('lodash');

export default function Navbar({ onMenuClicked = () => {}, onAddClicked = () => {} }) {
    const location = useLocation();
    const history = useHistory();

    const isHome = !_.isEmpty( location.pathname.match(/^\/$/) );

    return <Box p={3} bgColor="white" boxShadow="xl" zIndex="3" className="sh-navbar" pos="relative">
        <HStack spacing={4} justify="space-between">
            { isHome 
                ? <IconButton variant="outline" icon={ <Icon name="menu-2" type="line" /> } onClick={ onMenuClicked } />
                : <IconButton variant="outline" icon={ <Icon name="arrow-left-s" type="line" size="lg" /> } onClick={ () => history.push("/") } />
            }
            <div className="sh-logo">
                <Image src={ Logo } alt="eFishery" />
            </div>
            <IconButton colorScheme="brand" variant="solid" icon={ <Icon name="add" type="line" /> } onClick={ onAddClicked } />
        </HStack>
    </Box>
}