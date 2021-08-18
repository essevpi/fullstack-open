const Total = (props) => {
    return(
        <div>
            <p>Total number of exercises: {props.parts.reduce((a, {exercises}) => a + exercises, 0)}</p>
        </div>
    );
}

export default Total;