import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './utils/reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Theme, { Fonts } from './theme';
import { StateProvider } from './stores/hooks';

import './styles/styles.scss';

const theme = extendTheme(Theme);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <StateProvider>
                <ChakraProvider theme={ theme }>
                    <Fonts />
                    <App />
                </ChakraProvider>
            </StateProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
