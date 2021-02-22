import { Box, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFetchArea, useFetchSizes } from '../stores/hooks';
import FishImage from './FishImage';
import Form from './Form';

const FishForm = ({ onFinish, name, province, city, size, price, labelButton = "Simpan", avatar = true }) => {
    const { provinces, cities } = useFetchArea();
    const { sizes, loading } = useFetchSizes();

    const [ values, setValues ] = useState({});
    const [ comodity, setComodity ] = useState( null );

    const model = {
        "name": {
            type: "text",
            required: true,
            label: "Komoditas",
            placeholder: "Nama komoditas",
            loading: loading,
            defaultValue: name
        },
        "province": {
            type: "select",
            required: true,
            label: "Provinsi",
            placeholder: "Pilih provinsi",
            options: provinces,
            loading: loading,
            defaultValue: province
        },
        "city": {
            type: "select",
            required: true,
            label: "Kota",
            placeholder: "Pilih kota",
            options: cities,
            loading: loading,
            defaultValue: city
        },
        "size": {
            type: "select",
            required: true,
            label: "Ukuran",
            placeholder: "Pilih ukuran",
            options: sizes,
            loading: loading,
            defaultValue: size
        },
        "price": {
            type: "currency",
            required: true,
            label: "Harga",
            placeholder: "Inputkan harga",
            value: 0,
            loading: loading,
            defaultValue: price
        },
        "save": {
            type: "submit",
            label: labelButton,
            loading: loading
        }
    }
    const onFormSubmit = ( values, setSubmitting ) => {
        if(onFinish) onFinish(values);
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