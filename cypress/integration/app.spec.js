describe('Form Validation', () => {
  it('should not submit the form if any field is empty', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    // Click on the form button
    cy.get('form').submit();
    // Check if the error message is displayed
    cy.get('.error-message').should('be.visible');
  });
});

describe('submitting alphabet as UID pattern', () => {
  it('should not submit the uid if letters used', () => {
    // start from the index page
    cy.visit('http://localhost:3000/');
    // input letters as wrong UID
    cy.get('input').type('MNOPQRS');
    // check if submits
    cy.get('button').click();
    // catch error
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please match the requested format');
    });
  });
});

describe('submitting not enough numbers as UID pattern', () => {
  it('should not submit the uid if not enough numbers used', () => {
    // start from the index page
    cy.visit('http://localhost:3000/');
    // input wrong UID - not enough numbers
    cy.get('input').type('8867');
    // check if submits
    cy.get('button').click();
    // checks for error message
    cy.get('.error-message').should('be.visible');
  });
});

describe('submitting too many numbers as UID pattern', () => {
  it('should not submit the uid if too many numbers used', () => {
    // start from the index page
    cy.visit('http://localhost:3000/');
    // input wrong UID - too many numbers
    cy.get('input').type('8867999');
    // check if submits
    cy.get('button').click();
    // checks for error message
    cy.get('.error-message').should('be.visible');
  });
});

describe('registration form', () => {
  it('should not submit the form if field is empty', () => {
    // start from the registration page
    cy.visit('http://localhost:3000/register');
    // click on the form button
    cy.get('form').submit();
    //check if the error message is displayed
    cy.get('.error-message').should('be.visible');
  });
});
