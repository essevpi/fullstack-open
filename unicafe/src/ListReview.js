const ListReview = ({ review }) => {
    console.log(review);
    return(
        <ul>
            {Object.keys(review).map((element) => 
                <li key={element}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}: {review[element]}
                </li>)}
        </ul>
    );
}

export default ListReview;