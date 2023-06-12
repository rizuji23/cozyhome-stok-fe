import axios from './axios';

class MaterialModule {
    static async get(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/material/",
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

    static async getDetailMaterial(id_material, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/material/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                params: {id_material: id_material}
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

    static async getKategori(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/kategori_material/",
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

    static async getDetailKategori(id, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/kategori_material/",
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                params: {id_kategori: id}
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

    static async add(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/material/",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: "error"});
            });
        });
    }

    static async update(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/material/",
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data,
                params: {id: data.id}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: "error"});
            });
        });
    }

    static async delete(id, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/material/",
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                params: {id: id}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: "error"});
            });
        });
    }

    static async addKategori(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/kategori_material/",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: "error"});
            });
        });
    }

    static async updateKategori(data, data_auth):Promise<any> {
        console.log("data", data);
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: "/api/v1/kategori_material/",
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + auth.access
                },
                data: data,
                params: {id: data.id}
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data})
                } else {
                    rej({response: false, data: "invalid"});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: "error"});
            });
        });
    }
}

export default MaterialModule;