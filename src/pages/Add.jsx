import { Box, HStack } from "@chakra-ui/react";
import { useHistory, withRouter } from "react-router-dom";
import FishForm from "../components/FishForm"
import * as api from '../api/stein';
import { useContext } from "react";
import { ACTIONS, snakeHead } from "../stores/hooks";
import { v4 as uuidv4 } from 'uuid';
import { momment } from "../utils/ext";

const Add = () => {
    const globalState = useContext(snakeHead);
    const { dispatch } = globalState;

    const history = useHistory();

    const postData = (values) => {
        dispatch({ type: ACTIONS.ADD_REQUEST });
        const data = {
            uuid: uuidv4(),
            komoditas: values.name,
            area_provinsi: values.province.value,
            area_kota: values.city.value,
            size: values.size.value,
            price: values.price,
            tgl_parsed: momment().format(),
            timestamp: momment().unix()
        }
        async function call() {
            await api.post("list", data).then( item => {
                dispatch({
                    type: ACTIONS.ADD_RECEIVE,
                    payload: true
                });
                history.push("/");
            }, (e) => {
                dispatch({
                    type: ACTIONS.ADD_ERROR,
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
                    <FishForm onFinish={ postData } />
                </Box>
            </HStack>
        </div>
    </>;
}

export default withRouter(Add);