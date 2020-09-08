describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Kasper Henriksson',
      username: 'khenriksson',
      password: 'secret',
    }
    const otherUser = {
      name: 'Sofie Biström',
      username: 'sbistrom',
      password: 'secret',
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', otherUser)

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

  describe('When logged in', function () {
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

    it('A blog created by me can be deleted', function () {
      cy.createBlog({
        title: 'cypress-deleting',
        author: 'cypress',
        url: 'not needed',
      })
      cy.contains('view').click()
      cy.contains('cypress-deleting').parent().contains('Remove blog').click()
      cy.should('not.contain', 'cypress deleting')
    })

    it('A blog cant be deleted by other user', function () {
      cy.createBlog({
        title: 'cypress-deleting',
        author: 'cypress',
        url: 'not needed',
      })
      cy.contains('logout').click()
      cy.get('#username').type('sbistrom')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('cypress-deleting')
        .parent()
        .should('not.contain', 'Remove blog')
    })
  })

  describe('ordering is right', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'khenriksson',
        password: 'secret',
      }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it.only('likes are rightly ordered', function () {
      cy.createBlog({
        title: 'first blog',
        author: 'cypress',
        url: 'not needed',
      })
      cy.createBlog({
        title: 'second blog',
        author: 'cypress',
        url: 'not needed',
        likes: 4,
      })
      cy.createBlog({
        title: 'third blog',
        author: 'cypress',
        url: 'not needed',
        likes: 3,
      })

      cy.get('.renderBlogTest').eq(0).should('contain', 4)
      cy.get('.renderBlogTest').eq(1).should('contain', 3)
      cy.get('.renderBlogTest').eq(2).should('contain', 0)
    })
  })
})
