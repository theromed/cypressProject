export function setupIntercepts() {
  cy.get('@authToken').then((token) => {
    cy.intercept('POST', 'https://api.taiga.io/api/v1/userstories', (req) => {
      req.headers['Authorization'] = `Bearer ${token}`;
      req.continue();
    }).as('createUserStory');

    cy.intercept('DELETE', /https:\/\/api\.taiga\.io\/api\/v1\/userstories\/\d+/, (req) => {
      req.headers['Authorization'] = `Bearer ${token}`;
      req.continue();
    }).as('deleteUserStory');

    cy.intercept('POST', 'https://api.taiga.io/api/v1/milestones', (req) => {
      req.headers['Authorization'] = `Bearer ${token}`;
      req.continue();
    }).as('createSprint');
  });
}
