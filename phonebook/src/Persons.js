const Persons = ({ persons }) => {
    return(
        <div>
            <h3>Contacts:</h3>
            <ul>
            {persons.map( person => <li key={person.name}>{person.name} : {person.number}</li>)}
            </ul>
        </div>
    );
}

export default Persons;