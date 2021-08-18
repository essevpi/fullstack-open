import Country from "./Country";

const Countries = ({ countries, countryFilter, handleButton }) => {
    const noCountries = countries.length === 0;
    const noSearch = countries.length > 10 && countryFilter === '';
    const singleCountry = countries.length === 1;
    const multipleCountries = countries.length <= 10 && countries.length > 1;  
    const tooManyCountries = countries.length > 10 && countryFilter !== '';

    const countryList = countries.map(country => {
        return (
            <div key={country.name}>
                {country.name}{' '}
                <button onClick={handleButton} id={country.name}>Show</button>
            </div>
        );
    });
    
    return (
        <div>
            {noCountries && <p>No countries found.</p>}
            {noSearch && <p>Enter a query.</p>}
            {singleCountry && <Country country={countries[0]} />}
            {multipleCountries && 
                <div>
                    {countryList}
                </div>}
            {tooManyCountries && <p>Too many matches. Enter a more specific query.</p>}
            
        </div>
    );
}

export default Countries;