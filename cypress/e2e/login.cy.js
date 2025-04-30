// cypress/e2e/login.cy.js

import LoginPage from "../support/pages/LoginPage";

describe("Login Functionality", () => {
  context("Positive Tests", () => {

    it("should log in successfully with valid credentials", { tags: ["@positive", "@login"] }, () => {
      // Add Allure metadata for the test
      cy.allure().feature("Login");
      cy.allure().story("Successful Login");
      cy.allure().issue("TAIGA-1", "https://tree.taiga.io/project/romed-taigatestcases/us/1");
      cy.allure().severity("critical");

      // Open the login page
      LoginPage.visit();
      // Fill in the username using environment variable
      LoginPage.fillUsername(Cypress.env("CYPRESS_USERNAME"));
      // Fill in the password using environment variable
      LoginPage.fillPassword(Cypress.env("CYPRESS_PASSWORD"));
      // Submit the login form
      LoginPage.submit();
      // Verify that the login was successful
      LoginPage.verifyLoginSuccess();
    });

    it("should mask password input", { tags: ["@ui", "@login"] }, () => {
      // Add Allure metadata for the test
      cy.allure().feature("Login");
      cy.allure().story("Password Field Masking");
      cy.allure().issue("TAIGA-4", "https://tree.taiga.io/project/romed-taigatestcases/us/4");
      cy.allure().severity("minor");

      // Open the login page
      LoginPage.visit();
      // Retrieve the test user data from fixture and fill in the password
      cy.fixture("users").then((user) => {
        LoginPage.fillPassword(user.testUser.password); // Get password from users.json
      });
      // Verify that the password field input is masked
      LoginPage.verifyPasswordMasked();
    });
  });

  context("Negative Tests", () => {

    it("should not log in with incorrect password", { tags: ["@negative", "@login"] }, () => {
      // Add Allure metadata for the test
      cy.allure().feature("Login");
      cy.allure().story("Login with Incorrect Password");
      cy.allure().issue("TAIGA-2", "https://tree.taiga.io/project/romed-taigatestcases/us/2");
      cy.allure().severity("critical");

      // Retrieve invalid user data from fixture and attempt login
      cy.fixture("users").then((user) => {
        // Open the login page
        LoginPage.visit();
        // Fill in the username with an invalid one
        LoginPage.fillUsername(user.invalidUser.username);
        // Fill in the password with an invalid one
        LoginPage.fillPassword(user.invalidUser.password);
        // Submit the login form
        LoginPage.submit();
        // Verify that the login failed and displays an appropriate error message
        LoginPage.verifyLoginFailure();
      });
    });

    it("should not log in without entering credentials", { tags: ["@negative", "@login"] }, () => {
      // Add Allure metadata for the test
      cy.allure().feature("Login").story("Login without Credentials").issue("TAIGA-3", "https://tree.taiga.io/project/romed-taigatestcases/us/3").severity("critical");
      // Open the login page without adding any credentials and submit the form
      LoginPage.visit();
      LoginPage.submit();
      // Verify that validation messages are displayed indicating missing credentials
      LoginPage.verifyValidationMessages();
    });
  });
});

