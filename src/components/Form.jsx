/**
 * Komponen form menggunakan skema json mengextend dari library https://github.com/eFishery/json-reactform.
 * Dikarenakan library UI yang berbeda dengan library asli,
 * sehingga komponen ini menggunakan library Formik sebagai validasi library nya.
 */
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { formatNumber } from './../utils/ext';
import * as yup from 'yup';
import useDeepCompareEffect from 'use-deep-compare-effect';

const _ = require('lodash');

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const checkValidation = ( name, value, rule = {} ) => {

    if( rule.required ) {
        if( _.isEmpty(value) ) {
            if( _.isObject(value) || _.isArray(value) ) {
                return `Harap centang minimal 1 pilihan`;
            }

            return `Harap isi ${name} terlebih dahulu`;
        }
    }

    if( rule.email ) {
        if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ) {
            return `Harap inputkan email yang valid`;
        }
    }

    return false;
}

const validate = async ( values, rules ) => {
    const errors = {};
    await rules.validate( values, { abortEarly: false } ).catch( error => {
        const inner = error.inner;
        inner.forEach( validationError => {
            let key = validationError.path;
            errors[key] = validationError.message;
        });
    });

    return errors;
}

const ElButton = ({ type, onClick, loading = false, children, colorScheme = undefined, variant = "solid" }) => {
    return <Button variant={ variant } colorScheme={ colorScheme } type={ type } isLoading={ loading } onClick={ onClick } isFullWidth>{ children }</Button>;
}

const ElInput = ({ id, label, name, defaultValue, onChange, placeholder = null, autoComplete = false, type = 'text', required = false, disabled = false, invalid = false, error = null }) => {
    const [ val, setVal ] = useState(defaultValue);
    const handleChange = e => {
        setVal(e.currentTarget.value);
        onChange(e);
    }
    return <FormControl id={ id } isRequired={ required } isDisabled={ disabled } isInvalid={ invalid }>
        <FormLabel>{label}</FormLabel>
        <Input 
            type={ type } 
            name={ name } 
            onChange={ handleChange }
            value={ val }
            placeholder={ placeholder }
            autoComplete={ autoComplete ? '' : 'off' } />
        <FormErrorMessage>{ error }</FormErrorMessage>
    </FormControl>;
}

const ElSelect = ({ id, label, name, defaultValue, options, onChange, onCreateOption, placeholder = null, required = false, disabled = false, creatable = false, searchable = true, clearable = true, invalid = false, error = null }) => {
    const SelectComponent = creatable ? AsyncCreatableSelect : Select;
    return <FormControl id={ id } isRequired={ required } isDisabled={ disabled } isInvalid={ invalid }>
        <FormLabel>{ label }</FormLabel>
        <SelectComponent 
            name={ name }
            id={ id }
            searchable={ searchable }
            isClearable={ clearable }
            required={ required }
            defaultValue={ defaultValue }
            options={ options }
            onChange={ onChange }
            onCreateOption={ onCreateOption }
            isDisabled={ disabled }
            placeholder={ placeholder }></SelectComponent>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>;
}

const ElNumber = ({ id, label, name, value, onChange, required = false, disabled = false, step = 1, min = 0, max = Infinity, placeholder = null, invalid = false, error = null }) => {
    return <FormControl id={ id } isRequired={ required } isDisabled={ disabled } isInvalid={ invalid }>
        <FormLabel>{ label }</FormLabel>
        <NumberInput name={ name } value={ value } onChange={ onChange } step={ step } min={ min } max={ max } placeholder={ placeholder }>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
}

const ElCurrency = ({ id, label, name, value, onChange, required = false, disabled = false, step = 1, min = 0, max = Infinity, placeholder = null, invalid = false, error = null }) => {
    const format = (val) => `Rp` + formatNumber(value);
    const parse = (val) => formatNumber( value.replace(/^\Rp/, ""), true );

    const [val, setVal] = useState(value);

    return <FormControl id={ id } isRequired={ required } isDisabled={ disabled } isInvalid={ invalid }>
        <FormLabel>{ label }</FormLabel>
        <NumberInput name={ name } value={ value } onChange={ onChange } step={ step } min={ min } max={ max } placeholder={ placeholder }>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>;
}

