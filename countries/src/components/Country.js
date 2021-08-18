import Weather from "./Weather";

const Country = ({ country }) => {
    const countryLanguages = country.languages.map((lang) => {
        return <li key={lang.iso639_2}>{lang.name}</li>
    });

    return (
        <div>
            <h3>{country.name}</h3>
            <img src={country.flag} alt="flag" width="128" height="64" />
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p> 
            <h4>Languages:</h4>
            <ul id="no-bullet-list">{countryLanguages}</ul>
            <Weather country={country} />   
        </div>
    );
}

export default Country;