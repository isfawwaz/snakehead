import { Box, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FishImage from './FishImage';
import Form from './Form';

const FishForm = ({ labelButton = "Simpan", onFinish, avatar = true }) => {
    const [ values, setValues ] = useState({});
    const [ comodity, setComodity ] = useState( null );

    const model = {
        "name": {
            "type": "text",
            "required": true,
            "label": "Komoditas",
            "placeholder": "Nama komoditas"
        },
        "province": {
            type: "select",
            required: true,
            label: "Provinsi",
            placeholder: "Pilih provinsi",
            options: [
                {
                    "value": "1",
                    "label": "item 1"
                },
                {
                    "value": "2",
                    "label": "item 2"
                }
            ]
        },
        "city": {
            type: "select",
            required: true,
            label: "Kota",
            placeholder: "Pilih kota",
            options: [
                {
                    "value": "1",
                    "label": "item 1"
                },
                {
                    "value": "2",
                    "label": "item 2"
                }
            ]
        },
        "price": {
            type: "currency",
            required: true,
            label: "Harga",
            placeholder: "Inputkan harga",
            value: 0
        },
        "size": {
            type: "number",
            required: true,
            label: "Ukuran",
            placeholder: "Inputkan ukuran ikan",
            value: 0,
        },
        "save": {
            type: "submit",
            label: labelButton
        }
    }
    const onFormSubmit = ( values, setSubmitting ) => {
        console.log('Submitted')
        console.log(values);
        setTimeout(() => {
            setSubmitting( false );
            if(onFinish) onFinish(values);
        }, 1000);
    }
    const onFormChange = ({ value, changed }) => {
        setValues(value);
    }

    useEffect( () => {
        setComodity( values.name );
    }, [values]);

    return <div className="sh-fish-form">
        <VStack spacing={ 4 } py={ 8 }>
            { avatar ? <FishImage name={ comodity } big /> : false }
            <Box p={ 6 } w="full">
                <Form model={ model } onSubmit={ onFormSubmit } onChange={ onFormChange } />
            </Box>
        </VStack>
    </div>;
}

export default FishForm;