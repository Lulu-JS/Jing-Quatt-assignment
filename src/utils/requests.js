require('dotenv').config();
const axios = require('axios');
const apiConfig = require('../configs/apiConfig');

const baseUrl = apiConfig.baseUrl;
const apiUrl = apiConfig.userApi;

const validHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.AUTHORIZATION}`,
};


// Create User
const createUser = async (userInfo, headers = validHeaders) => {
    const response = await axios.post(
        `${baseUrl}/${apiUrl}`,
        userInfo,
        { headers }
    );
    return response;
};

// Get User
const getUser = async (id, headers = validHeaders) => {
    const response = await axios.get(
        `${baseUrl}/${apiUrl}/${id}`,
        { headers }
    );
    return response;
};

// Get User list
const getUserList = async (pagination = '', headers = validHeaders) => {
    const response = await axios.get(
        `${baseUrl}/${apiUrl}${pagination}`,
        { headers }
    );
    return response;
};

// Update User
const updateUser = async (id, newUserInfo, headers = validHeaders) => {
    const response = await axios.patch(
        `${baseUrl}/${apiUrl}/${id}`,
        newUserInfo,
        { headers }
    );
    return response;
};

// Delete User
const deleteUser = async (id, headers = validHeaders) => {
    const response = await axios.delete(
        `${baseUrl}/${apiUrl}/${id}`,
        { headers }
    );
    return response;
};

module.exports = {
    createUser,
    getUser,
    getUserList,
    updateUser,
    deleteUser,
};
