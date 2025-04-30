// cypress/e2e/timeline.cy.js

import TimelinePage from "../support/pages/TimelinePage";
import LoginAPI from "../support/api/LoginAPI";

describe("Project Timeline Page", () => {
  let userData;
  let sprintData;
  let projectData;
  let projectSlug;

  before(() => {
    // Retrieve environment variables
    projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");

    // Perform API login
    LoginAPI.login(
      Cypress.env("CYPRESS_USERNAME"),
      Cypress.env("CYPRESS_PASSWORD"),
      "normal"
    );

    // Load fixtures for users, project sprints, and projects
    cy.fixture("users").then((data) => {
      userData = data.activeUser;
    });
    cy.fixture("projectSprints").then((data) => {
      sprintData = data.sprint;
    });
    cy.fixture("projects").then((projects) => {
      projectData = projects[projectSlug];
    });
  });

  beforeEach(() => {
    // Visit the timeline page
    TimelinePage.visit();
    // Verify that activity items exist and are visible
    cy.get('.activity-item').should('exist').and('be.visible');
  });

  context("UI Tests", () => {
    it("should display project title and description correctly", { tags: ["@ui", "@timeline"] }, () => {
      // Add Allure metadata in a chainable approach
      cy.allure()
        .feature("Timeline")
        .story("Project Title and Description")
        .issue("TAIGA-6", "https://tree.taiga.io/project/romed-mytestcases/us/6")
        .severity("minor")
        .tag("project-details");

      TimelinePage.verifyProjectTitle(projectData.title);
      TimelinePage.verifyProjectDescription(projectData.description);
    });
  });

  context("User Profile Navigation", () => {
    it("should navigate to the user profile page when clicking on the user's name", { tags: ["@ui", "@user-profile"] }, () => {
      // Add Allure metadata in a chainable approach
      cy.allure()
        .feature("Timeline")
        .story("User Profile Navigation")
        .issue("TAIGA-7", "https://tree.taiga.io/project/romed-mytestcases/us/7")
        .severity("minor")
        .tag("user-profile");

      // Click on the profile link using the user's full name and username
      TimelinePage.clickUserProfileLink(userData.fullName, userData.username);

      // Verify that the URL includes the user's profile path
      cy.url().should("include", `/profile/${userData.username}`);

      // Verify that the page heading contains the user's full name
      cy.get("h1").should("contain.text", userData.fullName);

      // Verify that the username element displays the user's nickname
      cy.get(".username").should("contain.text", userData.nickname);

      // Navigate back to the timeline page
      cy.go("back");
    });
  });

  context("User Story Navigation", () => {
    it("should navigate to the user story page when clicking on the user story link", { tags: ["@ui", "@user-story"] }, () => {
      // Add Allure metadata in a chainable approach
      cy.allure()
        .feature("Timeline")
        .story("User Story Navigation")
        .issue("TAIGA-8", "https://tree.taiga.io/project/romed-mytestcases/us/8")
        .severity("minor")
        .tag("user-story-navigation");

      // Click on the user story link using the user story title and ID from sprintData
      TimelinePage.clickUserStoryLink(sprintData.userStory.title, sprintData.userStory.id);

      // Verify that the URL contains the user story path
      cy.url().should("include", `/project/${projectSlug}/us/${sprintData.userStory.id}`);

      // Verify that the detail subject displays the correct story title
      cy.get(".detail-subject").should("contain.text", sprintData.userStory.title);

      // Navigate back to the timeline page
      cy.go("back");
    });
  });

  context("Sprint Board Navigation", () => {
    it("should navigate to the sprint board when clicking on the sprint link", { tags: ["@ui", "@sprint-board"] }, () => {
      // Add Allure metadata in a chainable approach
      cy.allure()
        .feature("Timeline")
        .story("Sprint Board Navigation")
        .issue("TAIGA-9", "https://tree.taiga.io/project/romed-mytestcases/us/9")
        .severity("minor")
        .tag("sprint-board");

      // Click on the sprint link using sprint ID and name from sprintData
      TimelinePage.clickSprintLink(sprintData.id, sprintData.name);

      // Verify that the URL contains the sprint board path
      cy.url().should("include", `/project/${projectSlug}/taskboard/${sprintData.id}`);

      // Verify that the page heading includes the sprint name
      cy.get("h1").should("contain.text", sprintData.name);

      // Navigate back to the timeline page
      cy.go("back");
    });
  });
});



