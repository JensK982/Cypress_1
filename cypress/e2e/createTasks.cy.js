/// <reference types="cypress" />

describe('tasks management', () => {
    it('should create a new task', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        // Fill in the task title
        cy.get('#title').type('New Task');
        cy.get('#summary').type('This is a new task');
        // in the Modal Form Click the Add Task button
        cy.get('.modal').contains('Add Task').click();
        // check that the modal and backdrop are not visible
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');


        // Check that the task was created by checking that the task list has one task and that the task title is displayed
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task').should('be.visible');
        cy.get('.task p').contains('This is a new task').should('be.visible');
    });
    it('should validate the user input', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();
       cy.contains('Please provide values');
    });
    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('This is a new task');
        // select the category from the dropdown
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();

        // Check that the task was created by checking that the task list has one task and that the task title is displayed
        cy.get('.task').should('have.length', 1);
        // Filter the tasks by category and check that the task list is updated accordingly
        cy.get('#filter').select('moderate');
        cy.get('.task').should('have.length', 0);
        cy.get('#filter').select('urgent');
        cy.get('.task').should('have.length', 1);
        cy.get('#filter').select('all');
        cy.get('.task').should('have.length', 1);
    });

    it('should add multiple tasks', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Add Task').click();
        cy.get('#title').type('Task 1');
        cy.get('#summary').type('This is task 1');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 1);

        cy.contains('Add Task').click();
        cy.get('#title').type('Task 2');
        cy.get('#summary').type('This is task 2');
        cy.get('.modal').contains('Add Task').click();
        cy.get('.task').should('have.length', 2);

        cy.get('.task').eq(0).contains('This is task 1').should('be.visible');
        cy.get('.task').eq(1).contains('This is task 2').should('be.visible');

    });
});