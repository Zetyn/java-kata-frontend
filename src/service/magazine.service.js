import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/magazines',authHeader());
}

const create = data => {
    return httpClient.post('/magazines/add-magazine',data,authHeader());
}

const get = id => {
    return httpClient.get(`/magazines/${id}`,authHeader());
}

const update = (id,data) => {
    return httpClient.put(`/magazines/edit/${id}`,data,authHeader());
}

const remove = id => {
    return httpClient.delete(`/magazines/${id}`,authHeader());
}

const exportedObject = {
    getAll,
    create,
    get,
    update,
    remove,
};

export default exportedObject;