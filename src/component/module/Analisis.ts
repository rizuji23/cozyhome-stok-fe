import axios from "./axios";

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Analisis {
    static async get(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/analisis_stok_gudang/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                rej({response: false, data: "error"});
            });
        });
    }

    static calculateKeuangan(data) {
        var stok_in = [];
        var stok_out = [];
        var total_all = [];
        

        var stok_in_result = new Array(12).fill(0);
        var stok_out_result = new Array(12).fill(0);
        var total_all_result = new Array(12).fill(0);
       

        Object.entries(data).map((el) => {
            if (el[0] === "stok_in") {
                stok_in.push(el[1])
            } else if (el[0] === "stok_out") {
                stok_out.push(el[1])
            } else if (el[0] === "total_all") {
                total_all.push(el[1]);
            }
        });

        stok_in.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              stok_in_result[index] = el3[1]
          });
        })
        stok_out.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              stok_out_result[index] = el3[1]
          });
        })
        total_all.map(el => {
            Object.entries(el).map((el3) => {
              const index = month.indexOf(el3[0]);
              total_all_result[index] = el3[1]
          });
        })
        

        return {
            series: [{
                name: 'Total Asset Keseluruhan',
                data: total_all_result
            }, {
                name: 'Total Asset Masuk',
                data: stok_in_result
            }, {
                name: 'Total Asset Keluar',
                data: stok_out_result
            }],
            categories: month
        }
    }

    static calculateStok(data) {
        var stok_in;
        var stok_out;
        var time = [];

        Object.keys(data.stok_in).map(el => {
            time.push(el);
        });

        Object.entries(data).map(el => {
            if (el[0] === "stok_in") {
                stok_in = Object.values(el[1])
            } else {
                stok_out = Object.values(el[1])
            }
        });

        return {
            series:  [{
                name: 'Stok In',
                data: stok_in,
            }, {
                name: 'Stok Out',
                data: stok_out,
            }],
            categories: time
        }
    }

    static calculatePerbandingan(data) {
        return {
             series: Object.values(data)
        }
     }
}

export default Analisis;