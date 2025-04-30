// cypress/e2e/backlog.cy.js

import BacklogPage from "../support/pages/BacklogPage";
import CreateStoryPage from "../support/pages/CreateStoryPage";
import LoginAPI from "../support/api/LoginAPI";
import FilterPage from "../support/pages/FilterPage";
import { generateRandomSprintName, generateRandomSubject, generateRandomDescription } from "../support/utils/textGenerator";
import { setupIntercepts } from "../support/utils/interceptManager";

describe("Backlog - User Story Management Tests", function () {
  let generatedSprintName;
  let sprintData;
  let projectSlug;
  let activeUser;
  let shouldIntercept = false;

  before(() => {
    // Retrieve environment variables and initialize test data
    projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    generatedSprintName = generateRandomSprintName();

    // Load test fixtures
    cy.fixture("projectSprints").then((data) => {
      sprintData = data.sprint;
    });

    cy.fixture("users").then((data) => {
      activeUser = data.activeUser.fullName;
    });
  });

  beforeEach(() => {
    // Perform login via API
    LoginAPI.login(Cypress.env("CYPRESS_USERNAME"), Cypress.env("CYPRESS_PASSWORD"), "normal");

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

    BacklogPage.visit();
    BacklogPage.closeCookie();
  });

  it("should display the New User Story form when the Add New User Story button is clicked", { tags: ["@ui", "@user-story"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Backlog")
      .story("Add New User Story")
      .severity("critical")
      .tag("add-user-story");

    // Click the button and verify that the form appears
    BacklogPage.clickAddNewUserStory();
    BacklogPage.verifyFormIsVisible();
  });

  it("should create a new user story with a random subject and description", { tags: ["@ui", "@user-story"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Backlog")
      .story("Create User Story")
      .severity("critical")
      .tag("create-user-story");

    // Generate a random subject and description
    const subject = generateRandomSubject();
    const description = generateRandomDescription();

    // Save subject and description for later use
    cy.writeFile("cypress/fixtures/generatedSubject.txt", subject);
    cy.writeFile("cypress/fixtures/generatedDescription.txt", description);

    // Add a new user story
    BacklogPage.clickAddNewUserStory();
    BacklogPage.verifyFormIsVisible();
    CreateStoryPage.fillSubject(subject);
    CreateStoryPage.fillDescription(description);
    CreateStoryPage.submit();

    // Verify successful creation
    cy.wait("@createUserStory").its("response.statusCode").should("eq", 201);
    BacklogPage.verifyStoryInBacklog(subject);
  });

  it("should delete an existing user story", { tags: ["@ui", "@user-story"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Backlog")
      .story("Delete User Story")
      .severity("critical")
      .tag("delete-user-story");

    // Retrieve the subject of the previously created user story
    cy.readFile("cypress/fixtures/generatedSubject.txt").then((subject) => {
      BacklogPage.deleteUserStory(subject);

      // Verify successful deletion
      cy.wait("@deleteUserStory").its("response.statusCode").should("eq", 204);
      BacklogPage.verifyStoryIsNotInBacklog(subject);
    });
  });

  it("should calculate and validate total story points in the sprint", { tags: ["@ui", "@sprint"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Sprint Management")
      .story("Calculate Story Points")
      .severity("medium")
      .tag("story-points");

    // Calculate total story points and verify
    BacklogPage.sumStoryPoints().then((calculatedTotal) => {
      BacklogPage.getSummaryPoints().then((displayedTotal) => {
        expect(calculatedTotal).to.eq(displayedTotal);
      });
    });
  });

  it("should navigate to the sprint board by clicking on the sprint link", { tags: ["@ui", "@sprint"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Sprint Management")
      .story("Sprint Board Navigation")
      .severity("minor")
      .tag("sprint-board");

    // Navigate to the sprint board
    BacklogPage.clickSprintLink(sprintData.name);

    // Verify navigation to the correct URL and page
    cy.url().should("include", `/project/${projectSlug}/taskboard/${sprintData.id}`);
    cy.get("h1").should("contain.text", sprintData.name);

    // Navigate back to the backlog
    cy.go("back");
  });

  it("should add a new sprint successfully", { tags: ["@ui", "@sprint"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Sprint Management")
      .story("Add New Sprint")
      .severity("critical")
      .tag("add-sprint");

    // Make the "Add Sprint" link visible and click it
    BacklogPage.makeAddSprintLinkVisible();
    BacklogPage.getAddSprintLink().click();
    BacklogPage.verifyLightboxOpened();

    // Fill in sprint details and submit
    BacklogPage.setSprintName(generatedSprintName);
    BacklogPage.setStartDate(2025, 5, 1);
    BacklogPage.setEndDate(2025, 5, 15);
    BacklogPage.submitSprint();

    // Verify successful creation
    cy.wait("@createSprint").its("response.statusCode").should("eq", 201);
    cy.get(".sprints").should("contain.text", generatedSprintName);
  });

  it("should filter by 'Unassigned' and show 5 items", { tags: ["@ui", "@filter"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Filtering")
      .story("Filter by Unassigned")
      .severity("minor")
      .tag("filter-unassigned");

    // Apply and verify filter
    FilterPage.clickFilterButton();
    FilterPage.verifyFilterPanelOpened();
    FilterPage.selectAssignedToFilter();
    FilterPage.selectUnassignedFilter();
    FilterPage.verifyBacklogContainsItems(5);
  });

  it("should filter by active user and display an empty backlog", { tags: ["@ui", "@filter"] }, () => {
    // Add Allure metadata
    cy.allure()
      .feature("Filtering")
      .story("Filter by User")
      .severity("minor")
      .tag("filter-user");

    // Apply and verify filter
    FilterPage.clickFilterButton();
    FilterPage.verifyFilterPanelOpened();
    FilterPage.selectAssignedToFilter();
    FilterPage.selectActiveUserFilter(activeUser);
    FilterPage.verifyBacklogIsEmpty();
  });
});



