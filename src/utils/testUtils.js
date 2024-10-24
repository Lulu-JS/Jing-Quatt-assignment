const {
    genderList,
    statusList
} = require('../testData/apiPaylodEnums');

 const generateRandomString = (length = 10) =>  {
    const randomString = Math.random().toString(36).substring(2, length+2);
    return randomString;
};

 const generateRandomEmail = () =>  {
    const randomEmailName = generateRandomString()
    const domain = 'example.com'; 
    return `${randomEmailName}@${domain}`;
};

 const getRandomGender = () =>  {
    const randomIndex = Math.floor(Math.random() * genderList.length);
    return genderList[randomIndex];
};

 const getRandomStatus = () =>  {
    const randomIndex = Math.floor(Math.random() * statusList.length);
    return statusList[randomIndex];
};

const pickNewFromList = (list, existingItem) =>  {
    const filteredList = list.filter(item => item !== existingItem);
    // Randomly select an item from the filtered list
    const randomItem = filteredList[Math.floor(Math.random() * filteredList.length)];
    return randomItem;
};

module.exports = {
    generateRandomString,
    generateRandomEmail,
    getRandomGender,
    getRandomStatus,
    pickNewFromList
};