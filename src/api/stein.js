const SteinStore = require("stein-js-client");
const store = new SteinStore("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4");

function checkObjectKey( key, obj ) {
    if( obj === undefined || obj === null ) {
        return false;
    }

    return ( key in obj ) && obj[key] !== undefined;
}

export default {
    async get(url, filter) {
        let f = {};
        if( filter !== null || filter !== undefined ) {
            if( 
                checkObjectKey( "uuid", filter )
                || checkObjectKey( "komoditas", filter )
                || checkObjectKey( "areProvinsi", filter )
                || checkObjectKey( "areKota", filter )
                || checkObjectKey( "size", filter )
                || checkObjectKey( "price", filter )
                || checkObjectKey( "tglParsed", filter )
                || checkObjectKey( "timestamp", filter )
            ) {
                f.search = {
                    uuid: !checkObjectKey( "uuid", filter ) ? void 0 : filter.uuid,
                    komoditas: !checkObjectKey( "komoditas", filter ) ? void 0 : filter.komoditas,
                    area_provinsi: !checkObjectKey( "areaProvinsi", filter ) ? void 0 : filter.areaProvinsi,
                    area_kota: !checkObjectKey( "areaKota", filter ) ? void 0 : filter.areaKota,
                    size: !checkObjectKey( "ukuran", filter ) ? void 0 : filter.size,
                    price: !checkObjectKey( "harga", filter ) ? void 0 : filter.price,
                    tgl_parsed: !checkObjectKey( "tanggal", filter ) ? void 0 : filter.tglParsed,
                    timestamp: !checkObjectKey( "timestamp", filter ) ? void 0 : filter.timestamp
                }
            }
        }
        return await store.read(url, f);
    },

    async post(url, data) {
        return await store.append(url, data)
    },

    async update(url, id, data) {
        return await store.edit(url, {
            search: { uuid: id },
            set: data
        });
    },

    async delete(url, id) {
        return await store.delete(url, {
            search: { uuid: id }
        });
    }
}