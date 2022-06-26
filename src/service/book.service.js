import httpClient from "../http-common";
import authHeader from "../auth-header";

const getAll = () => {
    return httpClient.get('/books',{ headers: authHeader()});
}

const getFound = title => {
    return httpClient.get(`/books?search=${title}`,{ headers: authHeader()});
}

const getChapter = data => {
    return httpClient.get(`/book/${data.bookId}/v${data.volumeNum}/c${data.chapterNum}`,{ headers: authHeader()});
}

const getChapterText = data => {
    return httpClient.get(`/book/${data.bookId}/v${data.volumeNum}/c${data.chapterNum}/text`,{ headers: authHeader()});
}

const getByGenres = (genres) => {
    return httpClient.get(`/books?genres=${genres}`,{ headers: authHeader()});
}

const getByTitleAndGenres =(title,genres) => {
    return httpClient.get(`/books?search=${title}&genres=${genres}`,{headers: authHeader()});
}

const getAllPage = (page) => {
    return httpClient.get(`/books/${page}/20`,{ headers: authHeader()});
}

const getAllChaptersNameAndNumber = id => {
    return httpClient.get(`/book/${id}/chapterCount`,{ headers: authHeader()});
}

const create = data => {
    return httpClient.post('/book/add-book',data,{headers: authHeader()});
}

const addChapter = data => {
    return httpClient.post(`/book/${data.bookId}/add-chapter`,data,{headers: authHeader()});
}

const getById = id => {
    return httpClient.get(`/book/${id}`,{headers: authHeader()});
}

const update = data => {
    return httpClient.put(`/book/edit/${data.id}`,data,{headers: authHeader()});
}

const remove = id => {
    return httpClient.delete(`/book/${id}`,{headers: authHeader()});
}

const exportedObject = {
    getAll,
    create,
    getById,
    update,
    remove,
    getAllPage,
    getFound,
    getByGenres,
    getByTitleAndGenres,
    addChapter,
    getChapter,
    getAllChaptersNameAndNumber,
    getChapterText
};

export default exportedObject;