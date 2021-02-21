import { 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, DrawerHeader, DrawerOverlay, 
    HStack, 
    Spinner, 
    Text, 
    useDisclosure, 
    useMediaQuery, 
    useToast
} from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter, Switch, useHistory, withRouter } from 'react-router-dom';
import Add from '../pages/Add';
import Home from '../pages/Home';
import { useFishes } from '../stores/hooks';
import { isDesktop } from '../utils/ext';
import ConditionalWrapper from './ConditialWrapper';
import Detail from './Detail';
import DetailDefault from './DetailDefault';
import ModalSwitch from './ModalSwitch';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const _ = require('lodash');

function App() {
    // Navbar Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isMediaLarge ] = useMediaQuery( isDesktop() );

    const { loading } = useFishes();

    let history = useHistory();

    const toast = useToast();

    const handleAddClick = () => {
        history.push({ pathname: "add", state: { modal: true } })
    }

    useEffect( () => {
        if( loading ) {
            toast({
                position: isMediaLarge ? "bottom-right" : "top",
                duration: null,
                render: () => (
                    <HStack spacing={4} bg="accent.500" p={3} rounded="lg" color="white" shadow="lg">
                        <Spinner />
                        <Text>Loading...</Text>
                    </HStack>
                )
            });
        } else {
            toast.closeAll();
        }
    }, [loading]);

    return <>
        <Navbar onMenuClicked={ onOpen } onAddClicked={ handleAddClick } />
        <main className="app">
            <section className="sh-main-sidebar">
                <Sidebar isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } onAddClicked={ handleAddClick }  />
            </section>
            <section className="sh-main-content">
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/add" component={ Add } />
                </Switch>
            </section>
        </main>
    </>
}

export default App;