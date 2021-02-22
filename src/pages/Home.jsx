import { 
    useContext,
    useEffect, 
    useRef, 
    useState 
} from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import Fish from '../components/Fish';
import { ACTIONS, snakeHead, useFetchFishes } from '../stores/hooks';
import Filter from '../components/Filter';
import { useHistory, withRouter } from 'react-router-dom';
import * as api from '../api/stein';
import { isDesktop } from '../utils/ext';
import DetailDefault from '../components/DetailDefault';
import ConditionalWrapper from '../components/ConditialWrapper';
import Detail from '../components/Detail';

const _ = require('lodash');

function Home() {
    const history = useHistory();
    const [ data, setData ] = useState([]);

    const { fishes, sort, loading, detail } = useFetchFishes();

    // Detail Drawer
    const [ isDetailOpen, setIsDetailOpen ] = useState( false );
    const onDetailOpen = () => setIsDetailOpen(true);
    const onDetailClose = () => setIsDetailOpen(false);
    
    const btnRef = useRef();
    const [ isMediaLarge ] = useMediaQuery( isDesktop() );

    const globalState = useContext(snakeHead);
    const { dispatch } = globalState;

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

    const onItemClicked = (id) => {
        dispatch({ type: ACTIONS.DETAIL_REQUEST });
        async function fetch() {
            await api.get("list", { uuid: id }, (items) => {
                if( !_.isEmpty(items) ) {
                    dispatch({
                        type: ACTIONS.DETAIL_RECEIVE,
                        payload: items[0]
                    });
                }
            }, (e) => {
                dispatch({
                    type: ACTIONS.DETAIL_ERROR,
                    payload: e
                })
            });
        }
        fetch();
    }

    useEffect( () => {
        setData([...fishes]);
    }, [fishes, sort]);
    
    return <>
        <div className="sh-main-content__list">
            <Filter />
            <VStack spacing={4} align="stretch">
                { data.map( (fish, indx) => <Fish 
                    key={ indx } 
                    id={ fish.uuid } 
                    name={ fish.komoditas } 
                    province={ fish.area_provinsi } 
                    city={ fish.area_kota } 
                    price={ fish.price }
                    timestamp={ fish.timestamp }
                    onClick={ () => onItemClicked( fish.uuid ) }
                    onEditClick={ () => history.push("/edit/" + fish.uuid) } /> ) }
            </VStack>
        </div>
        <div className="sh-main-content__detail">
            <section className="sh-main-detail">
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
            </section>
        </div>
    </>;
}

export default withRouter(Home);