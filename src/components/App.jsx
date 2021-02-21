import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch, useHistory, withRouter } from 'react-router-dom';
import { useGetFetchList } from '../stores/reducer';
import Home from './../pages/Home';
import Detail from './Detail';
import DetailDefault from './DetailDefault';
import FishForm from './FishForm';
import ModalSwitch from './ModalSwitch';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const ModalComponent = ({ history }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClose = () => {
        onClose();
        history.goBack();
    }
    useEffect( () => {
        onOpen();
    }, []);
    return <Modal isOpen={ isOpen } onClose={ handleClose } isCentered={ true } id="modal">
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Tambah Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Modal
            </ModalBody>
            <ModalFooter>
                Footer
            </ModalFooter>
        </ModalContent>
    </Modal>;
}
const ModalElement = withRouter(ModalComponent);

function App() {
    const {  isOpen, onOpen, onClose } = useDisclosure();
    const { fishes } = useGetFetchList();

    const [ total, setTotal ] = useState(0);
    const [ data, setData ] = useState([]);

    let history = useHistory();

    const handleAddClick = () => {
        history.push({ pathname: "add", state: { modal: true } })
    }
    
    useEffect( () => {
        setData([...fishes]);
        setTotal( data.length );
    }, [fishes]);

    return <>
        <main className="app">
            <section className="sh-main-sidebar">
                <Sidebar isOpen={ isOpen } onClose={ onClose } onOpen={ onOpen } onAddClicked={ handleAddClick }  />
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
                <FishForm />
            </section>
        </main>
    </>
}

export default App;