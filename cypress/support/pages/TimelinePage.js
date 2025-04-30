class TimelinePage {
  // Visits the timeline page of the project
  visit() {
    const projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    if (!projectSlug) {
      throw new Error("Missing required environment variable CYPRESS_PROJECT_SLUG");
    }
    cy.visit(`/project/${projectSlug}/timeline`);
  }

  // Verifies the project title matches the expected title
  verifyProjectTitle(expectedTitle) {
    cy.get("h1.project-name")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim().replace(/\s+/g, " ")).to.eq(expectedTitle);
      });
  }

  // Verifies the project description matches the expected description
  verifyProjectDescription(expectedDescription) {
    cy.get("p.description")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim().replace(/\s+/g, " ")).to.eq(expectedDescription);
      });
  }

  // Clicks the user profile link using full name and username
  clickUserProfileLink(fullName, username) {
    cy.log("Navigating to the user profile...");
    cy.log("Full Name:", fullName);
    cy.log("Username:", username);
    cy.get('a[tg-nav^="user-profile:username="]')
      .contains(fullName)
      .should("be.visible");
    cy.visit(`/profile/${username}`);
  }

  // Clicks the user story link using its title and ID
  clickUserStoryLink(storyTitle, storyId) {
    cy.log("Navigating to the user story...");
    cy.get('a[tg-nav^="project-userstories-detail"] > span[ng-non-bindable]')
      .contains(storyTitle)
      .should("be.visible");
    const projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    cy.visit(`/project/${projectSlug}/us/${storyId}`);
  }

  // Clicks the sprint link using sprint name and ID
  clickSprintLink(sprintId, sprintName) {
    cy.log("Navigating to the sprint...");
    cy.get('a[tg-nav^="project-taskboard:project="]')
      .contains(sprintName)
      .should("be.visible");
    const projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    cy.visit(`/project/${projectSlug}/taskboard/${sprintId}`);
  }
}

export default new TimelinePage();


