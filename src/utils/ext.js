import { capitalize, toSentenceSerial, numberFormat, toNumber, isBlank, words, include } from "underscore.string";
import moment from "moment";
import 'moment/locale/id';

moment.locale("id");
const _ = require('lodash');

export const momment = moment;

export const isDesktop = () => "(min-width: 992px)";

export const caps = (value) => {
    if( !isBlank(value) && value != null && value !== undefined) {
        let w = words( value.toLowerCase() );
        let i = [];
        w.forEach( item => {
            if( item.toLowerCase().includes("dki") ) {
                i.push( item.toUpperCase() );
            } else {
                i.push( capitalize( item ) );
            }
        });
        return toSentenceSerial( i, " ", " " );
    }

    return value;
}

export const sentenceSerial = (...args) => {
    if( !_.isEmpty(args) ) {
        let items = [];
        args.map( it => {
            it.forEach( item => {
                items.push( caps( item ) );
            });
        });
        return toSentenceSerial( items, " - ", " - " );
    }

    return "-";
}

export const formatNumber = ( number, reverse = false ) => {
    if( reverse ) {
        return toNumber( _.replace( number, ".", "" ) );
    }
    return numberFormat( toNumber( number ), ",", "." );
}

export const formatDate = ( date, now = true, format = "DD MMM YYYY" ) => {
    if( date !== undefined && !_.isEmpty( date ) ) {
        let d;
        if( !isNaN(date) ) {
            d = moment.unix( toNumber(date) );
            if( !d.isValid() ) {
                return null;
            }
        } else {
            d = moment.parseZone( date );
        }

        if( !now ) {
            return d.format( format );
        }

        return d.fromNow();
    }

    return null;
}

export const formatDateHuman = ( date ) => {
    let d;
    if( !isNaN(date) ) {
        d = moment.unix( toNumber(date) );
        if( !d.isValid() ) {
            return null;
        }
    } else {
        d = moment.parseZone( date );
    }

    if(d.format("YYYY") == moment().format("YYYY")) {
        return d.format("MMM DD");
    }

    return d.format("DD/MM/YYYY");
}

export const checkFish = ( name ) => {
    let isCarp = false;
    let isCatFish = false;
    let isDory = false;
    let isShrimp = false;

    if( name !== null && name !== undefined ) {
        let nm = name.toLowerCase();
        if( include( nm, "gurame" ) ) {
            isCarp = true;
        }

        if( include( nm, "lele" ) ) {
            isCatFish = true;
        }

        if( include( nm, "dori" ) || include( nm, "dory" ) ) {
            isDory = true;
        }

        if( include( nm, "udang" ) || include( nm, "hurang" ) ) {
            isShrimp = true;
        }
    }

    return { isCarp, isCatFish, isDory, isShrimp };
}

export const checkMenu = ( filter ) => {
    let isAll = false;
    let isGurame = false;
    let isNila = false;
    let isDori = false;
    let isLele = false;
    let isUdang = false;
    
    const search = (filter.komoditas||"").toLowerCase();

    if( search !== null && search !== undefined ) {

        if( include(search, "gurame") ) {
            isGurame = true;
        }
        
        if( include(search, "nila") ) {
            isNila = true;
        }

        if( include(search, "dori") ) {
            isDori = true;
        }

        if( include(search, "lele") ) {
            isLele = true;
        }

        if( include(search, "udang") ) {
            isUdang = true;
        }

    }

    isAll = !( isGurame || isNila || isDori  || isLele || isUdang );

    return { isAll, isGurame, isNila, isDori, isLele, isUdang };
}