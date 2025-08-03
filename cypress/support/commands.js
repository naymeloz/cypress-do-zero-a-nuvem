Cypress.Commands.add('fillMandatoryFieldsAndSubimit', (data = {
    firstName: 'Nay',
    lastName: 'Lee',
    email: 'teste@gmail.com',
    text: 'Its me'
}) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})