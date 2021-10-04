import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
    const style = {
        marginBottom: '0.5rem'
    };

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const filter = e.target.value;
        dispatch(setFilter(filter));
    };

    return (
        <div style={style}>
            <label>Filter:</label>
            <input onChange={handleChange} />
        </div>
    );
};

export default Filter;
