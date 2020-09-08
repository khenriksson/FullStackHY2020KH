describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Kasper Henriksson',
      username: 'khenriksson',
      password: 'secret',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it.only('front page contains login', function () {
    cy.contains('blogs')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('view can be clicked', function () {
    cy.contains('view').click()
  })

  it('user can login', function () {
    cy.get('#username').type('khenriksson')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('Kasper Henriksson logged in')
  })

  it('a new blog can be create', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('testing cypress')
    cy.get('#author').type('superhero cypress')
    cy.get('#url').type('notneeded')
    cy.get('#create').click()
    cy.contains('testing cypress')
  })
})
