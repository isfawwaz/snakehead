import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './../pages/Home';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function App() {
    const [isMediaLarge] = useMediaQuery("(min-width: 992px)");
    const {  isOpen, onOpen, onClose } = useDisclosure();

    return <main className="app">
        <section className="sh-main-sidebar">
            <Sidebar isOpen={ isOpen } onClose={ onClose } onOpen={ onOpen } />
        </section>
        <section className="sh-main-content">
            <Navbar onMenuClicked={ onOpen } onAddClicked={ () => alert() } />
            <Switch>
                <Route path="/" exact component={ Home } />
            </Switch>
        </section>
        <section className="sh-main-detail"></section>
    </main>
}