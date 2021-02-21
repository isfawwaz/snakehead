const SteinStore = require("stein-js-client");
const store = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4");

const _ = require('lodash');

function checkObjectKey( key, obj ) {
    if( obj === undefined || _.isEmpty(obj) ) {
        return false;
    }

    if( _.isEmpty(obj[key]) ) {
        return false;
    }

    return ( key in obj ) && obj[key] !== undefined;
}

export const get = async(url, filter, cb, errCb = () => {}) => {
    let f = {};
    if( filter !== null || filter !== undefined ) {
        if( 
            checkObjectKey( "uuid", filter )
            || checkObjectKey( "komoditas", filter )
            || checkObjectKey( "area_provinsi", filter )
            || checkObjectKey( "area_kota", filter )
            || checkObjectKey( "size", filter )
            || checkObjectKey( "price", filter )
            || checkObjectKey( "tanggal", filter )
            || checkObjectKey( "timestamp", filter )
        ) {
            f.search = {
                uuid: !checkObjectKey( "uuid", filter ) ? void 0 : filter.uuid,
                komoditas: !checkObjectKey( "komoditas", filter ) ? void 0 : filter.komoditas,
                area_provinsi: !checkObjectKey( "area_provinsi", filter ) ? void 0 : filter.area_provinsi,
                area_kota: !checkObjectKey( "area_kota", filter ) ? void 0 : filter.area_kota,
                size: !checkObjectKey( "size", filter ) ? void 0 : filter.size,
                price: !checkObjectKey( "price", filter ) ? void 0 : filter.price,
                tgl_parsed: !checkObjectKey( "tanggal", filter ) ? void 0 : filter.tglParsed,
                timestamp: !checkObjectKey( "timestamp", filter ) ? void 0 : filter.timestamp
            }
        }
    }
    return await store.read(url, f).then( items => {
        cb( items );
    }, error => {
        errCb( error );
    });
}

export const post = async( url, data ) => {
    return await store.append(url, data);
}

export const update = async(url, id, data) => {
    return await store.edit(url, {
        search: { uuid: id },
        set: data
    });
}

export const deleteApi = async(url, id) => {
    return await store.delete(url, {
        search: { uuid: id }
    });
}
