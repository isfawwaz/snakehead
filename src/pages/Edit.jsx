import { Box, HStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import * as api from '../api/stein';
import FishForm from "../components/FishForm";
import { ACTIONS, snakeHead, useFishes } from "../stores/hooks";

const _ = require('lodash');

const Edit = () => {
    let { id } = useParams();
    
    const history = useHistory();

    const globalState = useContext(snakeHead);
    const { dispatch } = globalState;

    const { edit } = useFishes();

    const getData = () => {
        dispatch({ type: ACTIONS.EDIT_REQUEST });
        async function fetch() {
            await api.get("list", { uuid: id }, (items) => {
                if( !_.isEmpty(items) ) {
                    dispatch({
                        type: ACTIONS.EDIT_RECEIVE,
                        payload: items[0]
                    });
                }
            }, (e) => {
                dispatch({
                    type: ACTIONS.EDIT_ERROR,
                    payload: e
                })
            });
        }
        fetch();
    }
    useEffect( () => {
        getData();
    }, []);

    const updateData = (values) => {
        dispatch({ type: ACTIONS.UPDATE_REQUEST });
        const data = {
            komoditas: values.name,
            area_provinsi: values.province.value,
            area_kota: values.city.value,
            size: values.size.value,
            price: values.price
        }
        async function call() {
            await api.update("list", edit.uuid, data).then( item => {
                dispatch({
                    type: ACTIONS.UPDATE_RECEIVE,
                    payload: true
                });
                dispatch({ type: ACTIONS.EDIT_CLEAR });
                history.push("/");
            }, (e) => {
                dispatch({
                    type: ACTIONS.UPDATE_ERROR,
                    payload: e
                })
            });
        }
        call();
    };

    return <>
        <div className="sh-main-content__wrapper">
            <HStack justify="center">
                <Box p={4} bg="white" rounded="lg" shadow="lg" w="lg">
                    <FishForm name={ edit.komoditas } province={ edit.area_provinsi } city={ edit.area_kota } size={ edit.size } price={ edit.price } onFinish={ updateData } />
                </Box>
            </HStack>
        </div>
    </>
}

export default Edit;