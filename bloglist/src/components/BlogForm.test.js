import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
    const createBlog = jest.fn();

    const { container } = render(
        <BlogForm createBlog={createBlog} />
    );

    test('calls the handler to create a blog with correct data ', () => {
        const form = container.querySelector('.BlogForm');
        const titleInput = container.querySelector('#title');
        const authorInput = container.querySelector('#author');
        const urlInput = container.querySelector('#url');

        fireEvent.change(titleInput, {
            target: { value: 'Test blog' }
        });

        fireEvent.change(authorInput, {
            target: { value: 'Test author' }
        });

        fireEvent.change(urlInput, {
            target: { value: 'test_url' }
        });

        fireEvent.submit(form);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('Test blog');
        expect(createBlog.mock.calls[0][0].author).toBe('Test author');
        expect(createBlog.mock.calls[0][0].url).toBe('test_url');
    });
});
