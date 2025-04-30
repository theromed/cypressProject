class BacklogPage {
  // Actions
  visit() {
    const projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    if (!projectSlug) {
      throw new Error("Missing required environment variable CYPRESS_PROJECT_SLUG");
    }
    cy.visit(`/project/${projectSlug}/backlog`);
    cy.get(this.backlogTableSelector, { timeout: 15000 }).should("be.visible");
  }

  clickAddNewUserStory() {
    cy.log("Making 'Add New User Story' button visible");
    this.getUserStoryButton()
      .should('exist')
      .invoke("removeClass", "hidden")
      .should("be.visible")
      .click();
  }

  closeCookie() {
    cy.get(this.cookieCloseSelector).click();
  }

  deleteUserStory(subject) {
    cy.log(`Deleting user story with subject: ${subject}`);
    cy.contains(subject)
      .closest(this.userStoryRowSelector)
      .find(this.userOptionsSelector)
      .invoke("removeClass", "hidden")
      .click();
    cy.get(this.deletePopoverSelector)
      .should("be.visible")
      .contains("Delete")
      .invoke("removeClass", "hidden")
      .should("be.visible")
      .click();
    cy.get(this.confirmDeleteButton, { timeout: 10000 }).should("be.visible").click();
  }

  setDate(selector, year, month, day) {
    cy.get(selector).click();
    cy.get(`.pika-button[data-pika-year="${year}"][data-pika-month="${month}"][data-pika-day="${day}"]`)
      .click({force: true});
  }

  makeAddSprintLinkVisible() {
    this.getAddSprintLink().invoke("removeClass", "hidden");
  }

  clickSprintLink(sprintName) {
    this.getSprintLink(sprintName).click();
  }

  clickSprintTaskboardButton(sprintId) {
    const projectSlug = Cypress.env("CYPRESS_PROJECT_SLUG");
    cy.visit(`/project/${projectSlug}/taskboard/${sprintId}`);
  }

  submitSprint() {
    cy.get(this.submitSprintButtonSelector).click({ multiple: true });
  }

  verifyLightboxOpened() {
    cy.get(this.lightboxSelector).should("be.visible");
  }

  verifyFormIsVisible() {
    cy.get(this.userStoryFormSelector, { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get(this.formTitleSelector)
          .should("be.visible")
          .and("contain.text", "New user story");
        cy.get(this.subjectInputSelector).should("be.visible");
        cy.get(this.descriptionTextareaSelector).should("be.visible");
      });
  }

  verifyStoryInBacklog(subject) {
    cy.get(this.backlogTableBodySelector).should("contain.text", subject);
  }

  verifyStoryIsNotInBacklog(subject) {
    cy.get(this.backlogTableBodySelector).should("be.visible").should("not.contain.text", subject);
  }

  sumStoryPoints() {
      let totalPoints = 0;
      return this.getStoryRows()
        .each(($row) => {
          const pointsText = $row.find('.points-container').text().trim();
          const points = parseFloat(pointsText) || 0;
          totalPoints += points;
        })
        .then(() => totalPoints);
  }

  setSprintName(sprintName) {
    cy.get(this.sprintNameInputSelector).type(sprintName);
  }

  setStartDate(year, month, day) {
    this.setDate(this.startDateSelector, year, month, day);
  }

  setEndDate(year, month, day) {
    this.setDate(this.endDateSelector, year, month, day);
  }

  // Selectors
  getUserStoryButton() {
    return cy.get("div.new-us button.btn-small.hidden");
  }

  get backlogTableSelector() {
    return ".backlog-table";
  }

  get cookieCloseSelector() {
    return ".center > .close";
  }

  get userStoryRowSelector() {
    return "div.us-item-row";
  }

  get userOptionsSelector() {
    return "div.us-option";
  }

  get deletePopoverSelector() {
    return "ul.popover.us-option-popup.active";
  }

  get confirmDeleteButton() {
    return 'button[variant="destructive"].btn-small.btn-confirm.js-confirm';
  }

  get userStoryFormSelector() {
    return 'form[ng-if="lightboxOpen"]';
  }

  get formTitleSelector() {
    return "h2.title";
  }

  get subjectInputSelector() {
    return 'input[name="subject"]';
  }

  get descriptionTextareaSelector() {
    return 'textarea[name="description"]';
  }

  get backlogTableBodySelector() {
    return ".backlog-table-body";
  }

  get addSprintLinkSelector() {
    return 'a.btn-link[title="Add a sprint"]';
  }

  get lightboxSelector() {
    return 'div.lightbox-sprint-add-edit';
  }

  get sprintNameInputSelector() {
    return 'input[name="name"]';
  }

  get startDateSelector() {
    return ".date-start";
  }

  get endDateSelector() {
    return ".date-end";
  }

  get submitSprintButtonSelector() {
    return ".btn-big";
  }

  getStoryRows() {
    return cy.get(".milestone-us-item-row.tg-scope.readonly");
  }

  get pointsContainerSelector() {
    return ".points-container";
  }

  getSprintLink(sprintName) {
    return cy.get("section.sprints a").contains(sprintName);
  }

  getSprintTaskboardButton() {
    return cy.get('section.sprints a.btn-small[variant="secondary"]');
  }

  getAddSprintLink() {
    return cy.get(this.addSprintLinkSelector);
  }

  getSummaryPoints() {
    return cy
      .get('ul > :nth-child(2) > .number') // Adjust selector as needed
      .invoke('text')
      .then((text) => parseFloat(text.trim()) || 0); // Parse and return as a float
  }
}

export default new BacklogPage();


