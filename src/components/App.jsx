import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useGetFetchList } from '../stores/reducer';
import Home from './../pages/Home';
import Detail from './Detail';
import DetailDefault from './DetailDefault';
import FishForm from './FishForm';
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
            {/* <DetailDefault total={ total } /> */}
            {/* <Detail id="0c192840-7ee4-11ea-b3e1-e335da5df3hj" name="Cupang" province="JAWA BARAT" city="CIMAHI" size="101" price="20100" date="2020-06-01T00:00:00+07:00" timestamp="1590944400" /> */}
            <FishForm />
        </section>
    </main>
}