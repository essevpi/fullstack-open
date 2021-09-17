describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3000/api/testing/reset');

        const user = {
            username: 'Test_User',
            name: 'Test User',
            password: 'testpw'
        };

        cy.request('POST', 'http://localhost:3000/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    it('home page can be opened', function() {
        cy.contains('Notes');
        cy.contains('Note app - Fullstack Open 2021');
    });

    it('login form can be opened', function() {
        cy.contains('Log-In').click();
    });

    it('user can log in', function() {
        cy.contains('Log-In').click();
        cy.get('#username').type('Test_User');
        cy.get('#password').type('testpw');
        cy.get('#login-btn').click();

        cy.contains('Test User is logged');
    });

    it('login fails with wrong password', function() {
        cy.contains('Log-In').click();
        cy.get('#username').type('Test_User');
        cy.get('#password').type('wrongpw');
        cy.get('#login-btn').click();

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)');

        cy.get('html').should('not.contain', 'Test User is logged');
    });

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'Test_User', password: 'testpw' });
        });

        it('a new note can be created', function() {
            cy.contains('Create Note').click();
            cy.get('#new-note-input').type('A test note');
            cy.get('#new-note-btn').click();
            cy.contains('A test note');
        });

        describe('and several notes exists', function() {
            beforeEach(function() {
                cy.createNote({ content: 'First note', important: false });
                cy.createNote({ content: 'Second note', important: false });
                cy.createNote({ content: 'Third test note', important: false });
            });

            it.only('a note importance can be toggled', function() {
                cy.contains('Second note').parent().find('#toggle-importance-btn').as('toggleButton');

                cy.get('@toggleButton').click();

                cy.get('@toggleButton').should('contain', 'make not important');
            });
        });
    });
});
