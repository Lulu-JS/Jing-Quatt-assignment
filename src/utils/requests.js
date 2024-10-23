require('dotenv').config();
const axios = require('axios');

const baseUrl = 'https://gorest.co.in/public';

const validHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.AUTHORIZATION}`,
}

const invalidHeaders = {
    'Accept': 'application/json',
    'Authorization': 'Bearer invalidToken',
    'Content-Type': 'application/json',
};


// Create User
const createUser = async (userName, userGender, userEmail, userStatus, headers=validHeaders) => {
    const response = await axios.post(
        `${baseUrl}/v2/users/`,
        {
            name: userName,
            gender: userGender,
            email: userEmail,
            status: userStatus
        },
        { headers }
    );
    return response;
};

// Get User
const getUser = async (id, headers=validHeaders) => {
    const response = await axios.get(
        `${baseUrl}/v2/users/${id}`,
        { headers }
    );
    return response;
};

// Update User
const updateUser = async (id, newName, newEmail, newStatus, newGender, headers=validHeaders) => {
    const response = await axios.patch(
        `${baseUrl}/v2/users/${id}`,
        {
            name: newName,
            gender: newGender,
            email: newEmail,
            status: newStatus
        },
        { headers }
    );
    return response;
};

// Delete User
const deleteUser = async (id, headers=validHeaders) => {
    const response = await axios.delete(
        `${baseUrl}/v2/users/${id}`,
        { headers }
    );
    return response;
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
