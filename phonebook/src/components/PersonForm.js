const PersonForm = ({ name, number, handleSubmit, handleNameChange, handleNumberChange }) => {
    return (
        <div>
            <h3>Add new contact:</h3>
            <form onSubmit={handleSubmit} className="Form">
                <label>Name: </label>
                <input onChange={handleNameChange} value={name}/>
            
                <label>Number: </label>
                <input onChange={handleNumberChange} value={number}/>
            
                <button type="submit" id="addButton">Add</button>
            </form>
         </div>
    );
}

export default PersonForm;