---

## Setup Instructions

To get started with the project, follow these steps:

1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd cypressproject 
3. Install dependencies:npm install
4. Ensure the following tools are installed:
- **Node.js**: [Download Node.js](https://nodejs.org/en/) (v16 or higher recommended).
- **Allure Commandline**: Install globally to enable report generation:
  ```
  npm install -g allure-commandline
  ```
  Check if Allure is installed:
  ```
  allure --version
  ```

---

## Running Tests

### Run all tests
Run all available tests across the project:
npm run test:all
### Run tests for specific pages
To run tests for specific pages, use the following commands:

- Backlog tests:
- npm run test:backlog
- Login tests: 
- npm run test:login
- Timeline tests:
- npm run test:timeline
- ### Run tests by tags
To filter tests by specific tags, use these commands:

- Positive tests:
- npm run test:positive
- Negative tests:
- npm run test:negative
---

## Generating and Viewing Reports

### Generate and open Allure reports
Reports are generated automatically after running tests. To manually open the report, use:
allure open

### Clean previous reports
To delete the existing Allure results and reports:
npm run clean:reports

---

## Project Structure

- `cypress/e2e/`: Contains test files for different functionalities.
- `cypress/support/`: Contains support files like page objects and utilities.
- `package.json`: Contains project configuration and test scripts.

---

## Dependencies

This project uses the following key dependencies:

- **@faker-js/faker**: For generating random test data.
- **@shelex/cypress-allure-plugin**: For integrating Allure reporting into Cypress tests.
- **cypress-grep**: For filtering tests by tags.
- **dotenv**: For managing environment variables.

---

## Contact

For questions or issues, please contact the project owner via GitHub or email.
