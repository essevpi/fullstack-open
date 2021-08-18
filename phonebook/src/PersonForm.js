const PersonForm = ({ name, number, handleSubmit, handleNameChange, handleNumberChange }) => {
    return (
        <div>
            <h3>Add new contact:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                Name: <input onChange={handleNameChange} value={name}/>
                </div>
                <div>
                Number: <input onChange={handleNumberChange} value={number}/>
                </div>
                <button type="submit">Add</button>
            </form>
         </div>
    );
}

export default PersonForm;