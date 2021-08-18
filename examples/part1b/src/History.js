const History = ({allClicks}) => {
    if (allClicks.length === 0) {
        return (
            <div>
                The app is used...
            </div>
        );
    }

    return (
        <div>
            button press history: {allClicks.join(' ')}
        </div>
    );
}

export default History;