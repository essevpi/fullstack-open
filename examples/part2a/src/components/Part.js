const Part = ({ part }) => {
    return (
        <div>
            <p>Name: {part.name}, Number of exercsies: {part.exercises}</p>
        </div>
    );
}

export default Part;