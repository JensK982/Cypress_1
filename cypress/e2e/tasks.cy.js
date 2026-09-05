/// <reference types="cypress" />

describe('tasks management', () => {
    it('should open and close the new task', () => {
        cy.visit('http://localhost:5173/');
        // find button "Add Task" and click it
        cy.contains('Add Task').click();
        // find the backdrop via CSS selector and click it
        cy.get('.backdrop').click({ force: true });
        // check that the modal and backdrop are not visible
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        // find button "Add Task" and click it
        cy.contains('Add Task').click();
        // find the backdrop via CSS selector and click it
        cy.contains('Cancel').click();
        // check that the modal and backdrop are not visible
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    })
//Schleife um die beiden Tests zu kombinieren
  const closeActions = [
    { name: 'backdrop click', action: () => cy.get('.backdrop').click({ force: true }) },
    { name: 'cancel button', action: () => cy.contains('Cancel').click() },
  ];

  closeActions.forEach(({ name, action }) => {
    it(`should open and close the new task via ${name}`, () => {
      cy.visit('http://localhost:5173/');
      cy.contains('Add Task').click();
      action();
      cy.get('.backdrop').should('not.exist');
      cy.get('.modal').should('not.exist');
    });
  });
});