import React from "react";

const Filter = ({ searchFilter, handleChange }) => {
    
    return (
        <div>
            <h3>Filter contacts:</h3>
            Filter: <input value={searchFilter} onChange={handleChange} />
        </div>
    );
}

export default Filter;