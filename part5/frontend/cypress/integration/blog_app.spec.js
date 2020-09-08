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

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('view can be clicked', function () {
    cy.contains('view').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('khenriksson')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Kasper Henriksson logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('khenriksso')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.success').contains('wrong username or password')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'khenriksson',
        password: 'secret',
      }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testing cypress')
      cy.get('#author').type('superhero cypress')
      cy.get('#url').type('notneeded')
      cy.get('#create').click()
      cy.contains('testing cypress')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testing cypress')
      cy.get('#author').type('superhero cypress')
      cy.get('#url').type('notneeded')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.get('#likebutton').click()
      cy.contains('likes 1')
    })
  })
})
