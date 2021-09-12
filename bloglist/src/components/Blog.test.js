import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

const testUser = {
    id: '7777777',
    username: 'Test_User',
    name: 'Test User',
    password: 'testpw'
};


const testBlog = {
    id: '9999999',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test_url',
    likes: 10,
    user: testUser
};


describe('<Blog />', () => {
    let component;
    const addLike = jest.fn();
    const removeBlog = jest.fn();

    beforeEach(() => {
        component = render(
            <Blog
                blog={testBlog}
                user={testUser}
                addLike={addLike}
                removeBlog={removeBlog}
            />
        );
    });

    test('renders only title and author', () => {
        const title = component.container.querySelector('.BlogTitle');
        const author = component.container.querySelector('.BlogAuthor');
        const togglableContent = component.container.querySelector('.BlogTogglableContent');

        expect(title).toHaveTextContent('Test Blog');
        expect(author).toHaveTextContent('Test Author');
        expect(togglableContent).toHaveStyle('display: none');
    });

    test('renders blog description when show button is clicked', () => {
        const togglableContent = component.container.querySelector('.BlogTogglableContent');

        const button = component.container.querySelector('.BlogViewBtn');
        fireEvent.click(button);

        expect(togglableContent).not.toHaveStyle('display: none');
    });

    test('if like button is pressed twice its handler gets called twice', () => {
        const viewButton = component.container.querySelector('.BlogViewBtn');
        fireEvent.click(viewButton);

        const likeButton = component.container.querySelector('.BlogLikeBtn');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);

        expect(addLike.mock.calls).toHaveLength(2);
    });
});