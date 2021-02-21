import * as api from './../api/stein';
import { createContext, useContext, useEffect, useReducer } from "react";
import { caps, momment } from '../utils/ext';

const _ = require('lodash');

const asyncForEach = async (array = [], callback) => {
    await Promise.all(array.map(callback));
}

const theSort = ( a, b, name, asc = true ) => {
    if( asc ) {
        if(a[name] < b[name]) { return -1; }
        if(a[name] > b[name]) { return 1; }
        return 0;
    }

    if(a[name] > b[name]) { return -1; }
    if(a[name] < b[name]) { return 1; }
    return 0;
}

export const ACTIONS = {
    FISH_REQUEST: "fish-request",
    FISH_RECEIVE: "fish-receive",
    FISH_ERROR: "fish-error",
    FISH_SEARCH: "fish-search",
    FISH_SORT: "fish-sort",
    FISH_FILTER: "fish-filter",

    AREA_REQUEST: "area-request",
    AREA_RECEIVE: "area-receive",
    AREA_ERROR: "area-error",

    SIZE_REQUEST: "size-request",
    SIZE_RECEIVE: "size-receive",
    SIZE_ERROR: "size-error",

    DETAIL_REQUEST: "detail-request",
    DETAIL_RECEIVE: "detail-receive",
    DETAIL_ERROR: "detail-error",

    ADD_REQUEST: "add-request",
    ADD_RECEIVE: "add-receive",
    ADD_ERROR: "add-error",

    EDIT_REQUEST: "edit-request",
    EDIT_RECEIVE: "edit-receive",
    EDIT_ERROR: "edit-error",
    EDIT_CLEAR: "edit-clear",

    UPDATE_REQUEST: "update-request",
    UPDATE_RECEIVE: "update-receive",
    UPDATE_ERROR: "update-error",

    DELETE_REQUEST: "delete-request",
    DELETE_RECEIVE: "delete-receive",
    DELETE_ERROR: "delete-error"
}

const SortFilter = {
    DEFAULT: "default",
    NAME_ASC: "name-a-z",
    NAME_DESC: "name-z-a",
    PROVINCE_ASC: "province-a-z",
    PROVINCE_DESC: "province-z-a",
    CITY_ASC: "city-a-z",
    CITY_DESC: "city-z-a",
    PRICE_ASC: "price-a-z",
    PRICE_DESC: "price-z-a",
    SIZE_ASC: "size-a-z",
    SIZE_DESC: "size-z-a"
}

const initState = {
    fishes: [],
    provinces: [],
    cities: [],
    sizes: [],
    loading: false,
    errors: {},
    sort: SortFilter.DEFAULT,
    filter: {
        search: void 0,
        uuid: void 0,
        komoditas: void 0,
        area_provinsi: void 0,
        area_kota: void 0,
        size: void 0,
        price: void 0,
        tgl_parsed: void 0,
        timestamp: void 0,
    },
    detail: {},
    edit: {}
}

