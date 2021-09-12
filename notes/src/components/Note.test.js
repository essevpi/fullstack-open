import React from 'react';
import Note from './Note';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const note = {
    content: 'Testing with react-testing-library',
    important: true
};

test('renders content', () => {
    const component = render(
        <Note note={note} />
    );

    //method 1
    expect(component.container).toHaveTextContent(
        'Testing with react-testing-library'
    );

    //method 2
    const element = component.getByText(
        'Testing with react-testing-library'
    );
    expect(element).toBeDefined();

    //method 3
    const div = component.container.querySelector('.Note');
    expect(div).toHaveTextContent(
        'Testing with react-testing-library'
    );
});

test('clicking the button calls the handler once', () => {
    const mockHandler = jest.fn();

    const component = render (
        <Note note={note} toggleImportance={mockHandler} />
    );

    const button = component.getByText('make not important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});

