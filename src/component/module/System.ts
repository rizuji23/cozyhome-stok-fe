import moment from "moment";

class System {
    static isObjectEmpty(value: any) {
        return Object.values(value).every(x => x !== '');
    }

    static isNegative(number:number) {
        return !Object.is(Math.abs(number), +number); 
    }

    static convertRupiah(integer:number) {
        if (integer === null) {
            return 0;
        } else {
            var number_string = integer.toString().replace(/[^,\d]/g, ""),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

            if (ribuan) {
                var separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
            return rupiah;
        }
    }

    static getDaysDiff(start_date, end_date) {
        const date_format = 'YYYY-MM-DD';
        const getDateAsArray = (date) => {
            return moment(date.split(/\D+/), date_format);
          }
          return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
    }

    static convertInt(str:string) {
        return parseInt(str.split('.').join(''));
    }
}

export default System;