const reducer = ( state, action ) => {
    switch( action.type ) {
        // MAIN DATA
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
                errors: {
                    ...state.errors,
                    fish: action.payload
                }
            }
        case ACTIONS.FISH_SORT:
            const fishes = action.payload;
            switch( action.sort ) {
                case SortFilter.NAME_ASC:
                    fishes.sort( (a,b) => theSort(a,b, "komoditas"));
                    break;
                case SortFilter.NAME_DESC:
                    fishes.sort( (a,b) => theSort(a,b, "komoditas", false));
                    break;
                case SortFilter.PROVINCE_ASC:
                    fishes.sort( (a,b) => theSort(a,b, "area_provinsi"));
                    break;
                case SortFilter.PROVINCE_DESC:
                    fishes.sort( (a,b) => theSort(a,b, "area_provinsi", false));
                    break;
                case SortFilter.CITY_ASC:
                    fishes.sort( (a,b) => theSort(a,b, "area_kota"));
                    break;
                case SortFilter.CITY_DESC:
                    fishes.sort( (a,b) => theSort(a,b, "area_kota", false));
                    break;
                case SortFilter.PRICE_ASC:
                    fishes.sort( (a,b) => theSort(a,b, "price"));
                    break;
                case SortFilter.PRICE_DESC:
                    fishes.sort( (a,b) => theSort(a,b, "price", false));
                    break;
                case SortFilter.SIZE_ASC:
                    fishes.sort( (a,b) => theSort(a,b, "size"));
                    break;
                case SortFilter.SIZE_DESC:
                    fishes.sort( (a,b) => theSort(a,b, "size", false));
                    break;
                default:
                    fishes.sort( (a,b) => theSort(a,b, "timestamp", false));
                    // fishes.sort( (a,b) => toNumber(a.timestamp) > toNumber(b.timestamp) );
                    break;
            }
            return {
                ...state,
                loading: false,
                fishes: fishes,
                sort: action.sort
            }
        case ACTIONS.FISH_FILTER:
            return {
                ...state,
                filter: {
                    uuid: action.id,
                    komoditas: action.search,
                    area_provinsi: action.province,
                    area_kota: action.city,
                    size: action.size
                }
            }

        // AREA
        case ACTIONS.AREA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.AREA_ERROR:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    area: action.payload
                }
            }
        case ACTIONS.AREA_RECEIVE:
            const data = _.union(action.payload);
            const provinces = [];
            const cities = [];

            const deduction = async () => {
                const dataProvinces = [];
                const dataCities = [];
                await asyncForEach( data, item => {
                    dataProvinces.push( item.province );
                    const findIndex = _.findIndex( dataCities, {label: item.province});
                    if ( findIndex !== -1 ) {
                        dataCities[findIndex].data.push( item.city );
                    } else {
                        dataCities.push({
                            label: item.province,
                            data: [ item.city ]
                        });
                    }
                });
                await asyncForEach( _.uniq(dataProvinces), province => {
                    provinces.push({ value: province, label: caps(province) });
                })
                await asyncForEach( dataCities, c => {
                    const d = [];
                    c.data.map( e => {
                        d.push({ value: e, label: caps(e) });
                    });
                    cities.push({ label: caps(c.label), options: d });
                });
            }
            deduction();
            return {
                ...state,
                loading: false,
                provinces: provinces,
                cities: cities
            }
            break;

        // SIZE
        case ACTIONS.SIZE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.SIZE_ERROR:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    area: action.payload
                }
            }
        case ACTIONS.SIZE_RECEIVE:
            const sizes = action.payload;
            const items = [];
            sizes.forEach( item => {
                items.push( { value: item.size, label: item.size } );
            })
            return {
                ...state,
                loading: false,
                sizes: items
            }
            break;

        // DETAIL
        case ACTIONS.DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    detail: action.payload
                }
            }
        case ACTIONS.DETAIL_RECEIVE:
            return {
                ...state,
                loading: false,
                detail: action.payload
            }
            break;

        // ADD
        case ACTIONS.ADD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.ADD_ERROR:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    add: action.payload
                }
            }
        case ACTIONS.ADD_RECEIVE:
            return {
                ...state,
                loading: false,
                addSuccess: action.payload
            }

        // EDIT

        // UPDATE

        // DELETE

        // DEFAULT
        default:
            return state;
    }
}

const snakeHead = createContext(initState);
const { Provider } = snakeHead;

const StateProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer( reducer, initState );

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export const useFetchFishes = () => {
    const globalState = useContext(snakeHead);
    const { state, dispatch } = globalState;
    useEffect( () => {
        dispatch({ type: ACTIONS.FISH_REQUEST });
        async function fetch() {
            await api.get("list", state.filter, (items) => {
                let data = items.filter( item => item.uuid != null && momment().unix() >= item.timestamp );
                dispatch({
                    type: ACTIONS.FISH_SORT,
                    sort: SortFilter.DEFAULT,
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
    }, [ state.filter ]);
    return state;
}

export const useFetchArea = () => {
    const globalState = useContext(snakeHead);
    const { state, dispatch } = globalState;
    useEffect( () => {
        dispatch({ type: ACTIONS.AREA_REQUEST });
        async function fetch() {
            await api.get("option_area", null, (items) => {
                dispatch({
                    type: ACTIONS.AREA_RECEIVE,
                    payload: items
                });
            }, (e) => {
                dispatch({
                    type: ACTIONS.AREA_ERROR,
                    payload: e
                })
            });
        }
        fetch();
    }, []);
    return state;
}

export const useFetchSizes = () => {
    const globalState = useContext(snakeHead);
    const { state, dispatch } = globalState;
    useEffect( () => {
        dispatch({ type: ACTIONS.SIZE_REQUEST });
        async function fetch() {
            await api.get("option_size", null, (items) => {
                dispatch({
                    type: ACTIONS.SIZE_RECEIVE,
                    payload: items
                });
            }, (e) => {
                dispatch({
                    type: ACTIONS.SIZE_ERROR,
                    payload: e
                })
            });
        }
        fetch();
    }, []);
    return state;
}

export const useFishes = () => {
    const globalState = useContext(snakeHead);
    const { state } = globalState;
    return state;
}

export { snakeHead, StateProvider };
