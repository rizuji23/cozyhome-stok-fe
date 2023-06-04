import axios from "./axios";

class Auth {
    static async login(data):Promise<any> {
        return new Promise((res, rej) => {
            axios({
                url: 'api/v1/login/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                rej({response: false, data: "Username Atau Password Salah"});
            });
        });
    }

    static async changePassword(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: 'api/v1/change_password/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                },
                data: data
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                console.log(reject);

                rej({response: false, data: "Username Atau Password Salah"});
            });
        });
    }

    static async check(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/user/',
                method: 'GET',
                params: {username: auth.username},
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                }
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: 'error'});
            });
        });
    }

    static async updateProfile(data, data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        const formData = new FormData();
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("img", data.img[0])
        formData.append("email", data.email)
        formData.append("user", data.user)
        return new Promise((res, rej) => {
            axios({
                url: 'api/v1/update_info/',
                method: 'POST',
                headers: {
                    'Content-Type':  `multipart/form-data;`,
                    'Authorization': 'Bearer ' + auth.access,
                },
                data: formData
            }).then((result) => {
                console.log(result);
                if (result.status === 201) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                console.log(reject);

                rej({response: false, data: "Username Atau Password Salah"});
            });
        });
    }

    static async logout(data_auth):Promise<any> {
        const auth:any = JSON.parse(data_auth);
        return new Promise((res, rej) => {
            axios({
                url: '/api/v1/logout/',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + auth.access,
                },
                data: {
                    "refresh": auth.refresh
                }
            }).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    res({response: true, data: result.data});
                } else {
                    rej({response: false, data: 'invalid'});
                }
            }).catch((reject) => {
                console.log(reject);
                rej({response: false, data: 'error'});
            });
        });
    }
}

export default Auth;