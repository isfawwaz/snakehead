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

    // Detail Drawer
    const [ isDetailOpen, setIsDetailOpen ] = useState( false );
    const onDetailOpen = () => setIsDetailOpen(true);
    const onDetailClose = () => setIsDetailOpen(false);
    
    const btnRef = useRef();
    const [ isMediaLarge ] = useMediaQuery( isDesktop() );

    const { detail, loading } = useFishes();

    let history = useHistory();

    const toast = useToast();

    const handleAddClick = () => {
        history.push({ pathname: "add", state: { modal: true } })
    }

    useEffect( () => {
        if( loading ) {
            toast({
                position: "bottom-right",
                duration: null,
                render: () => (
                    <HStack spacing={4} bg="brand.500" p={3} rounded="lg" color="white">
                        <Spinner />
                        <Text>Loading...</Text>
                    </HStack>
                )
            });
        } else {
            toast.closeAll();
        }
    }, [loading]);

    useEffect( () => {
        if( isMediaLarge ) {
            if( isDetailOpen ) {
                onDetailClose();
            }
        } else {
            onDetailOpen();
        }
    }, [isMediaLarge]);

    useEffect( () => {
        if( !isDetailOpen ) {
            onDetailOpen();
        }
    }, [detail]);

    return <>
        <main className="app">
            <section className="sh-main-sidebar">
                <Sidebar isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } onAddClicked={ handleAddClick }  />
            </section>
            <section className="sh-main-content">
                <Navbar onMenuClicked={ onOpen } onAddClicked={ handleAddClick } />
                {/* <Switch location={ isModal ? previousLocation : location }>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/add"><ModalElement /></Route>
                </Switch> */}
                <Route component={ ModalSwitch } />
            </section>
            <section className="sh-main-detail">
                <Route exact path="/">
                    <Fragment>
                        { _.isEmpty(detail)
                    ? <DetailDefault />
                    :  <ConditionalWrapper
                            condition={ !isMediaLarge }
                            wrapper={ children => <Drawer blockScrollOnMount={ false } size="full" scrollBehavior="outside" isOpen={ isDetailOpen } placement="right" onClose={ onDetailClose } finalFocusRef={btnRef} id="detail" closeOnEsc={ true } closeOnOverlayClick={ true }>
                                <DrawerOverlay>
                                    <DrawerContent>
                                        <DrawerBody p={0}>{children}</DrawerBody>
                                    </DrawerContent>
                                </DrawerOverlay>
                            </Drawer>}>
                            <Detail 
                                id={ detail.uuid } 
                                name={ detail.komoditas } 
                                province={ detail.area_provinsi } 
                                city={ detail.area_kota } 
                                price={ detail.price }
                                size={ detail.size }
                                date={ detail.tgl_parsed }
                                timestamp={ detail.timestamp }
                                onBackClick={ onDetailClose }/>
                        </ConditionalWrapper>}
                    </Fragment>
                </Route>
            </section>
        </main>
    </>
}

export default App;