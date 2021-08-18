import Part from "./Part";

const Content = ({ part }) => {
    console.log(part)
    const total = part.reduce( (sum, part) => sum + part.exercises, 0);
    
    return (
        <ul>
            {part.map(part => 
                <Part part={part} key={part.id} />
            )}
            <p>Total exercises: {total}</p>
        </ul>
    );
}

export default Content;