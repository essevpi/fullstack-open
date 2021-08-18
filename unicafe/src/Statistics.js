const Statistics = ({ review }) => {
    const allFeedback = review.good + review.neutral + review.bad;
    const positiveFeedback = Math.floor((review.good/(review.good + review.neutral + review.bad))*100);
    const averageFeedback = (allFeedback)/3;

    if (allFeedback > 0) {
        return (
    
        <div>
            <p>
                All: {allFeedback}
            </p>
            <p>
                Positive feedback: {positiveFeedback}%
            </p>
            <p>
                Average: {averageFeedback}
            </p>
        </div>
        );
    } else {
        return (
            <div>
                No feedback given.
            </div>
        );
    }
}

export default Statistics;