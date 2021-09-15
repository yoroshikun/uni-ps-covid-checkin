// import 'components/Form/RegisterForm.tsx'
describe('User id form ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  describe('displays form validation', () => {
    it('User Name vaildation', () => {
      cy.get('#user-Name').clear().type('73437439');
      cy.get('form').submit();
      cy.get('.error-message').should('be.visible');
    });

    it('requires Email', () => {
      cy.get('#user-Email').type('Johnny@example.com');
    });

    it('requires Phone Number', () => {
      cy.get('#user-PhoneNumber').type('041026153');
    });

    it('can submit a valid form', () => {
      cy.get('form').submit();
    });

    it('Phone number vaildation', () => {
      cy.get('#user-PhoneNumber').clear().type('0410261539');
    });

    it('name error', () => {
      cy.get('#user-Name').clear();
      cy.get('form').submit();
      cy.get('.error-message').should('be.visible');
    });

    it('Phone number error', () => {
      cy.get('#user-PhoneNumber').clear().type('34747534538453574378');
      cy.get('form').submit();
      cy.get('.error-message').should('be.visible');
    });
  });
});
