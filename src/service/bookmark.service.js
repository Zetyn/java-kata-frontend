import httpClient from "../http-common";
import authHeader from "../auth-header";

const getUserBookmarks = () => {
    return httpClient.get(`/user/bookmarks`,{headers : authHeader()});
}

const getBookmark = id => {
    return httpClient.get(`/book/bookmark/${id}`,{headers : authHeader()});
}

const addBookmark = data => {
    return httpClient.post(`/books`,data,{headers : authHeader()});
}

const removeBookmark = data => {
    return httpClient.post(`/books/bookmarkDelete`,data,{headers : authHeader()});
}

const exportedObject = {
    addBookmark,
    removeBookmark,
    getBookmark,
    getUserBookmarks
};

export default exportedObject;