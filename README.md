# Quatt assignment for CURD API operations

Jest Automation Framework for gorest.co.in CRUD Operations

This repository contains an automation framework built with Jest for performing CRUD operations on the gorest.co.in API.

*Setup Instructions:*

1. Go to gorest.co.in and obtain your access token.
2. Create a `.env` file in the root directory of the project.
3. Add your access token to the .env file in the following format: `AUTHORIZATION=<your_access_token_here>`.
4. Ensure that Node.js and npm are installed on your system.
5. Install project dependencies by running the command:

```
npm install
```

Note: If you are NOT using a Mac OS, please run below command as well:
```
npm install cross-env
```

6. After setting up the environment and installing dependencies, run the tests using the following command: \
(i) Execute all test cases:
```
npm run test
```
(ii) Only Execute regression test cases:
```
npm run test -t '^Regression'
```
7. Refer to `test-report.html` for test report.

Note:
This e2e test is not complete. There are a few refactors need to be done if there's more time:
1. Complete the `todo` test cases
2. Refactor the assertions to query in DB for verification
3. Use soft assertions to cover more chcks even one of the assertions fails during tesing.