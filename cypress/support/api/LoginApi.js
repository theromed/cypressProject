// cypress/support/api/LoginAPI.js

class LoginAPI {
  login(user, password, type) {
    return cy.request({
      method: "POST",
      url: "https://api.taiga.io/api/v1/auth",
      body: {
        type: type,
        username: user,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      // Log the response body
      cy.log("Response body:", JSON.stringify(response.body));
      // Verify that the response status is 200 (successful login)
      expect(response.status).to.eq(200);

      // Extract the authorization token from the response
      const token = response.body.auth_token;

      // Log the retrieved token
      cy.log("Retrieved token:", token);

      // Save the token as a Cypress alias for reuse
      cy.wrap(token).as("authToken");

      // Save the token in localStorage and Cypress environment
      window.localStorage.setItem("authorization", token);
      Cypress.env("authorization", token);

      // Return the token for further chaining if necessary
      return cy.wrap(token);
    });
  }
  getToken() {
    return Cypress.env("authorization");
  }
}

export default new LoginAPI();


