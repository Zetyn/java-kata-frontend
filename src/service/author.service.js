import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/authors');
}

const create = data => {
    return httpClient.post('/authors',data,authHeader());
}

const get = id => {
    return httpClient.get(`/authors/${id}`,authHeader());
}

const update = (id,data) => {
    return httpClient.put(`/authors/edit/${id}`,data,authHeader());
}

const remove = id => {
    return httpClient.delete(`/authors/${id}`,authHeader());
}

export default { getAll, create, get, update, remove };