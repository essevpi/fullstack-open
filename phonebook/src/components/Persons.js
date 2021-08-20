const Persons = ({ persons, handleDeleteButton }) => {
    return(
        <div>
            <h3>Contacts:</h3>
            <div >
            {persons.map(person => 
                <div key={person.name} className="ContactInfo">
                    <p>
                        {person.name} : {person.number} {' '}
                    </p>
                    
                    <button onClick={() => handleDeleteButton(person.id)} id="deleteButton">Delete</button>    
                      
                </div>
            )}
            </div>
        </div>
    );
}

export default Persons;