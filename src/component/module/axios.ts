import axios from "axios";

const URL_DEV = 'https://cozyhome.api.weworks.ink';
const URL_PRODUCTION = 'https://cozyhome.api.weworks.ink'

export default axios.create({
    baseURL: URL_PRODUCTION
});