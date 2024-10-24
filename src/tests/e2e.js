const {
    createUser,
    getUser,
    getUserList,
    updateUser,
    deleteUser,
} = require('../utils/requests');
const {
    generateRandomEmail,
    generateRandomString,
    getRandomGender,
    getRandomStatus,
} = require('../utils/testUtils');
const { pickNewFromList } = require('../utils/testUtils')
const {
    genderList,
    statusList
} = require('../testData/apiPaylodEnums');


describe('CRUD Operations on User API with REST', () => {

    // Test for creating a new user, test for get user details
    test('Sanity: Create a new user and verify by get user details', async () => {
        const userName = generateRandomString();
        const userGender = getRandomGender();
        const userEmail = generateRandomEmail();
        const userStatus = getRandomStatus();

        const createdUserResponse = await createUser(
            {
                name: userName,
                gender: userGender,
                email: userEmail,
                status: userStatus
            }
        );
        const createdUser = createdUserResponse.data;

        // Verify the user data from the response
        expect(createdUserResponse.status).toBe(201);
        expect(createdUser).toHaveProperty('id');
        const createdUserId = createdUser.id; // Store the created user ID

        // Verify that the created user's properties match the expected values
        expect(createdUser.name).toBe(userName);
        expect(createdUser.email).toBe(userEmail);
        expect(createdUser.gender).toBe(userGender);
        expect(createdUser.status).toBe(userStatus);

        // Verify the user created correctly by GET API.
        // TODO: if the created user is stored in a reachable DB, should use DB query to verify instead.
        const fetchedUserResponse = await getUser(createdUserId);
        const fetchedUser = fetchedUserResponse.data;

        // Verify that the fetched user's properties match the expected values
        expect(fetchedUser.id).toBe(createdUserId);
        expect(fetchedUser.name).toBe(userName);
        expect(fetchedUser.email).toBe(userEmail);
        expect(fetchedUser.gender).toBe(userGender);
        expect(fetchedUser.status).toBe(userStatus);

    });

    test('Feature: Create a new user with invalid email', async () => {
        const userName = generateRandomString();
        const userGender = getRandomGender();
        const userStatus = getRandomStatus();
        try {
            await createUser(
                {
                    name: userName,
                    gender: userGender,
                    email: 'invalidEmail',
                    status: userStatus
                }
            );  // Assuming the function creates invalid user email for this test

        } catch (error) {
            const response = error.response
            expect(response.status).toBe(422);
            const body = response.data[0]
            expect(body).toHaveProperty('field');
            expect(body.field).toBe('email');
            expect(body).toHaveProperty('message');
            expect(body.message).toBe('is invalid');
        }
    });

    test('Feature: Create a new user with invalid token', async () => {
        const userName = generateRandomString();
        const userGender = getRandomGender();
        const userEmail = generateRandomEmail();
        const userStatus = getRandomStatus();
        const invalidHeaders = {
            'Accept': 'application/json',
            'Authorization': 'Bearer invalidToken',
            'Content-Type': 'application/json',
        };

        try {
            await createUser(
                {
                    name: userName,
                    gender: userGender,
                    email: userEmail,
                    status: userStatus
                },
                invalidHeaders);  // Assuming the function creates invalid user email for this test

        } catch (error) {
            const response = error.response
            const body = response.data
            expect(response.status).toBe(401);
            expect(body).toHaveProperty('message');
            expect(body.message).toBe('Invalid token');
        }
    });

    test.todo('Feature: Create a new user with invalid status');

    test.todo('Feature: Create a new user with invalid gender');

    test.todo('Feature: Create a new user with duplicate email');

    test.todo('Feature: Create a new user with unsupported media type.');

    // Test for updating the user details
    test('Sanity: Update user details and verify', async () => {
        // Create test data
        const userName = generateRandomString();
        const userGender = getRandomGender();
        const userEmail = generateRandomEmail();
        const userStatus = getRandomStatus();

        const createdUserResponse = await createUser(
            {
                name: userName,
                gender: userGender,
                email: userEmail,
                status: userStatus
            }
        );
        // Continue testing if test data creation succeed
        expect(createdUserResponse.status).toBe(201);
        const createdUser = createdUserResponse.data;
        const createdUserId = createdUser.id

        // Define new field values
        const newName = `${userName}-1`
        const newEmail = `${userEmail}-1`
        const newStatus = pickNewFromList(statusList, userStatus)
        const newGender = pickNewFromList(genderList, userGender)

        // Update the created user details
        const updatedUserResponse = await updateUser(
            createdUserId,
            {
                name: newName,
                gender: newGender,
                email: newEmail,
                status: newStatus
            },
        );
        expect(updatedUserResponse.status).toBe(200);

        // Verify that the updated user's properties match the expected values
        const updatedUser = updatedUserResponse.data;
        expect(updatedUser.id).toBe(createdUserId);
        expect(updatedUser.name).toBe(newName);
        expect(updatedUser.email).toBe(newEmail);
        expect(updatedUser.gender).toBe(newGender);
        expect(updatedUser.status).toBe(newStatus);

        // Verify the user created correctly by GET API.
        // TODO: if the created user is stored in a reachable DB, should use DB query to verify instead.
        const fetchedUserResponse = await getUser(createdUserId);
        const fetchedUser = fetchedUserResponse.data;

        // Verify that the fetched user's properties match the expected values
        expect(fetchedUser.id).toBe(createdUserId);
        expect(fetchedUser.name).toBe(newName);
        expect(fetchedUser.email).toBe(newEmail);
        expect(fetchedUser.gender).toBe(newGender);
        expect(fetchedUser.status).toBe(newStatus);
    });

    test.todo('Feature: Update user details with invalid token');

    test.todo('Feature: Update user details with not-existing id.');

    test.todo('Feature: Update user details with invalid status.');

    test.todo('Feature: Update user details with invalid gender');

    test.todo('Feature: Update user details with duplicate email.');

    test.todo('Feature: Update user details with unsupported media type.');

    // Test for fetching the user details
    test.todo('Feature: Get user details with not-existing id.');

    test.todo('Feature: Get user details with invalid token');

    test.todo('Feature: Get user details with unsupported media type.');

    // Test for fetching user list
    test('Sanity: Fetch user list with default.', async () => {
        // Current default set is return 10 users per page.
        // If test env cannot ensure that at lease 11 existing users,  then we need to create 11 users before executing this test case.
        const fetchedUserListResponse = await getUserList();
        expect(fetchedUserListResponse.status).toBe(200);
        const fetchedUserList = fetchedUserListResponse.data;
        expect(fetchedUserList.length).toBe(10);
        fetchedUserList.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('gender');
            expect(user).toHaveProperty('status');
          });

    });

    test('Sanity: Fetch user list with page and limit.', async () => {
        // If test env cannot ensure that at lease 6 existing users,  then we need to create 6 users before executing this test case.
        const fetchedUserListResponse = await getUserList(pagination='?page=1&per_page=5');
        expect(fetchedUserListResponse.status).toBe(200);
        const fetchedUserList = fetchedUserListResponse.data;
        expect(fetchedUserList.length).toBe(5);
        fetchedUserList.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('gender');
            expect(user).toHaveProperty('status');
          });

    });

    test.todo('Feature: Fetch user list with invalid token');

    test.todo('Feature: Update user details with unsupported media type.');

    // Test for deleting the user
    test('Feature: Delete user and verify', async () => {
        // Create test data
        const userName = generateRandomString();
        const userGender = getRandomGender();
        const userEmail = generateRandomEmail();
        const userStatus = getRandomStatus();

        const createdUserResponse = await createUser(
            {
                name: userName,
                gender: userGender,
                email: userEmail,
                status: userStatus
            }
        );
        const createdUser = createdUserResponse.data;
        const createdUserId = createdUser.id;
        // Continue testing if test data creation succeed
        expect(createdUserResponse.status).toBe(201);

        const deleteUserResponse = await deleteUser(createdUserId);

        // Verify delete API call is successful
        expect(deleteUserResponse.status).toBe(204);

        // Verify the user deleted correctly by GET API.
        try {
            await getUser(createdUserId);  // Assuming the function creates invalid user email for this test

        } catch (error) {
            const response = error.response
            const body = response.data
            expect(response.status).toBe(404);
        }
    });

    test.todo('Feature: Delete user details with invalid token');

    test.todo('Feature: Delete user details with not-existing id.');

    test.todo('Feature: Update user details with unsupported media type.');
});
