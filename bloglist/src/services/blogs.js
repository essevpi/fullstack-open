import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const getAllBlogs = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const update = async (blogToUpdate) => {
    const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate);
    return response.data;
};

const remove = async (blogToRemove) => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.delete(`${baseUrl}/${blogToRemove.id}`, config);
    return response.data;
};

const exports = { getAllBlogs, setToken, create, update, remove };

export default exports;