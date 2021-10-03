describe('Form Validation', () => {
  it('should not submit the form if any field is empty', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/uid');
    // Click on the form button
    cy.get('form').submit();
    // Check if the error message is displayed
    cy.get('.error-message').should('be.visible');
  });
});
