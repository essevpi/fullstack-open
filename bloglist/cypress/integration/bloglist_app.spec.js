describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3000/api/testing/reset');
        const user = {
            username: 'Test_User',
            name: 'Test User',
            password: 'testpw'
        };

        cy.request('POST', 'http://localhost:3000/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it('login form is shown', function() {
        cy.contains('Log in').click();

        cy.contains('Username');
        cy.contains('Password');
    });

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('Log in').click();

            cy.get('#username').type('Test_User');
            cy.get('#password').type('testpw');
            cy.get('#login-btn').click();

            cy.contains('Test_User sucessfully logged in');
        });

        it('fails with wrong credentials', function() {
            cy.contains('Log in').click();

            cy.get('#username').type('Test_User');
            cy.get('#password').type('wrongpw');
            cy.get('#login-btn').click();

            cy.get('#notification')
                .should('contain', 'Could not log in')
                .and('have.css', 'color', 'rgb(220, 0, 0)');
        });
    });

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'Test_User', password: 'testpw' });
        });

        it('a new blog can be created', function() {
            cy.createBlog({
                title: 'Test blog',
                author: 'Test author',
                url: 'test_url'
            });

            cy.get('.BlogTitle')
                .should('contain', 'Test blog');

            cy.get('.BlogAuthor')
                .should('contain', 'Test author');

            //since blog url is not displayed by default, the blog details should be opened
            cy.get('.BlogViewBtn').click();

            cy.get('.BlogUrl')
                .should('contain', 'test_url');
        });

        describe('and a blog already exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Test blog',
                    author: 'Test author',
                    url: 'test_url'
                });
            });

            it('it can be liked', function() {
                cy.get('.BlogViewBtn').click();
                cy.get('.BlogLikeBtn').click();

                cy.get('.BlogLikes')
                    .should('have.text', '1 likes');
            });

            it('can be deleted by the user who created it', function() {
                cy.get('.BlogViewBtn').click();

                cy.get('.RemoveBlogBtn')
                    .find('button')
                    .should('have.text', 'Remove')
                    .click();

                cy.get('#notification')
                    .should('contain', '\'Test blog\' sucessfully removed from blogs');
            });
        });
    });
});