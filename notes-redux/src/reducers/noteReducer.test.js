import noteReducer from './noteReducer';
import deepFreeze from 'deep-freeze';

describe('noteReducer', () => {
    test('returns a new state with action NEW_NOTE', () => {
        const state = [];
        const action = {
            type: 'NEW_NOTE',
            data: {
                content: 'test note',
                important: true,
                id: 1
            }
        };

        deepFreeze(state);
        const newState = noteReducer(state, action);

        expect(newState).toHaveLength(1);
        expect(newState).toContainEqual(action.data);
    });

    test('returns a new state with action TOGGLE_IMPORTANCE', () => {
        const state = [
            {
                content: 'Test note 1',
                important: true,
                id: 1
            },
            {
                content: 'Test note 2',
                important: false,
                id: 2
            }
        ];
        const action = {
            type: 'TOGGLE_IMPORTANCE',
            data: {
                id: 2
            }
        };

        deepFreeze(state);
        const newState = noteReducer(state, action);

        expect(newState).toHaveLength(2);
        expect(newState).toContainEqual(state[0]);
        expect(newState).toContainEqual({
            content: 'Test note 2',
            important: true,
            id: 2
        });
    });
});