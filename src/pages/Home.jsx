import { 
    useContext,
    useEffect, 
    useState 
} from 'react';
import {
    VStack
} from "@chakra-ui/react";
import Fish from '../components/Fish';
import { ACTIONS, snakeHead, useFetchFishes } from '../stores/hooks';
import Filter from '../components/Filter';
import { withRouter } from 'react-router-dom';
import * as api from '../api/stein';

const _ = require('lodash');

function Home() {
    const [ data, setData ] = useState([]);

    const { fishes, sort } = useFetchFishes();

    const globalState = useContext(snakeHead);
    const { dispatch } = globalState;

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
    
    return <div className="sh-content">
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
                onClick={ () => onItemClicked( fish.uuid ) } /> ) }
        </VStack>
    </div>;
}

export default withRouter(Home);