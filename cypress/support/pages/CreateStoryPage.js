class CreateStoryPage {
  fillSubject(subject) {
    cy.get('input[name="subject"]').clear().type(subject);
  }

  fillDescription(description) {
    cy.get('textarea[name="description"]').clear().type(description);
  }

  submit() {
    cy.get('button#submitButton')
      .should('be.visible')
      .click({ force: true });
  }
}

export default new CreateStoryPage();
