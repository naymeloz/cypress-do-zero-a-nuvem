describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('nayara', 10)

    cy.get('#firstName').type('Nayara')
    cy.get('#lastName').type('Melo')
    cy.get('#email').type('nayara@gmail.com')
    cy.get('#phone').type('11 99999-9999')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao enviar o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Nayara')
    cy.get('#lastName').type('Melo')
    cy.get('#email').type('nayara@gmail,com')
    cy.get('#phone').type('11 99999-9999')
    cy.get('#open-text-area').type('teste teste')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Nayara')
    cy.get('#lastName').type('Melo')
    cy.get('#email').type('nayara@gmail,com')
    cy.get('#open-text-area').type('teste teste')
    cy.get('button[type="submit"]').click()
    cy.get('#phone-checkbox').click

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Nayara')
    .should('have.value', 'Nayara')
    .clear()
    .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Nay',
      lastName: 'Santos',
      email: 'nayara@gmail.com',
      text: 'Teste.'
    }
    cy.fillMandatoryFieldsAndSubimit(data)

    cy.get('.success').should('be.visible')
  })

})