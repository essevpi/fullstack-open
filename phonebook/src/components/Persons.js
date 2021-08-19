const Persons = ({ persons, handleDeleteButton }) => {
    return(
        <div>
            <h3>Contacts:</h3>
            <ul className="NoBulletList">
            {persons.map(person => 
                <li key={person.id}>
                    {person.name} : {person.number} {' '}
                    <button onClick={() => handleDeleteButton(person.id)}>Delete</button>
                </li>
            )}
            </ul>
        </div>
    );
}

export default Persons;