import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/books',{ headers: authHeader()});
}

const getFound = title => {
    return httpClient.get(`/books/search=${title}`,{ headers: authHeader()});
}

const getAllPage = (page) => {
    return httpClient.get(`/books/${page}/10`,{ headers: authHeader()});
}

const create = data => {
    return httpClient.post('/books/add-book',data,authHeader());
}

const get = id => {
    return httpClient.get(`/books/${id}`,authHeader());
}

const update = (id,data) => {
    return httpClient.put(`/books/edit/${id}`,data,authHeader());
}

const remove = id => {
    return httpClient.delete(`/books/${id}`,authHeader());
}

const exportedObject = {
    getAll,
    create,
    get,
    update,
    remove,
    getAllPage,
    getFound,
};

export default exportedObject;