const Form = ({ onSubmit, onChange, clear = false, model = {} }) => {
    const defaultState = Object.keys(model).reduce((a, b) => {
        const { defaultValue, type } = model[b];
        if (type === 'date') {
            a[b] = defaultValue ? defaultValue.toISOString() : '';
        } else if (type === 'select') {
            let v = '';
            if( defaultValue ) {
                const f = model[b].options.filter( o => o.hasOwnProperty('options') );
                if( f.length > 0 ) {
                    const g = f.filter( o => o.options.find( option => option.value === defaultValue ) );
                    const h = g[0].options.filter( option => option.value === defaultValue );
                    v = h[0];
                } else {
                    v = model[b].options.find(option => option.value === defaultValue);
                }
            }
            a[b] = v;
            // a[b] = defaultValue || '';
            // a[b] = defaultValue
            //     ? model[b].options.find(option => option.value === defaultValue)
            //     : '';
            // console.log(b, a[b]);
        } else if ( type === 'number' || type === 'currency' ) {
            a[b] = defaultValue || 0;
        } else if (type === 'checkbox') {
            a[b] = defaultValue && defaultValue.length ? defaultValue : [];
        } else if (type === 'submit') {
            // DO NOTHING
        } else {
            a[b] = defaultValue || '';
        }
        return a;
    }, {});
    const stateDefault = defaultState;
    
    const defaultCurrency = Object.keys(model).reduce((a, b) => {
        const { defaultValue } = model[b];
        if (model[b].type === 'currency' || model[b].type === 'number' ) {
            a[b] = formatNumber(defaultValue) || '';
        }
        return a;
    }, {});
    
    const defaultSelectOptions = Object.keys(model).reduce((a, b) => {
        if (model[b].type === 'select') {
            a[b] = model[b].options;
        }
        return a;
    }, {});

    const rules = Object.keys(model).reduce( (a,b) => {
        let requiredErrString = `Harap isi ${model[b].label||b} terlebih dahulu`;

        if( model[b].type == 'select' ) {
            const requiredOption = yup.object()
                .shape({
                    value: yup.string(),
                    label: yup.string(),
                })
                .nullable();
            if( model[b].required ) {
                a[b] = requiredOption.required(`Harap pilih salah satu opsi ${model[b].label||b}`);
            } else {
                a[b] = requiredOption;
            }
        } else if ( model[b].type == 'number' || model[b].type == 'currency' ) {
            let moreErrString = `${model[b].label||b} harus bernilai lebih besar dari 0`
            if( model[b].required ) {
                a[b] = yup.number().required(requiredErrString).moreThan(0, moreErrString).integer();
            } else {
                a[b] = yup.number().moreThan(0, moreErrString).integer();
            }
        } else {
            if( model[b].required ) {
                a[b] = yup.string().required(requiredErrString);
            } else {
                a[b] = yup.string();
            }
        }

        return a;
    }, {})
    const validationScheme = yup.object().shape(rules);

    // const formItems = [];

    // useEffect( () => {
    //     console.log(stateDefault);
    // }, [defaultState]);

    const [ state, setState ] = useState(defaultState);
    const [ currency, setCurrency ] = useState( defaultCurrency );
    const [ options, setOptions ] = useState( defaultSelectOptions );
    const prevState = usePrevious(state);

    const onFormSubmit = ( values, { setSubmitting }) => {
        onSubmit( state, setSubmitting, false );
    }

    const onFormCleared = () => {
        const d = Object.keys(state).reduce( (a,b) => {
            a[b] = "";
            return a;
        }, {});
        setState({
            ...state,
            ...d
        });
        onSubmit( d, null, true );
    }

    const onChangeState = e => {
        const changedObject = {};
        const { value, name } = e.currentTarget;
        changedObject[name] = value;
        setState({
            ...state,
            ...changedObject
        });
    }

    const onChangeCurrencyState = ( name, value ) => {
        const changedObject = {};
        const currencyObject = {};
        changedObject[name] = formatNumber( value, true );
        setState({
            ...state,
            ...changedObject,
        });
        currencyObject[name] = formatNumber(value);
        setCurrency({
            ...currency,
            ...currencyObject,
        });
    }

    const onChangeSelectState = ( name, selectedOption ) => {
        const changedObject = {};
        changedObject[name] = selectedOption === null ? '' : selectedOption;
        setState({
            ...state,
            ...changedObject,
        });
    }

    const onChangeNumberState = (name, value) => {
        const changedObject = {};
        changedObject[name] = value;
        setState({
            ...state,
            ...changedObject
        });
    }

    const onChangeStateCheckbox = ( key, value ) => {
        const changedObject = {};
        changedObject[key] = state[key].includes(value)
            ? state[key].filter(item => item != value)
            : [...state[key], value];
        setState({
            ...state,
            ...changedObject,
        });
    }

    const onChangeStateDate = ( key, value ) => {
        const changedObject = {};
        changedObject[key] = value.toISOString();
        setState({
          ...state,
          ...changedObject,
        });
    }

    const onCreateSelectOption = ( name, label, onCreateOption ) => {
        const newOptionObject = onCreateOption(label);
        const optionsObject = {};
        optionsObject[name] = [...options[name], newOptionObject];
        setOptions({
            ...options,
            ...optionsObject,
        });
    }

    const formItems = [];
    const getFormItems = ( isSubmitting, errors, touched ) => {
        formItems.length = 0;
        let k = 0
        Object.keys(model).forEach( key => {
            switch( model[key].type ) {
                case 'currency':
                    formItems.push(<ElCurrency
                        key={ k }
                        id={ key }
                        label={ model[key].label || key }
                        value={ currency[key] }
                        min={ model[key].min || 0 }
                        step={ model[key].step || 100 }
                        onChange={ value => onChangeCurrencyState( key, value ) }
                        placeholder={ model[key].placeholder }
                        required={ model[key].required || false }
                        disabled={ model[key].loading || false }
                        invalid={ errors[key] && touched[key] }
                        error={ errors[key] } />);
                    break;
                case 'number':
                    formItems.push(<ElNumber
                        key={ k }
                        id={ key }
                        label={ model[key].label || key }
                        value={ currency[key] }
                        min={ model[key].min || 0 }
                        step={ model[key].step || 1 }
                        onChange={ value => onChangeCurrencyState( key, value ) }
                        placeholder={ model[key].placeholder }
                        required={ model[key].required || false }
                        disabled={ model[key].loading || false }
                        invalid={ errors[key] && touched[key] }
                        error={ errors[key] } />);
                    break;
                case 'select':
                    // const SelectComponent = (model[key].creatable || true) ? CreatableSelect : Select;
                    formItems.push(<FormControl key={ k } id={ key } isRequired={ model[key].required || false } isDisabled={ model[key].loading || false } isInvalid={ errors[key] && touched[key] }>
                        <FormLabel>{ model[key].label || key }</FormLabel>
                        <CreatableSelect 
                            name={ key }
                            id={ key }
                            searchable={ model[key].searchable || true }
                            isClearable={ model[key].clearable || true }
                            required={ model[key].required || false }
                            value={ state[key] }
                            options={ options[key] }
                            onChange={ option => onChangeSelectState(key, option) }
                            onCreateOption={ inputValue => onCreateSelectOption( key, inputValue, model[key].onCreateOption ) }
                            isDisabled={ model[key].loading || false }
                            placeholder={ model[key].placeholder }/>
                        <FormErrorMessage>{errors[key]}</FormErrorMessage>
                    </FormControl>);
                    // items.push(<ElSelect 
                    //     key={ k }
                    //     id={key}
                    //     label={ model[key].label || key }
                    //     name={ key }
                    //     defaultValue={ state[key] }
                    //     options={ options[key] }
                    //     onChange={ option => onChangeSelectState(key, option) }
                    //     onCreateOption={ inputValue => onCreateSelectOption( key, inputValue, model[key].onCreateOption ) }
                    //     disabled={ model[key].loading || false }
                    //     placeholder={ model[key].placeholder }
                    //     invalid={ errors[key] && touched[key] }
                    //     error={ errors[key] } />);
                    break;
                case 'submit':
                    formItems.push(<HStack key={ k } spacing={ 4 } w="full">
                        { clear ? <ElButton type="button" loading={ model[key].loading || false } onClick={ onFormCleared }>Bersihkan</ElButton> : false }
                        <ElButton type={ model[key].type } loading={ model[key].loading || false } colorScheme="brand">{ model[key].label || key }</ElButton> 
                    </HStack>)
                    break;
                default:
                    // items.push(<ElInput 
                    //     key={ k }
                    //     type={ model[key].type }
                    //     id={key}
                    //     label={ model[key].label || key } 
                    //     name={ key }
                    //     defaultValue={ state[key] }
                    //     onChange={ onChangeState } 
                    //     placeholder={ model[key].placeholder } 
                    //     required={ model[key].required || false } 
                    //     disabled={ model[key].loading || false } 
                    //     autoComplete={ model[key].autoComplete }
                    //     invalid={ errors[key] && touched[key] }
                    //     error={ errors[key] } />);
                    formItems.push(<FormControl key={ k } id={ key } isRequired={ model[key].required || false } isDisabled={ model[key].loading || false } isInvalid={ errors[key] && touched[key] }>
                        <FormLabel>{ model[key].label || key }</FormLabel>
                        <Input 
                            type={ model[key].type } 
                            name={ key } 
                            onChange={ onChangeState }
                            value={ state[key] }
                            placeholder={ model[key].placeholder }
                            autoComplete={ model[key].autoComplete ? '' : 'off' } />
                        <FormErrorMessage>{ errors[key] }</FormErrorMessage>
                    </FormControl>)
                    break;
            }
            k = k + 1;
        });

        return formItems;
    }

    useDeepCompareEffect( () => {
        setState(defaultState);
        setOptions(defaultSelectOptions);
    }, [defaultState, defaultSelectOptions]);

    // console.log(state);

    useEffect( () => {
        if( onChange ) {
            const changedObject = [];
            if (prevState && Object.keys(prevState).length > 0) {
                Object.keys(prevState).forEach(key => {
                    if (prevState[key] !== state[key]) {
                        changedObject.push(key);
                    }
                });
                onChange({
                    value: state,
                    changed: changedObject,
                });
            }
        }
    }, [state]);
    
    return <>
        <Formik initialValues={ defaultState } validate={ () => validate(state, validationScheme) } onSubmit={ onFormSubmit }>
            {
                ({ handleSubmit, isSubmitting, errors, touched }) => (<form onSubmit={ handleSubmit } style={{ width: "100%" }}>
                    <VStack spacing={ 4 }>
                        { getFormItems(isSubmitting, errors, touched ) }
                    </VStack>
                </form>)
            }
        </Formik>
    </>;
}

export default Form;