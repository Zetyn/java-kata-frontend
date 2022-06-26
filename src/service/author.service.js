import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/authors');
}

const create = data => {
    return httpClient.post('/authors',data,{headers : authHeader()});
}

const get = id => {
    return httpClient.get(`/authors/${id}`,{headers : authHeader()});
}

const update = (id,data) => {
    return httpClient.put(`/authors/edit/${id}`,data,{headers : authHeader()});
}

const remove = id => {
    return httpClient.delete(`/authors/${id}`,{headers : authHeader()});
}

const exportedObject = {
    getAll,
    create,
    get,
    update,
    remove
};

export default exportedObject;