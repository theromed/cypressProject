class ForgotPasswordPage {
  // Navigates to the Forgot Password page
  visit() {
    cy.visit("/forgot-password");
  }

  // Fills the email field with the provided email address
  fillEmail(email) {
    cy.get("[name='username']").type(email, { log: false }); // Hides input value from Cypress logs
  }

  // Submits the password reset request
  submitResetRequest() {
    cy.get("button[title='Reset Password']").click();
  }

  // Verifies that the reset confirmation message is displayed
  verifyResetMessage() {
    cy.get("h2.title").should("have.text", "Check your inbox!");
    cy.get("p.message").should(
      "have.text",
      "We sent you an email with the instructions to set a new password"
    );
  }

  // Confirms the reset action (e.g., confirmation from a popup or message)
  confirmReset() {
    cy.get("section").find("button.js-confirm").click();
  }

  // Cancels the password reset process and navigates back to the login page
  cancelReset() {
    cy.get("a[tg-nav='login']").click();
  }
}

export default new ForgotPasswordPage();

