module.exports = {
    testEnvironment: 'node',            // Specify the test environment (node for backend tests)
    testMatch: ['**/tests/e2e.js'], // Patterns to find test files
    collectCoverage: true,              // Enable coverage collection
    coverageDirectory: 'coverage',      // Directory for coverage reports
    coverageThreshold: {                // Optional coverage thresholds
      global: {
        lines: 80,                      // Require at least 80% line coverage
        branches: 80,                   // Require at least 80% branch coverage
        functions: 80,                  // Require at least 80% function coverage
        statements: 80,                 // Require at least 80% statement coverage
      },
    },
    reporters: [
        "default",
        [
          "jest-html-reporter",
          {
            pageTitle: "Test report",
            outputPath: "./test-report.html"
          }
        ]
      ]
  };
  