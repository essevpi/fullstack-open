const Part = (props) => {
    console.log(props)
    return(
        <div>
            <p>Part: {props.part.name}, excercises: {props.part.exercises}</p>
        </div>
    );
}

const Content = (props) => {
    console.log(props)
    return(
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>
    );
}

export default Content;