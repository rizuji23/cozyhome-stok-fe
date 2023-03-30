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
}

export default Auth;