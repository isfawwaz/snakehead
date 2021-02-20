import { capitalize, toSentenceSerial, numberFormat, toNumber, isBlank, words } from "underscore.string";
import moment from "moment";
import 'moment/locale/id';

moment.locale("id");

export const caps = (value) => {
    if( !isBlank(value) && value != null && value !== undefined) {
        let w = words( value.toLowerCase() );
        let i = [];
        w.forEach( item => {
            i.push( capitalize( item ) );
        });
        return toSentenceSerial( i, " ", " " );
    }

    return value;
}

export const sentenceSerial = (...args) => {
    let items = [];
    args.map( it => {
        it.forEach( item => {
            items.push( caps( item ) );
        });
    });
    return toSentenceSerial( items, " - ", " - " );
}

export const formatNumber = ( number ) => {
    return numberFormat( toNumber( number ), ",", "." );
}

export const formatDate = ( date, now = true, format = "DD MMM YYYY" ) => {
    if( date !== undefined ) {
        const d = moment( toNumber(date) );

        if( !now ) {
            return d.format( format );
        }

        return d.fromNow();
    }

    return "";
}