import { useReducer, useEffect } from "react"
import * as api from './../api/stein';

const initState = {
    fishes: [],
    loading: false,
    errors: {}
}

const ACTIONS = {
    FISH_REQUEST: "make-request",
    FISH_RECEIVE: "make-receive",
    FISH_ERROR: "make-error"
}

const reducer = ( state, action ) => {
    switch( action.type ) {
        case ACTIONS.FISH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.FISH_RECEIVE:
            return {
                ...state,
                loading: false,
                fishes: action.payload
            }
        case ACTIONS.FISH_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        default:
            return state;
    }
}

export const useFetchList = () => {
    const [ state, dispatch ] = useReducer( reducer, initState );
    useEffect( () => {
        dispatch({ type: ACTIONS.FISH_REQUEST });
        async function fetch() {
            await api.get("list", null, (items) => {
                let data = items.filter( item => item.uuid != null );
                dispatch({
                    type: ACTIONS.FISH_RECEIVE,
                    payload: data
                });
            }, (e) => {
                dispatch({
                    type: ACTIONS.FISH_ERROR,
                    payload: e
                })
            });
        }
        fetch();
    }, [])

    return state;
}

export const useGetFetchList = () => {
    const [ state ] = useReducer( reducer, initState );
    return state;
}