import {
    HStack,
    Spinner,
    Text,
    useDisclosure,
    useMediaQuery,
    useToast
} from '@chakra-ui/react';
import { useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Add from '../pages/Add';
import Edit from '../pages/Edit';
import Home from '../pages/Home';
import { useFishes } from '../stores/hooks';
import { isDesktop } from '../utils/ext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App() {
    // Navbar Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMediaLarge] = useMediaQuery(isDesktop());

    const { loading } = useFishes();

    let history = useHistory();

    const toast = useToast();

    const handleAddClick = () => {
        history.push({ pathname: "add", state: { modal: true } })
    }

    useEffect(() => {
        if (loading) {
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
        <Navbar onMenuClicked={onOpen} onAddClicked={handleAddClick} />
        <main className="app">
            <section className="sh-main-sidebar">
                <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} onAddClicked={handleAddClick} />
            </section>
            <section className="sh-main-content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/add" component={Add} />
                    <Route exact path="/edit/:id" component={Edit} />
                </Switch>
            </section>
        </main>
    </>
}

export default App;