import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch, useHistory, withRouter } from 'react-router-dom';
import { useGetFetchList } from '../stores/reducer';
import Detail from './Detail';
import DetailDefault from './DetailDefault';
import ModalSwitch from './ModalSwitch';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const _ = require('lodash');

function App() {
    const {  isOpen, onOpen, onClose } = useDisclosure();
    const { detail } = useGetFetchList();

    let history = useHistory();

    const handleAddClick = () => {
        history.push({ pathname: "add", state: { modal: true } })
    }

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
                { _.isEmpty(detail)
                    ? <DetailDefault />
                    : false }
            </section>
        </main>
    </>
}

export default App;