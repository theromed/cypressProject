// cypress/e2e/forgotPassword.cy.js

import LoginPage from "../support/pages/LoginPage";
import ForgotPasswordPage from "../support/pages/ForgotPasswordPage";

describe("Forgot Password Functionality", () => {
  it("should allow the user to reset the password", { tags: ["@reset_password", "@ui"] }, () => {
    // Add Allure metadata in a chainable call
    cy.allure().feature("Password Recovery").story("Reset Password Flow").severity("normal").tag("reset_password");

    // Open the login page
    LoginPage.visit();
    // Click the "Forgot Password" link
    LoginPage.clickForgotPassword();

    // Fill in the email field using the email from environment variables
    ForgotPasswordPage.fillEmail(Cypress.env("CYPRESS_EMAIL"));
    // Submit the password reset request
    ForgotPasswordPage.submitResetRequest();
    // Verify that the reset confirmation message is displayed
    ForgotPasswordPage.verifyResetMessage();
    // Confirm the reset action (e.g., from a popup or confirmation button)
    ForgotPasswordPage.confirmReset();
  });

  it("should allow the user to cancel the password reset", { tags: ["@reset_password", "@ui"] }, () => {
    // Add Allure metadata in a chainable call
    cy.allure().feature("Password Recovery").story("Cancel Reset Flow").severity("normal").tag("reset_password");

    // Open the login page
    LoginPage.visit();
    // Click the "Forgot Password" link
    LoginPage.clickForgotPassword();

    // Cancel the password reset process
    ForgotPasswordPage.cancelReset();
    // Verify that the login page is visible again
    LoginPage.verifyLoginPageVisible();
  });
});


