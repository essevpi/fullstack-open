const Filter = ({ countryFilter, handleChange }) => {
    return(
        <div>
            <label>Search country: </label>
            <input value={countryFilter} onChange={handleChange} />
        </div>
    );
}

export default Filter;