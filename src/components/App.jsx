import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useGetFetchList } from '../stores/reducer';
import Home from './../pages/Home';
import DetailDefault from './DetailDefault';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function App() {
    const {  isOpen, onOpen, onClose } = useDisclosure();
    const { fishes } = useGetFetchList();

    const [ total, setTotal ] = useState(0);
    const [ data, setData ] = useState([]);
    
    useEffect( () => {
        setData([...fishes]);
        setTotal( data.length );
    }, [fishes]);

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
        <section className="sh-main-detail">
            <DetailDefault total={ total } />
        </section>
    </main>
}