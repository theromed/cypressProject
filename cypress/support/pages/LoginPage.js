class LoginPage {
  // Opens the login page
  visit() {
    cy.visit("/login?next=%252Fdiscover");
  }

  // Fills the username field with the provided value
  fillUsername(username) {
    cy.get("[name='username']").type(username);
  }

  // Fills the password field with the provided value
  fillPassword(password) {
    cy.get("[name='password']").type(password, { log: false }).then(() => {
      cy.allure().step("Password filled");
    });
  }

  // Clicks the submit button to initiate login
  submit() {
    cy.get("button[type='submit']").click();
  }

  // Verifies that login is successful by checking the URL and dashboard heading
  verifyLoginSuccess() {
    cy.url().should("eq", "https://tree.taiga.io/");
    cy.contains("h1", "Projects Dashboard").should("be.visible");
  }

  // Verifies that login fails with an error message displayed
  verifyLoginFailure() {
    cy.get(".notification-message-light-error .text p").should(
      "contain.text",
      "your username/email or password are incorrect"
    );
  }

  // Verifies validation messages for empty username and password fields
  verifyValidationMessages() {
    cy.get("[name='username']").should("have.attr", "data-required");
    cy.get("[name='username']").then(($input) => {
      expect($input[0].validationMessage).to.eq("Пожалуйста, заполните это поле.");
    });
  }

  // Verifies that the password input is maskedallure --version
  verifyPasswordMasked() {
    cy.get("[name='password']").should("have.attr", "type", "password");
  }

  // Clicks on the "Forgot Password" link
  clickForgotPassword() {
    cy.get(".forgot-pass").click();
  }

  // Verifies that the login page is displayed by checking the URL and form visibility
  verifyLoginPageVisible() {
    cy.url().should("eq", "https://tree.taiga.io/login");
    cy.get("form").should("be.visible");
  }
}

export default new LoginPage();
