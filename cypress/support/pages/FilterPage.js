class FilterPage {

  //Clicks on the "Filters" button to open the filters panel.
  clickFilterButton() {
    cy.get('button#show-filters-button').click();
  }

 // Verifies that the filters panel is opened and visible.
  verifyFilterPanelOpened() {
    cy.get('#backlog-filter').should('be.visible');
  }

  //Selects the "Assigned to" filter by clicking the corresponding button.
  selectAssignedToFilter() {
    cy.get('.filters-cat-single')
      .eq(1)
      .contains('Assigned to')
      .click();
  }

  //Selects the "Unassigned" filter by clicking the corresponding option.
  selectUnassignedFilter() {
    cy.get('.single-filter.single-filter-type-general.single-filter-type-user')
      .contains('Unassigned')
      .click();
  }

  // Selects the filter for the active user, whose name is passed as an argument.
  selectActiveUserFilter(activeUser) {
    cy.get('.single-filter.single-filter-type-general.single-filter-type-user')
      .contains(activeUser)
      .click();
  }

 //Verifies that the backlog contains the specified number of items.
  verifyBacklogContainsItems(count) {
    cy.get('.backlog-table-body.show-tags.active-filters')
      .children()
      .should('have.length', count);
  }

 //Verifies that the backlog is empty by checking for the "empty-large" class.
  verifyBacklogIsEmpty() {
    cy.get('.empty-large.js-empty-backlog').should('be.visible');
    cy.get('p.title').should('contain.text', 'The backlog is empty!');
  }
}

export default new FilterPage();

