import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/genres',{ headers: authHeader()});
}

const exportedObject = {
    getAll,
};

export default exportedObject;